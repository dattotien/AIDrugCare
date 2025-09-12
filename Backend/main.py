from fastapi import FastAPI, Request
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
from services.download_assets import ensure_assets, MODEL_PATH, ASSETS_DIR
import torch

def get_model_service(request: Request) -> HMGRLService:
    if request.app.state.hmgrl_service is None:
        device = "cuda" if torch.cuda.is_available() else "cpu"
        request.app.state.hmgrl_service = HMGRLService(
            model_path=MODEL_PATH,
            data_path=ASSETS_DIR,
            device=device,
        )
        print("✅ Model loaded lazily")
    return request.app.state.hmgrl_service

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
    # tải assets JSON/model file thôi, chưa load vào RAM
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
    # chưa load model, chỉ để None
    app.state.hmgrl_service = None
    print("✅ Startup done, model sẽ load khi cần.")

@app.on_event("shutdown")
async def shutdown_db():
    await Database.close_database_connection()

# API test lazy load
@app.get("/predict")
async def predict(request: Request, input: str):
    if request.app.state.hmgrl_service is None:
        device = "cuda" if torch.cuda.is_available() else "cpu"
        request.app.state.hmgrl_service = HMGRLService(
            model_path=MODEL_PATH,
            data_path=ASSETS_DIR,
            device=device
        )
        print("✅ Model loaded lazily on first request")
    model_service = request.app.state.hmgrl_service
    # gọi predict ở đây
    return {"result": "ok"}
