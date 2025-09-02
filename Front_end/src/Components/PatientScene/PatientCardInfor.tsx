import {Avatar} from "antd";
import activeLogo from "../../assets/active.png";
import envelopeLogo from "../../assets/envelope.png";
import {useState} from "react";
import {UserOutlined} from "@ant-design/icons";
import "./PatientScene.css";
import dayjs from "dayjs";


export default function PatientCardInfor() {
    const [patient] = useState({
        name: "Nguyen Xuan Nam",
        email: "namnguyen@gmail.com"
    })
    return (
        <div style = {{
            width: "213px",
            height: "26px",
            display : "flex",
            alignItems : "center",
            gap : "8px",
            marginTop : "10px"
        }}>
            <img src = {envelopeLogo} alt = "envelope" style = {{width: "20px", height: "24px"}}></img>
            <img src = {activeLogo} alt = "active" style = {{width : "20px", height: "20px"}}></img>
             <Avatar
                size={24}
                icon={<UserOutlined />}
                style={{ backgroundColor: "#043bb3" }}
            />
            <div style={{ display: "flex", flexDirection: "column", lineHeight: "14px" }}>
                <p style={{ fontSize: "14px", fontWeight: "bold", color: "#043bb3", margin: 0 }}>
                    {patient.name}
                </p>
                <p style={{ fontSize: "10px", color: "#737373", margin: 0 }}>
                    {patient.email}
                </p>
            </div>
        </div>
    );
}