from fastapi import APIRouter, HTTPException, Query, Depends
from pydantic import BaseModel
from typing import Optional, Any, List

from services.drug_service import (
    get_all_drugs,
    get_drug_by_id,
    predict_one_drug_interaction,
    search_drugs_by_name,
    get_all_interactions,
    get_previous_drugs,
)

# import lazy load model
from services.model_service import get_model_service  

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


@router.get("/drugs/predict", response_model=ResponseModel)
async def predict_drug_interaction(
    drug_nameA: str,
    drug_nameB: str,
    hmgrl_service=Depends(get_model_service),  # model sẽ load lần đầu ở đây
):
    if hmgrl_service is None:
        raise HTTPException(status_code=503, detail="Model service is not available")

    try:
        result = await predict_one_drug_interaction(drug_nameA, drug_nameB, hmgrl_service)
        return ResponseModel(success=True, message="Predict thành công", data=result)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/search")
async def api_search_drugs(name: Optional[str] = Query("", description="Tên thuốc cần tìm")):
    if not name or name.strip() == "":
        return {"success": False, "message": "Tên thuốc không được để trống", "data": []}
    return await search_drugs_by_name(name)


class InteractionRequest(BaseModel):
    drugs: List[str]


@router.post("/all-interactions", response_model=ResponseModel)
async def get_all_ddi(
    req: InteractionRequest,
    hmgrl_service=Depends(get_model_service),  
):
    if hmgrl_service is None:
        raise HTTPException(status_code=503, detail="Model service is not available")

    try:
        result = await get_all_interactions(req.drugs, hmgrl_service)
        return ResponseModel(success=True, message="Lấy tương tác thành công", data=result)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/previous-drugs/{patient_id}", response_model=ResponseModel)
async def fetch_previous_drugs(patient_id: int):
    return await get_previous_drugs(patient_id)
