from entities.drug import Drug
from pydantic import BaseModel, Field
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

async def search_drugs_by_name(name: str):
    drugs = await Drug.find(Drug.generic_name.contains(name)).project(DrugOut).to_list()
    if drugs:
        return {
            "success": True,
            "message": f"Tìm thấy {len(drugs)} thuốc khớp với '{name}'",
            "data": drugs
        }
    return {
        "success": False,
        "message": "Không tìm thấy thuốc nào",
        "data": None
    }

# Hàm lấy đầu vào list các thuốc và trả về tương tác thuốc dự đoán
async def predict_one_drug_interaction(drug_nameA: str, drug_nameB:str, hmgrl_service):
    # Chuyển tên thuốc sang drugbank_id
    if drug_nameA not in hmgrl_service.name_to_dbid or drug_nameB not in hmgrl_service.name_to_dbid:
        return {
            "success": False,
            "message": "Không tìm thấy thuốc trong cơ sở dữ liệu",
            "data": None
        }
    drug_idA = hmgrl_service.name_to_dbid[drug_nameA]
    drug_idB = hmgrl_service.name_to_dbid[drug_nameB]
    # Chuyển drugbank_id sang chỉ số trong mô hình
    if drug_idA not in hmgrl_service.drugbankid2id or drug_idB not in hmgrl_service.drugbankid2id:
        return {
            "success": False,
            "message": "Không tìm thấy thuốc trong mô hình",
            "data": None
        }
    idxA = int(hmgrl_service.drugbankid2id[drug_idA][0])
    idxB = int(hmgrl_service.drugbankid2id[drug_idB][0])
    drug_ids = [[idxA, idxB]]
    label = hmgrl_service.predict(drug_ids)
    return {
        "success": True,
        "message": "Dự đoán thành công",
        "data": int(label)
    }