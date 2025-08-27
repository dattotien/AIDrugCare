from typing import List, Optional
from beanie import Document


class Medical_History(Document):
    _id: int
    patient_id: int
    visit_id: int
    condition_code: str
    condition_name: str
    allergies: List[str] = []
    chronic_diseases: List[str] = []
    surgeries: List[str] = []
    family_history: Optional[str] = None
    notes: Optional[str] = None
    
    class Config:
        json_schema_extra = {
            "example": {
                "_id": 1002,
                "patient_id": 1026,
                "visit_id": 1002,
                "condition_code": "C50",
                "condition_name": "Ung thư vú",
                "allergies": [],
                "chronic_diseases": [],
                "surgeries": [],
                "family_history": "Mẹ bị ung thư vú",
                "notes": "Đang trong phác đồ điều trị ung thư."
            }
        }
    class Settings:
        name = "Medical_History"
