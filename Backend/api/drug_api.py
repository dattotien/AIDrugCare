from fastapi import APIRouter, HTTPException, Depends,Request
from pydantic import BaseModel
from typing import Optional, Any
from services.drug_service import get_all_drugs
from services.drug_service import get_drug_by_id
from services.drug_service import predict_one_drug_interaction
from services.model_service import get_hmgrl_service
router = APIRouter()

class ResponseModel(BaseModel):
    success: bool
    message: str
    data: Optional[Any] = None

@router.get("/drugs", response_model=ResponseModel)
async def fetch_all_drugs():
    return await get_all_drugs()

@router.get("/drugs/{drug_id}", response_model=ResponseModel)
async def fetch_drug_by_id(drug_id: str):
    return await get_drug_by_id(drug_id)
@router.get("/drugs/predict{drug_nameA}/{drug_nameB}", response_model=ResponseModel)
async def predict_drug_interaction(
    drug_nameA: str,
    drug_nameB: str,
    hmgrl_service=Depends(get_hmgrl_service)
):
    if hmgrl_service is None:
        raise HTTPException(status_code=503, detail="Model service is not available")
    return await predict_one_drug_interaction(drug_nameA, drug_nameB, hmgrl_service)
