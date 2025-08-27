from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from beanie import init_beanie
from entities.doctor import Doctor
from entities.drug import Drug
from entities.medical_history import Medical_History
from entities.patient import Patient
from entities.visit import Visit
from entities.prescription_detail import PrescriptionDetail
from api import drug_api, patient_api
from database import Database
app = FastAPI(title="AI Drug Care API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # hoặc thay * bằng domain frontend của bạn
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.include_router(drug_api.router, tags=["Drug"])
app.include_router(patient_api.router, tags=["Patient"])
@app.on_event("startup")
async def startup_db():
    await Database.connect_to_database()
    client = Database.client
    await init_beanie(
        database=client.Hospital,
        document_models=[
            Doctor,
            Drug,
            Medical_History,
            Patient,
            Visit,
            PrescriptionDetail
        ]
    )

@app.on_event("shutdown")
async def shutdown_db():
    await Database.close_database_connection()

