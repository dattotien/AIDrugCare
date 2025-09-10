from fastapi import APIRouter, HTTPException 
from pydantic import BaseModel
from typing import Optional, Any, List
from services.doctor_service import (
    get_profile_by_id,
    get_patient_history,
    search_patient_history,
    get_recent_patients,
    #update_diagnosis,
    get_number_waiting,
    get_number_visited_today,
    create_prescription,
    get_prescription_by_visit,
    get_visited_history_by_doctor,
    get_all_visit_history_by_doctor,
    get_waiting_patients,
    get_all_patients_by_doctor,
    get_three_previous_visits,
    get_medical_history_by_visit,
    get_visit_by_id
)

router = APIRouter()

class ResponseModel(BaseModel):
    success: bool
    message: str
    data: Optional[Any] = None

@router.get("/doctor-profile/{profile_id}", response_model=ResponseModel)
async def get_profile(profile_id: int):
    return await get_profile_by_id(profile_id)

@router.get("/doctor-visit-history/{patient_id}", response_model=ResponseModel)
async def get_history(patient_id: int):
    return await get_patient_history(patient_id)

@router.get("/search-history/{keyword}", response_model=ResponseModel)
async def search_history(keyword: str):
    return await search_patient_history(keyword)

@router.get("/recent-patients/{doctor_id}", response_model=ResponseModel)
async def recent_patients(doctor_id: int):
    return await get_recent_patients(doctor_id)
"""
@router.put("/update-diagnosis/{patient_id}", response_model=ResponseModel)
async def update_patient_diagnosis(patient_id: int, diagnosis: str):
    return await update_diagnosis(patient_id, diagnosis)
"""

@router.get("/waiting-count/{doctor_id}", response_model=ResponseModel)
async def waiting_count(doctor_id: int):
    return await get_number_waiting(doctor_id)

@router.get("/visited-count-today/{doctor_id}", response_model=ResponseModel)
async def visited_today(doctor_id: int):
    return await get_number_visited_today(doctor_id)

class PrescriptionItemRequest(BaseModel):
    drug_name: str
    frequency: str
    duration_days: int
    dosage: Optional[str] = "Không xác định"
    note: Optional[str] = None

class PrescriptionRequest(BaseModel):
    visit_id: int
    items: List[PrescriptionItemRequest]
    diagnosis: str
    note: str
@router.post("/create-prescription")
async def create_prescription_endpoint(request: PrescriptionRequest):
    return await create_prescription(
        visit_id=request.visit_id,
        items=request.items,
        diagnosis=request.diagnosis,
        note=request.note
    )
@router.get("/prescription/{visit_id}", response_model=ResponseModel)
async def get_prescription(visit_id: int):
    return await get_prescription_by_visit(visit_id)
@router.get("/visited-by-doctor/{doctor_id}", response_model=ResponseModel)
async def get_visits_by_doctor(doctor_id: int):
    return await get_visited_history_by_doctor(doctor_id)
@router.get("/all-visits-by-doctor/{doctor_id}", response_model=ResponseModel)
async def get_all_visits_by_doctor(doctor_id: int):
    return await get_all_visit_history_by_doctor(doctor_id)
@router.get("/waiting-patients/{doctor_id}", response_model=ResponseModel)
async def get_waiting_patients_endpoint(doctor_id: int):
    return await get_waiting_patients(doctor_id)
@router.get("/all-patients/{doctor_id}", response_model=ResponseModel)
async def get_all_patients(doctor_id: int):
    return await get_all_patients_by_doctor(doctor_id)
@router.get("/previous-patients/{doctor_id}", response_model=ResponseModel)
async def get_previous_patients(doctor_id: int):
    return await get_three_previous_visits(doctor_id)
@router.get("/visit/{visit_id}", response_model=ResponseModel)
async def get_visit_by_id_endpoint(visit_id: int):
    return await get_visit_by_id(visit_id)
@router.get("/medical-history/{visit_id}", response_model=ResponseModel)
async def get_medical_history_endpoint(visit_id: int):
    return await get_medical_history_by_visit(visit_id)
