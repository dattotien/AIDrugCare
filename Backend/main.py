from fastapi import FastAPI
from database import Database
app = FastAPI()

@app.on_event("startup")
async def startup_db():
    await Database.connect_to_database()

@app.on_event("shutdown")
async def shutdown_db():
    await Database.close_database_connection()

@app.get("/test-db")
async def test_db():
    db = Database.get_database()
    patients = db["patients"]
    count = await patients.count_documents({})
    return {"patients_count": count}
