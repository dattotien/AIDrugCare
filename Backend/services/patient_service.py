from datetime import timedelta
from entities.patient import Patient
from entities.doctor import Doctor
from entities.visit import Visit
from entities.prescription_detail import PrescriptionDetail
from entities.medical_history import Medical_History
from pydantic import BaseModel, Field
from typing import List, Optional, Dict, Any
from datetime import datetime
from dateutil.parser import parse
async def get_profile_by_id(profile_id: int):
    profile = await Patient.find_one(Patient.id == profile_id)
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

async def get_visit_history_by_patient_id(patient_id: int):
    visits = await Visit.find_many({
        "patient_id": patient_id,
        "status": "Đã khám"
        }).to_list()
    visit_history = []
    for visit in visits:
        doctor = await Doctor.find_one(Doctor.id == visit.doctor_id)

        visit_history.append({
            "visit_id": str(visit.id),
            "diagnosis": visit.diagnosis,
            "note": visit.note,
            "date": visit.visit_date,
            "doctor_name": doctor.name if doctor else "Không xác định",
            "doctor_specialty": doctor.specialty if doctor else "Không xác định"
        })
    if visits:
        return {
            "success": True,
            "message": "Lấy lịch sử khám bệnh thành công",
            "data": visit_history
        }
    return {
        "success": False,
        "message": "Không tìm thấy lịch sử khám bệnh",
        "data": None
    }

async def get_three_latest_visits(patient_id: int):
    visits = await Visit.find_many({
        "patient_id": patient_id,
        "status": "Đã khám"
        }).sort(-Visit.visit_date).limit(3).to_list()
    visit_history = []
    for visit in visits:
        doctor = await Doctor.find_one(Doctor.id == visit.doctor_id)

        visit_history.append({
            "visit_id": str(visit.id),
            "date": visit.visit_date if (visit.status == "Đã khám") else None,
            "doctor_name": doctor.name if doctor else "Không xác định",
            "doctor_workplace": doctor.workplace if doctor else "Không xác định"
        })
    if visits:
        return {
            "success": True,
            "message": "Lấy 3 lần khám gần nhất thành công",
            "data": visits
        }
    return {
        "success": False,
        "message": "Không tìm thấy lịch sử khám bệnh",
        "data": None
    }

async def get_total_visits(patient_id: int):
    total_visited = await Visit.find({
        "patient_id": patient_id,
        "diagnosis": "Trống"}).count()
    return {
        "success": True,
        "message": "Tổng số lần đã khám",
        "data": total_visited
    }

async def get_latest_visit_day(patient_id: int):
    latest_visit = await Visit.find(Visit.patient_id == patient_id).sort(-Visit.visit_date).first_or_none()
    if latest_visit:
        return {
            "success": True,
            "message": "Lấy ngày khám gần nhất thành công",
            "data": latest_visit.visit_date
        }
    return {
        "success": False,
        "message": "Không tìm thấy lịch sử khám bệnh",
        "data": None
    }

async def get_next_visit_day(patient_id: int):
    latest_visit = await Visit.find(Visit.patient_id == patient_id).sort(-Visit.visit_date).first_or_none()
    if latest_visit and latest_visit.visit_date:
        try:
            visit_date = (
                latest_visit.visit_date
                if isinstance(latest_visit.visit_date, datetime)
                else parse(str(latest_visit.visit_date))
            )
            next_visit_day = visit_date + timedelta(days=30)
            return {
                "success": True,
                "message": "Lấy ngày tái khám thành công",
                "data": next_visit_day.strftime("%Y-%m-%d")  # format đẹp
            }
        except Exception as e:
            return {
                "success": False,
                "message": f"Lỗi xử lý ngày khám: {str(e)}",
                "data": None
            }
    return {
        "success": False,
        "message": "Không tìm thấy lịch sử khám bệnh hoặc ngày khám không hợp lệ",
        "data": None
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
        Medical_History.visit_id == visit_id
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
            "labResult": medical_history.labResult if medical_history else None,
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
    