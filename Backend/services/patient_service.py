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

async def get_visit_history_by_patient_id(patient_id: str):
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
