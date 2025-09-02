from datetime import timedelta
from entities.patient import Patient
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
    visits = await Visit.find_many(Visit.patient_id == patient_id).to_list()
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

async def get_three_latest_visits(patient_id: int):
    visits = await Visit.find(Visit.patient_id == patient_id).sort(-Visit.date).limit(3).to_list()
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
    latest_visit = await Visit.find(Visit.patient_id == patient_id).sort(-Visit.date).first_or_none()
    if latest_visit:
        return {
            "success": True,
            "message": "Lấy ngày khám gần nhất thành công",
            "data": latest_visit.date
        }
    return {
        "success": False,
        "message": "Không tìm thấy lịch sử khám bệnh",
        "data": None
    }

async def get_next_visit_day(patient_id: int):
    latest_visit = await Visit.find(Visit.patient_id == patient_id).sort(-Visit.date).first_or_none()
    if latest_visit:
        next_visit_day = latest_visit.date + timedelta(days=30)  # khám định kỳ theo tháng
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
    