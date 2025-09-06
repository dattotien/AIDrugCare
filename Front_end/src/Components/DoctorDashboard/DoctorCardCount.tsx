import React from "react";
import waitLogo from "../../assets/waiting.png";
import timeLogo from "../../assets/time-left.png";
import eventLogo from "../../assets/event.png";
import "./DoctorDashboard.css";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";

export default function DoctorCardCount() {
    const [visitedCount, setVisitedCount] = useState<number>(0);
    const [notVisitedCount, setNotVisitedCount] = useState<number>(0);
    const storedDoctorId = localStorage.getItem("doctorId");
    const doctorId = storedDoctorId ? Number(storedDoctorId) : null;
    useEffect(() => {
        const fetchVisitedCount = async () => {
        try {
            const res = await axios.get(
            `http://localhost:8000/visited-count-today/${doctorId}`
            );
            setVisitedCount(Number(res.data.data));
        } catch (err: any) {
            console.error(
            "Error fetching visited count:",
            err.response?.data || err.message
            );
        }
        };

        if (doctorId) {
        fetchVisitedCount();
        }
    }, [doctorId]);
    useEffect(() => {
        const fetchNotVisitedCount = async () => {
            try {
            const res = await axios.get(
                "http://localhost:8000/waiting-count"
            );
            console.log("Waiting API response:", res.data);
            setNotVisitedCount(Number(res.data.data));
            } catch (err: any) {
            console.error(
                "Error fetching not visited count:",
                err.response?.data || err.message
            );
            }
        };
        fetchNotVisitedCount();
    }, []); 

    return (
        <div className = "card-contain">
            <div className = "card1">
                <div className = "circle"> 
                    <img src= {waitLogo} alt = "wait" style = {{
                        width : "22px", 
                        height: "22px", 
                        marginLeft: "16px", 
                        marginTop: "15px"}}>
                    </img>
                </div>
                <div style = {{marginTop: "20px", marginLeft : "15px"}}>
                    <p style= {{fontSize: "26px", fontWeight: "bold", color: "#043bb3", margin: -5 }}>{notVisitedCount || "No data"}</p>
                    <p style = {{margin: -5, fontSize: "14px", color: "#737373" }}>Tổng số chưa khám</p>
                </div>
            </div>
            <div className = "card2" style = {{marginLeft : -150}}>
                <div className = "circle">
                    <img src= {timeLogo} alt = "time" style = {{
                        width : "22px", 
                        height: "22px", 
                        marginLeft: "16px", 
                        marginTop: "15px"}}>
                    </img>
                </div>  
                <div style = {{marginTop: "20px", marginLeft : "15px"}}>
                    <p style= {{fontSize: "26px", fontWeight: "bold", color: "#043bb3", margin: -5 }}>{visitedCount}</p>
                    <p style = {{margin: -5, fontSize: "14px", color: "#737373" }}>Tổng số đã khám: </p>
                </div>
            </div>
            <div className = "card-small">
                <div className = "circle-small">
                    <p style = {{fontSize : "50px", fontWeight : "bold", color : "#737373", marginTop: -23, marginLeft: 2}}>+</p>
                </div>
                <div style = {{marginTop: "21px", marginLeft : "8px"}}>
                    <p style = {{marginTop: -15,marginLeft: 9, fontSize: "14px", color: "#737373" }}>Tạo thêm</p> 
                </div>
            </div>
        </div>
    );
}
