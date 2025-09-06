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
    get_waiting_patients
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

@router.get("/waiting-count", response_model=ResponseModel)
async def waiting_count():
    return await get_number_waiting()

@router.get("/visited-count-today/{doctor_id}", response_model=ResponseModel)
async def visited_today(doctor_id: int):
    return await get_number_visited_today(doctor_id)

class PrescriptionItemRequest(BaseModel):
    drug_name: str
    frequency: str
    duration_days: int
    note: Optional[str] = None

class PrescriptionRequest(BaseModel):
    visit_id: int
    items: List[PrescriptionItemRequest]
    diagnosis: str
    note: str
@router.post("/create-prescription", response_model=ResponseModel)
async def create_prescription_endpoint(request: PrescriptionRequest):
    items = [item.dict() for item in request.items]
    return await create_prescription(request.visit_id, items, request.diagnosis, request.note)
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
