from beanie import Document
from pydantic import Field, EmailStr
from typing import Optional
from datetime import datetime


class Patient(Document):
    id: int = Field(..., alias="_id")
    name: str
    email: Optional[EmailStr] = None
    password: str
    dob: Optional[datetime] = None
    phone: Optional[str] = None
    gender: Optional[str] = None
    cccd: Optional[str] = None
    bhyt_code: Optional[str] = None
    address: Optional[str] = None
    created_at: datetime = Field(default_factory=datetime.utcnow)

    class Config:
        json_schema_extra = {
            "example": {
                "id": '1000',
                "name": "Đinh Phương Tuấn",
                "email": "DinhTuan@gmail.com",
                "password": "lI0BuG4qT*",
                "dob": "1989-04-29",
                "phone": "0892339760",
                "gender": "Nam",
                "cccd": '022205002980',
                "bhyt_code": "BHYT76627167",
                "address": "Bắc Ninh",
                "created_at": "2025-08-09T04:55:52.106008"
            }
        }

    class Settings:
        name = "Patient"   
        indexes = [
            "email",        
            "phone",        
            "cccd",         
            "bhyt_code",    
            [("name", 1), ("created_at", -1)]  
        ]
