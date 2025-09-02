from typing import List, Optional
from pydantic import BaseModel
from datetime import datetime
from beanie import Document
class PrescriptionItem(BaseModel):
    drug_id: str
    dosage: str
    frequency: str
    duration_days: int
    start_time: datetime
    end_time: datetime
    note: Optional[str] = None

class PrescriptionDetail(Document):
    id: Optional[int]
    visit_id: int
    start_time: datetime
    items: List[PrescriptionItem]
    
    class Config:
        json_schema_extra = {
            "example": {
                "id": 1000,
                "visit_id": 1000,
                "start_time": "2025-05-01T14:39:13.968604",
                "items": [
                    {
                        "drug_id": "DB17907",
                        "dosage": "2 viên",
                        "frequency": "1 lần/ngày",
                        "duration_days": 5,
                        "start_time": "2025-05-01T14:39:13.968604",
                        "end_time": "2025-05-06T14:39:13.968604",
                        "note": "Theo dõi huyết áp hằng ngày và tái khám sau 2 tuần."
                    },
                    {
                        "drug_id": "DB12959",
                        "dosage": "1 viên",
                        "frequency": "2 lần/ngày",
                        "duration_days": 5,
                        "start_time": "2025-05-01T14:39:13.968604",
                        "end_time": "2025-05-06T14:39:13.968604",
                        "note": "Cho bệnh nhân dùng thuốc kháng sinh trong 7 ngày."
                    }
                ]
            }
        }
    class Settings:
        name = "Prescription_Detail"
        indexes = [
            "visit_id",
            [("start_time", -1)],
        ]
