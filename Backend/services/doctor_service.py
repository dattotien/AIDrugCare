from datetime import datetime, date, timedelta
from typing import List
from entities.doctor import Doctor
from entities.visit import Visit
from entities.patient import Patient
from services import patient_service
from entities.prescription_detail import PrescriptionDetail, PrescriptionItem

async def get_profile_by_id(profile_id: int):
    profile = await Doctor.find_one(Doctor.id == profile_id)
    if profile:
        return {
            "success": True,
            "message": "Lấy thông tin hồ sơ thành công",
            "data": profile
        }
    return {
        "success": False,
        "message": "Không tìm thấy hồ sơ",
        "data": None
    }

async def get_patient_history(patient_id: int):
    visits = await Visit.find_all(Visit.patient_id == patient_id).to_list()
    if visits:
        return {
            "success": True,
            "message": "Lấy lịch sử khám bệnh thành công",
            "data": visits
        }
    return {
        "success": False,
        "message": "Không tìm thấy lịch sử khám bệnh",
        "data": None
    }

async def search_patient_history(keyword: str):
    patients = await Patient.find_all().to_list()
    
    results = [
        p for p in patients
        if keyword.lower() in p.name.lower() or keyword in p.cccd
    ]

    if results:
        return {
            "success": True,
            "message": "Tìm thấy bệnh nhân",
            "data": [
                {
                    "patient_id": p.id,
                    "name": p.name,
                    "cccd": p.cccd,
                    "history": await p.get_patient_history()
                }
                for p in results
            ]
        }
    return {
        "success": False,
        "message": "Không tìm thấy bệnh nhân",
        "data": None
    }

async def get_recent_patients():
    visits = await Visit.find_all().to_list()  
    
    if not visits:
        return {
            "success": False,
            "message": "Chưa có bệnh nhân",
            "data": None
        }
    recent = sorted(visits, key=lambda x: x.visit_date, reverse=True)

    data = []
    for p in recent:
        profile = await patient_service.get_profile_by_id(p.patient_id)
        if(profile.diagnosis is not None):
            continue
        else:
            data.append({
                "visit_id": p.id,
                "visit_date": p.visit_date,
                "symptoms": p.symptoms,
                "patient": profile["data"] if profile["success"] else None
        })

    return {
        "success": True,
        "message": "Danh sách bệnh nhân gần đây",
        "data": data
    }
    
async def update_diagnosis(patient_id: int, diagnosis: str):
    visit = await Visit.find_one(Visit.patient_id == patient_id, Visit.diagnosis is None)
    if not visit:
        return {
            "success": False, 
            "message": "Không tìm thấy lần khám", 
            "data": None}
    visit.diagnosis = diagnosis
    await visit.save()
    return {
        "success": True, 
        "message": "Đã lưu chẩn đoán", 
        "data": visit
        }

async def get_number_waiting():
    count = await Visit.count(Visit.diagnosis == None)
    return {
        "success": True,
        "message": "Lấy số bệnh nhân đang chờ khám thành công",
        "data": count
    }
async def get_number_visited_today(doctor_id: int):
    today = date.today()

    count = await Visit.count(
        (Visit.doctor_id == doctor_id) &
        (Visit.diagnosis != None) &
        (Visit.date >= datetime.combine(today, datetime.min.time())) &
        (Visit.date <= datetime.combine(today, datetime.max.time()))
    )

    return {
        "success": True,
        "message": "Lấy số bệnh nhân đã khám hôm nay thành công",
        "data": count
    }

async def create_prescription(visit_id: int, items: List[dict]):
    prescription_items = []
    now = datetime.now()

    for item in items:
        start_time = now
        end_time = now + timedelta(days=item["duration_days"])
        
        prescription_items.append(PrescriptionItem(
            drug_id=item["drug_id"],
            dosage=item["dosage"],
            frequency=item["frequency"],
            duration_days=item["duration_days"],
            start_time=start_time,
            end_time=end_time,
            note=item.get("note")
        ))
        
    prescription_detail = PrescriptionDetail(
        visit_id=visit_id,
        start_time=now,
        items=prescription_items
    )

    await prescription_detail.insert()

    return {
        "success": True,
        "message": "Kê đơn thuốc thành công",
        "data": prescription_detail.dict()
    }