from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import Optional, Any
from services.drug_service import get_all_drugs
router = APIRouter()

class ResponseModel(BaseModel):
    success: bool
    message: str
    data: Optional[Any] = None

@router.get("/drugs", response_model=ResponseModel)
async def fetch_all_drugs():
    return await get_all_drugs()
