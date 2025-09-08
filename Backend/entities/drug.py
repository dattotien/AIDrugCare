from beanie import Document
from pydantic import BaseModel, Field
from typing import Optional, List
from datetime import datetime

class BrandName(BaseModel):
    name: str
    route: Optional[str] = None
    strength: Optional[str] = None
    dosage_form: Optional[str] = None
    country: Optional[str] = None

class DrugInteraction(BaseModel):
    drugbank_id: Optional[str] = None
    name: Optional[str] = None
    description: Optional[str] = None

class Drug(Document):
    id: str = Field(alias="_id")
    generic_name: str
    description: Optional[str] = None
    brand_names: List[BrandName] = []
    dosage_forms: List[str] = []
    categories: List[str] = []
    atc_code: List[str] = []
    chemical_formula: Optional[str] = None
    molecular_formula: Optional[str] = None
    drug_interaction: List[DrugInteraction] = []
    synonyms: List[str] = []
    manufacturers: List[str] = []

    class Config:
        json_schema_extra = {
        "example": {
            "_id": "DB00002",
            "generic_name": "Cetuximab",
            "description": "Cetuximab is a recombinant monoclonal antibody...",
            "brand_names": [
                {
                    "name": "Erbitux",
                    "route": "Intravenous",
                    "strength": "2 mg/mL",
                    "dosage_form": "Solution",
                    "country": "US"
                }
            ],
            "dosage_forms": ["Injection", "Solution"],
            "categories": ["Immunotherapy", "EGFR inhibitors"],
            "atc_code": ["L01FE01"],
            "chemical_formula": "C2256H3438N572O673S16",
            "molecular_formula": "C6484H10042N173202O2023S36",
            "drug_interaction": [
                {
                    "drugbank_id": "DB00316",
                    "name": "Infliximab",
                    "description": "Infliximab có thể làm giảm hiệu quả của Cetuximab"
                },
                {
                    "drugbank_id": "DB00945",
                    "name": "Warfarin",
                    "description": "Nguy cơ chảy máu tăng khi dùng chung với Cetuximab"
                }
            ],
            "synonyms": ["Cetuximab", "Cétuximabum"],
            "manufacturers": ["Bristol-Myers Squibb", "Merck KGaA"]
        }
    }


    class Settings:
        name = "Drug"
        indexes = [
            "generic_name",
            "molecular_formula",
            "categories",
            [("generic_name", 1), ("created_at", -1)]
        ]