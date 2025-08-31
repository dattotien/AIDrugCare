from fastapi import APIRouter
from pydantic import BaseModel
from typing import Optional, Any, List
from services.doctor_service import (
    get_profile_by_id,
    get_patient_history,
    search_patient_history,
    get_recent_patients,
    update_diagnosis,
    get_number_waiting,
    get_number_visited_today,
    create_prescription
)

router = APIRouter()

class ResponseModel(BaseModel):
    success: bool
    message: str
    data: Optional[Any] = None

@router.get("/profile/{profile_id}", response_model=ResponseModel)
async def get_profile(profile_id: int):
    return await get_profile_by_id(profile_id)

@router.get("/visit-history/{patient_id}", response_model=ResponseModel)
async def get_history(patient_id: int):
    return await get_patient_history(patient_id)

@router.get("/search-history/{keyword}", response_model=ResponseModel)
async def search_history(keyword: str):
    return await search_patient_history(keyword)

@router.get("/recent-patients", response_model=ResponseModel)
async def recent_patients():
    return await get_recent_patients()

@router.put("/update-diagnosis/{patient_id}", response_model=ResponseModel)
async def update_patient_diagnosis(patient_id: int, diagnosis: str):
    return await update_diagnosis(patient_id, diagnosis)

@router.get("/waiting-count", response_model=ResponseModel)
async def waiting_count():
    return await get_number_waiting()

@router.get("/visited-count-today/{doctor_id}", response_model=ResponseModel)
async def visited_today(doctor_id: int):
    return await get_number_visited_today(doctor_id)

class PrescriptionItemRequest(BaseModel):
    drug_id: str
    dosage: str
    frequency: str
    duration_days: int
    note: Optional[str] = None

class PrescriptionRequest(BaseModel):
    visit_id: int
    items: List[PrescriptionItemRequest]


@router.post("/prescription", response_model=ResponseModel)
async def prescribe(req: PrescriptionRequest):
    return await create_prescription(req.visit_id, items = [item.model_dump() for item in req.items])
