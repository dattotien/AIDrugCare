from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import Optional, Any
from services.patient_service import get_profile_by_id, get_visit_history_by_patient_id
router = APIRouter()

class ResponseModel(BaseModel):
    success: bool
    message: str
    data: Optional[Any] = None

@router.get("/profile/{profile_id}", response_model=ResponseModel)
async def get_profile(profile_id: int):
    return await get_profile_by_id(profile_id)

@router.get("/visit-history/{patient_id}", response_model=ResponseModel)
async def get_visit_history(patient_id: str):
    return await get_visit_history_by_patient_id(patient_id)
