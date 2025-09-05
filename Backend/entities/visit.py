from beanie import Document
from pydantic import Field
from typing import List, Optional
from datetime import datetime


class Visit(Document):
    id: int = Field(..., alias="_id")
    doctor_id: int
    patient_id: int
    hospital: str
    visit_date: datetime
    symptoms: List[str] = []
    diagnosis: Optional[str] = None
    note: Optional[str] = None
    status: str 

    class Settings:
        name = "Visit"   # Tên collection

    class Config:
        json_schema_extra = {
            "example": {
                "_id": 1002,
                "doctor_id": 1000,
                "patient_id": 1026,
                "hospital": "Bệnh viện đa khoa A - Cơ sở 3",
                "visit_date": "2025-04-25T00:00:56.306107",
                "symptoms": ["buồn nôn", "chán ăn", "Đau bụng"],
                "diagnosis": "Viêm dạ dày",
                "note": "Khuyến cáo uống nhiều nước và nghỉ ngơi.",
                "status": "Đã khám"
            }
        }
