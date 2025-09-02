from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import Optional, Any
from services.patient_service import get_profile_by_id, get_visit_history_by_patient_id, get_three_latest_visits, get_total_visits, get_latest_visit_day
router = APIRouter()

class ResponseModel(BaseModel):
    success: bool
    message: str
    data: Optional[Any] = None

@router.get("/profile/{profile_id}", response_model=ResponseModel)
async def get_profile(profile_id: int):
    return await get_profile_by_id(profile_id)

@router.get("/visit-history/{patient_id}", response_model=ResponseModel)
async def get_visit_history(patient_id: int):
    return await get_visit_history_by_patient_id(patient_id)

@router.get("/three-latest-visits/{patient_id}", response_model=ResponseModel)
async def get_three_latest_visits_endpoint(patient_id: int):
    return await get_three_latest_visits(patient_id)
@router.get("/total-visits/{patient_id}", response_model=ResponseModel)
async def get_total_visits_endpoint(patient_id: int):
    return await get_total_visits(patient_id)
@router.get("/latest-visit-day/{patient_id}", response_model=ResponseModel)
async def get_latest_visit_day_endpoint(patient_id: int):
    return await get_latest_visit_day(patient_id)