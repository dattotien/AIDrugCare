import {Avatar, Button, Modal} from "antd";
import {useState} from "react";
import {UserOutlined, } from "@ant-design/icons";
import "./PatientScene.css";
import PatientInforScene from "../PatientInformation/PatientInformationScene";
import dayjs from "dayjs";
import arrowLogo from "../../assets/arrow-right (1).png"

interface PatientProps {
  patient: any; 
}
export default function PatientColInfor({patient} : PatientProps){
    if (!patient) return null;
    const [open, setOpen] = useState(false);

    return (
        <div
            style={{
                width: "219px",
                height: "100vh",
                backgroundColor:"rgba(255,255,255,0.7)",
                display: "flex",
                flexDirection: "column", 
                overflow: "hidden",
                alignItems: "center",
                justifyItems: "center"
            }}>
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
                    rowGap: "15px", 
                    columnGap: "0px", 
                    padding: "20px",
                    marginTop: "10px"
                    }}
                >
                <p style={{ fontSize : "12px", fontWeight: "bold", margin: 0 }}>Họ và tên:</p>
                <p style={{ fontSize : "12px",margin: 0 , textAlign: "right"}}>{patient.name}</p>

                <p style={{ fontSize : "12px",fontWeight: "bold", margin: 0 }}>Giới tính:</p>
                <p style={{ fontSize : "12px",margin: 0 , textAlign: "right"}}>{patient.gender}</p>

                <p style={{ fontSize : "12px",fontWeight: "bold", margin: 0 }}>Quê quán:</p>
                <p style={{ fontSize : "12px",margin: 0 , textAlign: "right"}}>{patient.address}</p>

                <p style={{ fontSize : "12px",fontWeight: "bold", margin: 0 }}>Ngày sinh:</p>
                <p style={{ fontSize : "12px",margin: 0 , textAlign: "right"}}>{patient.dob}</p>

                <p style={{ fontSize : "12px",fontWeight: "bold", margin: 0 }}>CCCD:</p>
                <p style={{ fontSize : "12px",margin: 0 , textAlign: "right"}}>{patient.cccd}</p>

                <p style={{ fontSize : "12px",fontWeight: "bold", margin: 0 }}>Số BHYT:</p>
                <p style={{ fontSize : "12px",margin: 0 , textAlign: "right"}}>{patient.bhyt_code}</p>
            </div>

            <Button type="primary" disabled style = {{
                color : "#ffffff",
                fontSize : "12px",
                fontWeight : "bold",
                backgroundColor : "#043bb3",
                borderRadius: "10px",
                width: "160px",
                height : "30px",
                textAlign: "center",
                marginTop:  "120px",
                borderColor: "#043bb3"
            }}>ĐẶT LỊCH KHÁM
            <img src={arrowLogo} alt="ArrowLogo" style={{ width: "18px", height: "18px" }}></img>
            </Button>

               <Modal
                    open={open}
                    onCancel={() => setOpen(false)}
                    footer={null}
                    width={700}
                    zIndex={2000} >
        <PatientInforScene patient={patient}/>
      </Modal>
        </div>

    );
}