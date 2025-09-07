from fastapi import APIRouter, HTTPException , Form
from pydantic import BaseModel
from typing import Optional, Any, List
from services.auth_service import login_doctor_service, login_patient_service, logout_service


router = APIRouter()
class ResponseModel(BaseModel):
    success: bool
    message: str
    data: Optional[Any] = None 
@router.post("/login-doctor", response_model=ResponseModel)
async def login_doctor(email: str, password: str):
    return await login_doctor_service(email, password)
@router.post("/login-patient", response_model=ResponseModel)
async def login_patient(cccd: str = Form(...), password: str = Form(...)):
    return await login_patient_service(cccd, password)
@router.post("/logout",response_model=  ResponseModel)
async def logout():
    return await logout_service()