from datetime import timedelta
from entities.patient import Patient
from entities.doctor import Doctor
from entities.visit import Visit
from entities.prescription_detail import PrescriptionDetail
from entities.medical_history import Medical_History
from pydantic import BaseModel, Field

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
        "diagnosis": {"$ne": None}}).count()
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
    if latest_visit:
        next_visit_day = latest_visit.visit_date + timedelta(days=30)  # khám định kỳ theo tháng
        return {
            "success": True,
            "message": "Lấy ngày tái khám thành công",
            "data": next_visit_day
        }
    return {
        "success": False,
        "message": "Không tìm thấy lịch sử khám bệnh",
        "data": None
    }
    