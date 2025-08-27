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

# Hàm lấy thông tin cần của thuốc cho model