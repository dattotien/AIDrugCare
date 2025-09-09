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
    key = "-".join(sorted([str(drug_idA), str(drug_idB)]))
    if(key in hmgrl_service.inter_dict):
        label = hmgrl_service.inter_dict[key]
        label = label.replace("[drug1]", drug_nameA).replace("[drug2]", drug_nameB)
        return{
            "success": True,
            "message": "Dự đoán thành công",
            "data": label
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
async def get_all_interactions(drug_list: list[str], hmgrl_service):
    results = []
    n = len(drug_list)

    drug_info = {}
    for drug in drug_list:
        candidates = [drug, drug.lower()]
        drug_id = next((hmgrl_service.name_to_dbid[name] 
                        for name in candidates if name in hmgrl_service.name_to_dbid), None)
        if drug_id is None:
            drug_info[drug] = {"id": None, "idx": None}
            continue

        idx = hmgrl_service.drugbankid2id.get(drug_id, [None])[0]
        drug_info[drug] = {"id": drug_id, "idx": idx}

    # --- B2: sinh cặp và gom batch ---
    drug_pairs = []
    pair_meta = []

    for i in range(n):
        for j in range(i + 1, n):
            drugA, drugB = drug_list[i], drug_list[j]
            infoA, infoB = drug_info[drugA], drug_info[drugB]

            # Nếu không có trong DB
            if infoA["id"] is None or infoB["id"] is None:
                results.append({
                    "drug1": drugA,
                    "drug2": drugB,
                    "interaction": "Không tìm thấy thuốc trong cơ sở dữ liệu"
                })
                continue

            # Check dict tĩnh trước
            key = "-".join(sorted([str(infoA["id"]), str(infoB["id"])]))
            if key in hmgrl_service.inter_dict:
                label = hmgrl_service.inter_dict[key]
                label = label.replace("[drug1]", drugA).replace("[drug2]", drugB)
                results.append({
                    "drug1": drugA,
                    "drug2": drugB,
                    "interaction": label
                })
                continue

            # Nếu không có trong dict, chuẩn bị batch
            if infoA["idx"] is None or infoB["idx"] is None:
                results.append({
                    "drug1": drugA,
                    "drug2": drugB,
                    "interaction": "Không có tương tác thuốc"
                })
                continue

            drug_pairs.append([int(infoA["idx"]), int(infoB["idx"])])
            pair_meta.append((drugA, drugB))

    # --- B3: predict batch ---
    if drug_pairs:
        label_indices = hmgrl_service.predict(drug_pairs)

        if isinstance(label_indices, (list, np.ndarray)):
            label_indices = [int(x) for x in label_indices]
        else:
            label_indices = label_indices.cpu().numpy().tolist()

        for (drugA, drugB), label_idx in zip(pair_meta, label_indices):
            label = hmgrl_service.label_mapping[str(label_idx)]
            label = label.replace("[drug1]", drugA).replace("[drug2]", drugB)
            results.append({
                "drug1": drugA,
                "drug2": drugB,
                "interaction": label
            })

    return {
        "success": True,
        "message": f"Tìm thấy {len(results)} cặp tương tác",
        "data": results
    }