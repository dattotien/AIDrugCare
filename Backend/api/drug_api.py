from fastapi import APIRouter, HTTPException, Depends,Request
from pydantic import BaseModel
from typing import Optional, Any, List
from services.drug_service import get_all_drugs
from services.drug_service import get_drug_by_id
from services.drug_service import predict_one_drug_interaction
from services.model_service import get_hmgrl_service
from services.drug_service import search_drugs_by_name
from services.drug_service import get_all_interactions
from services.drug_service import get_previous_drugs
from fastapi import Query
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
from fastapi import APIRouter, HTTPException, Depends,Request
from pydantic import BaseModel
from typing import Optional, Any, List
from services.drug_service import get_all_drugs
from services.drug_service import get_drug_by_id
from services.drug_service import predict_one_drug_interaction
from services.model_service import get_hmgrl_service
from services.drug_service import search_drugs_by_name
from services.drug_service import get_all_interactions
from services.drug_service import get_previous_drugs
from fastapi import Query
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

@router.get("/search")
async def api_search_drugs(name: Optional[str] = Query("", description="Tên thuốc cần tìm")):
    if not name or name.strip() == "":
        return {
            "success": False,
            "message": "Tên thuốc không được để trống",
            "data": []
        }
    return await search_drugs_by_name(name)

class InteractionRequest(BaseModel):
    drugs: List[str]

@router.post("/all-interactions", response_model=ResponseModel)
async def get_all_ddi(
    req: InteractionRequest,
    hmgrl_service=Depends(get_hmgrl_service),
):
    if hmgrl_service is None:
        raise HTTPException(status_code=503, detail="Model service is not available")

    results = await get_all_interactions(req.drugs, hmgrl_service)
    return results
@router.get("/previous-drugs/{patient_id}", response_model=ResponseModel)
async def fetch_previous_drugs(patient_id: int):
    return await get_previous_drugs(patient_id)

@router.get("/search")
async def api_search_drugs(name: Optional[str] = Query("", description="Tên thuốc cần tìm")):
    if not name or name.strip() == "":
        return {
            "success": False,
            "message": "Tên thuốc không được để trống",
            "data": []
        }
    return await search_drugs_by_name(name)

class InteractionRequest(BaseModel):
    drugs: List[str]

@router.post("/all-interactions", response_model=ResponseModel)
async def get_all_ddi(
    req: InteractionRequest,
    hmgrl_service=Depends(get_hmgrl_service),
):
    if hmgrl_service is None:
        raise HTTPException(status_code=503, detail="Model service is not available")

    results = await get_all_interactions(req.drugs, hmgrl_service)
    return results
@router.get("/previous-drugs/{patient_id}", response_model=ResponseModel)
async def fetch_previous_drugs(patient_id: int):
    return await get_previous_drugs(patient_id)