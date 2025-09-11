from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from beanie import init_beanie
from entities.doctor import Doctor
from entities.drug import Drug
from entities.medical_history import Medical_History
from entities.patient import Patient
from entities.visit import Visit
from entities.prescription_detail import PrescriptionDetail
from api import drug_api, patient_api, doctor_api, authorization_api
from database import Database
from services.model_service import HMGRLService
from services.download_assets import ensure_assets
import torch
app = FastAPI(title="AI Drug Care API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.include_router(drug_api.router, tags=["Drug"])
app.include_router(patient_api.router, tags=["Patient"])
app.include_router(doctor_api.router, tags=["Doctor"])
app.include_router(authorization_api.router, tags=["Authorization"])
@app.on_event("startup")
async def startup_db():
    ensure_assets()
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
    device = "cuda" if torch.cuda.is_available() else "cpu"
    app.state.hmgrl_service = HMGRLService(
        model_path="/app/hmrgl_check_point.pt",
        data_path="/app",
        device=device
    )
    print(next(app.state.hmgrl_service.model.parameters()).device)
@app.on_event("shutdown")
async def shutdown_db():
    await Database.close_database_connection()

