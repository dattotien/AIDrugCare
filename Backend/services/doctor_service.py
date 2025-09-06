from beanie.operators import In
from datetime import datetime, date, timedelta
from typing import Any, Dict, List
from entities.medical_history import Medical_History
from entities.doctor import Doctor
from entities.visit import Visit
from entities.patient import Patient
from services import patient_service
from entities.prescription_detail import PrescriptionDetail, PrescriptionItem
from entities.drug import Drug
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
    visits = await Visit.find(Visit.patient_id == patient_id).to_list()
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
                    "history": (await get_patient_history(p.id))["data"]
                }
                for p in results
            ]
        }
    return {
        "success": False,
        "message": "Không tìm thấy bệnh nhân",
        "data": None
    }

async def get_recent_patients(doctor_id: int):
    visits = await Visit.find(Visit.doctor_id == doctor_id).to_list()
    
    if not visits:
        return {
            "success": False,
            "message": "Chưa có bệnh nhân",
            "data": None
        }
    recent = sorted(visits, key=lambda x: x.visit_date, reverse=True)

    data = []
    for v in recent:
        profile = await patient_service.get_profile_by_id(v.patient_id)
        if(v.diagnosis == "Trống"):
            continue
        else:
            data.append({
                "visit_id": v.id,
                "visit_date": v.visit_date,
                "symptoms": v.symptoms,
                "patient": profile["data"] if profile["success"] else None
        })

    return {
        "success": True,
        "message": "Danh sách bệnh nhân gần đây",
        "data": data
    }

"""    
async def update_diagnosis(patient_id: int, diagnosis: str):
    visit = await Visit.find_one({"patient_id": patient_id, "diagnosis": "Trống"})
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
"""

async def get_number_waiting():
    count = await Visit.find(Visit.diagnosis == "Trống").count()
    return {
        "success": True,
        "message": "Lấy số bệnh nhân đang chờ khám thành công",
        "data": count
    }
async def get_number_visited_today(doctor_id: int):
    today = date.today()

    count = await Visit.find({
    "doctor_id": doctor_id,
    "diagnosis": {"$ne": "Trống"},
    "visit_date": {
        "$gte": datetime.combine(today, datetime.min.time()),
        "$lte": datetime.combine(today, datetime.max.time())
        }
    }).count()



    return {
        "success": True,
        "message": "Lấy số bệnh nhân đã khám hôm nay thành công",
        "data": count
    }

async def create_prescription(visit_id: int, items: List[Dict[str, Any]], diagnosis: str, note: str):
    visit = await Visit.get(visit_id)
    if not visit:
        return {
            "success": False,
            "message": "Không tìm thấy lần khám",
            "data": None
        }
    visit.diagnosis = diagnosis
    visit.note = note
    await visit.save()

    patient = await Patient.get(visit.patient_id)
    medical_history = await Medical_History.find_one(Medical_History.patient_id == patient.id)

    existing_prescription = await PrescriptionDetail.find_one(
        PrescriptionDetail.visit_id == visit_id
    )
    if existing_prescription:
        return {
            "success": False,
            "message": "Đã tồn tại đơn thuốc cho lần khám này",
            "data": None
        }

    prescription_items = []
    for item in items:
        drug = await Drug.find_one(Drug.generic_name == item["drug_name"])
        
        if not drug:
            return {
                "success": False,
                "message": f"Thuốc '{item['drug_name']}' không tồn tại trong cơ sở dữ liệu",
                "data": None
            }

        prescription_items.append({
            "drug_name": item["drug_name"],   
            "drug_id": str(drug.id) if drug else None,
            "frequency": item.get("frequency"),
            "duration_days": item.get("duration_days"),
            "note": item.get("note", "Không có"),
            "dosage": item.get("dosage", "Liều dùng không xác định"),
            "start_time": datetime.utcnow(),
            "end_time": datetime.utcnow() + timedelta(days=item.get("duration_days", 0) or 0)
        })

    new_id = max(
        (prescription_detail.id for prescription_detail in await PrescriptionDetail.find_all().to_list()), 
        default=0) + 1

    new_prescription = PrescriptionDetail(
        id=new_id,
        visit_id=visit_id,
        start_time=datetime.utcnow(),
        items=prescription_items
    )
    await new_prescription.insert()

    data = {
        "patient": {
            "name": patient.name if patient else None,
            "dob": patient.dob if patient else None,
            "gender": patient.gender if patient else None,
            "phone": patient.phone if patient else None,
            "cccd": patient.cccd if patient else None,
        },
        "medical_history": {
            "lab_results": medical_history.labResults if medical_history else None,
        },
        "visit": {
            "diagnosis": visit.diagnosis,
            "note": visit.note,
        },
        "prescription": {
            "id": str(new_prescription.id),
            "created_at": new_prescription.start_time,
            "doctor_name": (await Doctor.get(visit.doctor_id)).name if await Doctor.get(visit.doctor_id) else None,
            "items": prescription_items
        }
    }

    return {
        "success": True,
        "message": "Tạo đơn thuốc thành công",
        "data": data
    }
       
async def get_waiting_patients(doctor_id: int):
    waiting_visits = await Visit.find({
        "doctor_id": doctor_id,
        "diagnosis": "Trống"
        }).sort(Visit.visit_date).to_list()

    if not waiting_visits:
        return {
            "success": False,
            "message": "Không có bệnh nhân đang chờ khám",
            "data": None
        }

    data = []
    for visit in waiting_visits:
        patient = await Patient.get(visit.patient_id)
        data.append({
            "id": patient.id if patient else None,
            "name": patient.name if patient else None,
            "age": patient.dob if patient else None,
            "gender": patient.gender if patient else None,
            "symptoms": visit.symptoms,
            "status": visit.status,
        })
    return {
        "success": True,
        "message": "Lấy bệnh nhân đang chờ khám thành công",
        "data": data
    }

async def get_three_previous_visits(doctor_id: int):
    previous_visits = (
        await Visit.find((Visit.doctor_id == doctor_id) & (Visit.diagnosis != "Trống")).to_list()
        .sort(-Visit.visit_date)
        .limit(3)
        .to_list()
    )

    if not previous_visits:
        return {
            "success": False,
            "message": "Không tìm thấy lịch sử khám bệnh",
            "data": None,
        }

    data = []
    for visit in previous_visits:
        patient = await Patient.get(visit.patient_id)
        data.append({
            "age": patient.dob if patient else None,
            "dob": patient.gender if patient else None,
            "diagnosis": visit.diagnosis,
            "patient_id": visit.patient_id,
            "visit_date": visit.visit_date,
        })

    return {
        "success": True,
        "message": "Lấy 3 lần khám trước đó thành công",
        "data": data,
    }

async def get_prescription_by_visit(visit_id: int) -> Dict[str, Any]:
    visit = await Visit.get(visit_id)
    if not visit:
        return {
            "success": False,
            "message": "Không tìm thấy thông tin lần khám",
            "data": None
            }
    patient = await Patient.get(visit.patient_id)

    medical_history = await Medical_History.find_one(
        Medical_History.patient_id == visit.patient_id
    )

    prescription_detail = await PrescriptionDetail.find_one(
        PrescriptionDetail.visit_id == visit_id
    )

    if not prescription_detail or not prescription_detail.items:
        return {
            "success": False,
            "message": "Không tìm thấy đơn thuốc",
            "data": None
        }
    prescription_items = []
    for item in prescription_detail.items:
        drug = await Drug.get(item.drug_id)  # join bảng Drug
        prescription_items.append({
            "drug_id": item.drug_id,
            "drug_name": drug.generic_name if drug else None,
            "frequency": item.frequency,
            "time": item.duration_days,
            "requirement": item.note if item.note else "Không có"
        })

    data = {
        "patient": {
            "name": patient.name if patient else None,
            "dob": patient.dob if patient else None,
            "gender": patient.gender if patient else None,
            "phone": patient.phone if patient else None,
            "cccd": patient.cccd if patient else None,
        },
        "medical_history": {
            "lab_results": medical_history.labResults if medical_history else None,
        },
        "visit": {
            "diagnosis": visit.diagnosis,
            "note": visit.note,
        },
        "prescription": {
            "id": str(prescription_detail.id),
            "items": prescription_items
        }
    }

    return {
        "success": True,
        "message": "Lấy đơn thuốc thành công",
        "data": data
    }

async def get_visited_history_by_doctor(doctor_id: int):
    visits = await Visit.find(
        Visit.doctor_id == doctor_id,
        Visit.diagnosis != "Trống"
        ).to_list()


    if not visits:
        return {
            "success": False,
            "message": "Không tìm thấy lịch sử khám bệnh",
            "data": None
        }
        
    patient_ids = list({v.patient_id for v in visits})
    patients = await Patient.find(In(Patient.id, patient_ids)).to_list()
    patient_map = {p.id: p for p in patients}
    
    data = []
    for visit in visits:
        patient = patient_map.get(visit.patient_id)
        if patient:
            data.append({
                "visit_id": str(visit.id),
                "patient_id": visit.patient_id,
                "patient_name": patient.name,
                "gender": patient.gender,
                "diagnosis": visit.diagnosis,
                "date": visit.visit_date,
            })

    return {
        "success": True,
        "message": "Lấy lịch sử khám bệnh thành công",
        "data": data
    }

async def get_all_visit_history_by_doctor(doctor_id: int):
    visits = await Visit.find(Visit.doctor_id == doctor_id).to_list()
    if not visits:
        return {
            "success": False,
            "message": "Không tìm thấy lịch sử khám bệnh",
            "data": None
        }

    patient_ids = list({v.patient_id for v in visits})
    patients = await Patient.find(In(Patient.id, patient_ids)).to_list()
    patient_map = {p.id: p for p in patients}

    data = []
    for visit in visits:
        patient = patient_map.get(visit.patient_id)
        if patient:
            data.append({
                "visit_id": str(visit.id),
                "patient_id": visit.patient_id,
                "patient_name": patient.name,
                "gender": patient.gender,
                "diagnosis": visit.diagnosis,
                "date": visit.visit_date,
            })

    return {
        "success": True,
        "message": "Lấy lịch sử khám bệnh thành công",
        "data": data
    }

