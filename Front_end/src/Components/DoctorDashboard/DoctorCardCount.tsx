import React from "react";
import waitLogo from "../../assets/waiting.png";
import timeLogo from "../../assets/time-left.png";
import eventLogo from "../../assets/event.png";
import "./DoctorDashboard.css";

export default function DoctorCardCount() {
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
                    <p style= {{fontSize: "26px", fontWeight: "bold", color: "#043bb3", margin: -5 }}>8</p>
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
                    <p style= {{fontSize: "26px", fontWeight: "bold", color: "#043bb3", margin: -5 }}>5</p>
                    <p style = {{margin: -5, fontSize: "14px", color: "#737373" }}>Tổng số đã khám</p> 
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