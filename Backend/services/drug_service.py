from entities.drug import Drug
import numpy as np
from pydantic import BaseModel, Field
from beanie import PydanticObjectId
import re
class DrugOut(BaseModel):
    id: str = Field(..., alias="_id")
    generic_name: str
    description: str

    class Config:
        populate_by_name = True
async def get_all_drugs():
    drugs = await Drug.find_all().project(DrugOut).sort('_id').to_list()
    if drugs:    
        return {
            "success": True,
            "message": "Lấy danh sách thuốc thành công",
            "data": drugs
        }
    return {
        "success": False,
        "message": "Không có danh sách thuốc",
        "data": None
    }

async def get_drug_by_id(drug_id: str):
    drug = await Drug.find_one(Drug.id == drug_id)
    if drug:
        return {
            "success": True,
            "message": "Lấy thông tin thuốc thành công",
            "data": drug
        }
    return {
        "success": False,
        "message": "Không tìm thấy thuốc",
        "data": None
    }

import re

async def search_drugs_by_name(name: str):
    name = name.strip()
    if not name:
        return {
            "success": False,
            "message": "Tên thuốc không được để trống",
            "data": []
        }

    # ^ để match từ đầu chuỗi
    regex = re.compile(f"^{re.escape(name)}.*", re.IGNORECASE)

    drugs = await Drug.find(
        {"generic_name": regex}
    ).project(DrugOut).to_list()

    if drugs:
        return {
            "success": True,
            "message": f"Tìm thấy {len(drugs)} thuốc bắt đầu với '{name}'",
            "data": drugs
        }
    return {
        "success": False,
        "message": f"Không tìm thấy thuốc nào bắt đầu với '{name}'",
        "data": []
    }


async def predict_one_drug_interaction(drug_nameA: str, drug_nameB: str, hmgrl_service):
    candidatesA = [drug_nameA, drug_nameA.lower()]
    candidatesB = [drug_nameB, drug_nameB.lower()]

    drug_idA = next((hmgrl_service.name_to_dbid[name] for name in candidatesA if name in hmgrl_service.name_to_dbid), None)
    drug_idB = next((hmgrl_service.name_to_dbid[name] for name in candidatesB if name in hmgrl_service.name_to_dbid), None)

    if drug_idA is None or drug_idB is None:
        return {
            "success": False,
            "message": "Không tìm thấy thuốc trong cơ sở dữ liệu",
            "data": ""
        }

    idxA = hmgrl_service.drugbankid2id.get(drug_idA, [None])[0]
    idxB = hmgrl_service.drugbankid2id.get(drug_idB, [None])[0]

    if idxA is None or idxB is None:
        return {
            "success": True,
            "message": "Không tìm thấy thuốc trong mô hình",
            "data": ""
        }

    drug_ids = [[int(idxA), int(idxB)]]

    label_idx = hmgrl_service.predict(drug_ids)
    if isinstance(label_idx, (list, np.ndarray)):
        label_idx = int(label_idx[0])
    label = hmgrl_service.label_mapping[str(label_idx)]

    label = label.replace("[drug1]", drug_nameA).replace("[drug2]", drug_nameB)

    return {
        "success": True,
        "message": "Dự đoán thành công",
        "data": label
    }
