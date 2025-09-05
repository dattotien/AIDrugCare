from entities.doctor import Doctor
from entities.patient import Patient

async def login_doctor_service(email: str, password: str):
    doctor = await Doctor.find_one(Doctor.email == email)

    if not doctor:
        return {
            "success": False,
            "message": "Tài khoản hoặc mật khẩu sai.",
            "data": None
        }

    if doctor.password != password:
        return {
            "success": False,
            "message": "Tài khoản hoặc mật khẩu sai.",
            "data": None
        }

    return {
        "success": True,
        "message": "Đăng nhập thành công",
        "data": {
            "id": doctor.id,
            "name": doctor.name,
            "email": doctor.email,
            "phone": doctor.phone,
            "specialty": doctor.specialty,
            "title": doctor.title,
            "workplace": doctor.workplace
        }
    }

async def login_patient_service(cccd: str, password: str):
    patient = await Patient.find_one(Patient.cccd == cccd)

    if not patient:
        return {
            "success": False,
            "message": "Tài khoản hoặc mật khẩu sai.",
            "data": None
        }

    if patient.password != password:
        return {
            "success": False,
            "message": "Tài khoản hoặc mật khẩu sai.",
            "data": None
        }

    patient_data = {
        "id": patient.id,
        "name": patient.name,
        "email": patient.email,
        "phone": patient.phone,
        "cccd": patient.cccd,
        "patient.dob": patient.dob,
    }

    return {
        "success": True,
        "message": "Đăng nhập thành công",
        "data": patient_data
    }
    
async def logout_service():
    return {
        "success": True,
        "message": "Đăng xuất thành công",
        "data": None
    }