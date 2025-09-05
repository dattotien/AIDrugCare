import React from "react";
import waitLogo from "../../assets/waiting.png";
import timeLogo from "../../assets/time-left.png";
import eventLogo from "../../assets/event.png";
import "./PatientScene.css";
export default function PatientCardCount() {
    return (
        <div className = "card-contain">
            <div className = "card">
                <div className = "circle"> 
                    <img src= {waitLogo} alt = "wait" style = {{
                        width : "28px", 
                        height: "28px", 
                        marginLeft: "13px", 
                        marginTop: "13px"}}>
                    </img>
                </div>
                <div style = {{marginTop: "19px", marginLeft : "8px"}}>
                    <p style= {{fontSize: "26px", fontWeight: "bold", color: "#043bb3", margin: 0 }}>7</p>
                    <p style = {{margin: 0, fontSize: "14px", color: "#737373" }}>Tổng số lần khám</p>
                </div>
            </div>
            <div className = "card">
                <div className = "circle">
                    <img src= {timeLogo} alt = "time" style = {{
                        width : "28px", 
                        height: "28px", 
                        marginLeft: "13px", 
                        marginTop: "13px"}}>
                    </img>
                </div>  
                <div style = {{marginTop: "21px", marginLeft : "8px"}}>
                    <p style= {{fontSize: "26px", fontWeight: "bold", color: "#043bb3", margin: 0 }}>28-8-2025</p>
                    <p style = {{margin: 0, fontSize: "14px", color: "#737373" }}>Lần khám gần nhất</p> 
                </div>
            </div>
            <div className = "card">
                <div className = "circle">
                    <img src= {eventLogo} alt = "event" style = {{
                        width : "28px", 
                        height: "28px", 
                        marginLeft: "13px", 
                        marginTop: "13px"}}>
                    </img>
                </div>
                <div style = {{marginTop: "21px", marginLeft : "8px"}}>
                    <p style= {{fontSize: "26px", fontWeight: "bold", color: "#043bb3", margin: 0 }}>28-9-2025</p>
                    <p style = {{margin: 0, fontSize: "14px", color: "#737373" }}>Lần khám tiếp theo</p> 
                </div>
            </div>
        </div>
    );
}