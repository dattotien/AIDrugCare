import {Avatar, Button, Modal} from "antd";
import {useState} from "react";
import {UserOutlined, } from "@ant-design/icons";
import PatientInforScene from "../PatientInformation/PatientInformationScene";
import dayjs from "dayjs";
import arrowLogo from "../../assets/arrow-right (1).png"
import "./PatientScene.css";
interface PatientProps {
  patient: any; 
}
export default function PatientColInfor({patient} : PatientProps){
    if (!patient) return null;
    const [open, setOpen] = useState(false);

    return (
        <div className = "patient-col-container">
             <Avatar
                className="avatar1"
                style={{ marginBottom: "6px", cursor: "pointer" }}
                onClick={() => setOpen(true)}>
                    <UserOutlined style={{ fontSize: "100px", color: "#ffffff" }} />
            </Avatar>
            <p style = {{margin: 0,fontSize : "12px", color: "#737373", textAlign : "center"}}> Mã bênh nhân : {patient._id}</p>
            <p style={{ margin: 0, fontSize : "12px", color : "#737373", textAlign: "center"}}> Email : {patient.email} </p>

            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "70px 1fr", 
                    rowGap: "2.2vh", 
                    columnGap: "2vw", 
                    padding: "20px",
                    marginTop: "10px"
                    }}
                >
                <p className= "patient-col-label">Họ và tên:</p>
                <p className= "patient-col-input">{patient.name}</p>

                <p className= "patient-col-label">Giới tính:</p>
                <p className= "patient-col-input">{patient.gender}</p>

                <p className= "patient-col-label">Quê quán:</p>
                <p className= "patient-col-input">{patient.address}</p>

                <p className= "patient-col-label">Ngày sinh:</p>
                <p className= "patient-col-input">{dayjs(patient.dob).format("YYYY/MM/DD")}</p>

                <p className= "patient-col-label">CCCD:</p>
                <p className= "patient-col-input">{patient.cccd}</p>

                <p className= "patient-col-label">Số BHYT:</p>
                <p className= "patient-col-input">{patient.bhyt_code}</p>
            </div>

            <Button type="primary" disabled className = "patient-col-btn">ĐẶT LỊCH KHÁM
            <img src={arrowLogo} alt="ArrowLogo" style={{ width: "18px", height: "18px" }}></img>
            </Button>

               <Modal
                    open={open}
                    onCancel={() => setOpen(false)}
                    footer={null}
                    width={"58vw"}
                    zIndex={2000} >
                    <PatientInforScene patient={patient}/>
                </Modal>
        </div>

    );
}