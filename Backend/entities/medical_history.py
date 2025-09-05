from typing import List, Optional
from beanie import Document


class Medical_History(Document):
    id: int
    patient_id: int
    visit_id: int
    allergies: List[str] = []
    chronic_diseases: List[str] = []
    surgeries: Optional[str]
    family_history: Optional[str] = None
    labResults: Optional[str] = None
    
    class Config:
        json_schema_extra = {
            "example": {
                "_id": 1002,
                "patient_id": 1026,
                "visit_id": 1002,
                "allergies": [],
                "chronic_diseases": [],
                "surgeries": [],
                "family_history": "Mẹ bị ung thư vú",
                "labResults": "Xét nghiệm máu bình thường"
            }
        }
    class Settings:
        name = "Medical_History"
