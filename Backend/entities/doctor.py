from beanie import Document
from pydantic import Field, EmailStr
from typing import Optional
from datetime import datetime


class Doctor(Document):
    id: int = Field(..., alias="_id")   # MongoDB _id
    password: str
    name: str
    gender: Optional[str] = None
    dob: Optional[datetime] = None
    email: Optional[EmailStr] = None
    phone: Optional[str] = None
    cccd: Optional[str] = None
    workplace: Optional[str] = None
    specialty: Optional[str] = None
    title: Optional[str] = None
    created_at: datetime = Field(default_factory=datetime.utcnow)

    class Config:
        json_schema_extra = {
            "example": {
                "_id": 1001,
                "password": "e(1P*kRqpD",
                "name": "Đinh Kiều Bảo",
                "gender": "Nam",
                "dob": "1987-07-30",
                "email": "DinhBao@gmail.com",
                "phone": "0972997318",
                "cccd": "694832597063",
                "workplace": "Bệnh viện đa khoa A – Cơ sở 3",
                "specialty": "Nội khoa",
                "title": "TS",
                "created_at": "2025-05-28T08:07:13.521015"
            }
        }

    class Settings:
        name = "Doctor"   
        indexes = [
            "email",
            "phone",
            "cccd",
            "specialty",
            [("name", 1), ("created_at", -1)]
        ]
