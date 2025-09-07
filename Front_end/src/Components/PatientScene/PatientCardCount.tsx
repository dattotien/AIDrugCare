import React from "react";
import waitLogo from "../../assets/waiting.png";
import timeLogo from "../../assets/time-left.png";
import eventLogo from "../../assets/event.png";
import dayjs from "dayjs";
import "./PatientScene.css";
interface CountProps {
  total?: any; 
  last?: any;
  next?: any;
}
export default function PatientCardCount({total, last, next} : CountProps) {
    return (
        <div   style={{
    display: "flex",
    justifyContent: "space-between",
    alignItems: "stretch",
    gap: "20px",
    marginTop: "2vw"
  }}>
            <div  style={{
      flex: 1,
      height: "15vh",
      backgroundColor: "#fff",
      borderRadius: "10px",
      display: "flex",
      flexDirection: "row",
    }}>
                <div   style={{
    width: "45px",
    height: "45px",
    borderRadius: "50%",
    backgroundColor: "#ffffff",
    boxShadow: "3px 3px 10px rgba(0, 0, 0, 0.3)",
    marginTop: "2.2vw",
    marginLeft: "4vh",
  }}> 
                    <img src= {waitLogo} alt = "wait" style = {{
                        width : "28px", 
                        height: "28px", 
                        marginLeft: "10px", 
                        marginTop: "10px"}}>
                    </img>
                </div>
                <div style = {{marginTop: "19px", marginLeft : "8px"}}>
                    <p style= {{fontSize: "26px", fontWeight: "bold", color: "#043bb3", margin: 0 }}>{total}</p>
                    <p style = {{margin: 0, fontSize: "14px", color: "#737373" }}>Tổng số lần khám</p>
                </div>
            </div>
            <div  style={{
      flex: 1,
      height: "15vh",
      backgroundColor: "#fff",
      borderRadius: "10px",
      display: "flex",
      flexDirection: "row",
    }}>
                <div  style={{
    width: "45px",
    height: "45px",
    borderRadius: "50%",
    backgroundColor: "#ffffff",
    boxShadow: "3px 3px 10px rgba(0, 0, 0, 0.3)",
    marginTop: "2.2vw",
    marginLeft: "4vh",
  }}>
                    <img src= {timeLogo} alt = "time" style = {{
                        width : "28px", 
                        height: "28px", 
                        marginLeft: "10px", 
                        marginTop: "10px"}}>
                    </img>
                </div>  
                <div style = {{marginTop: "21px", marginLeft : "8px"}}>
                    <p style= {{fontSize: "26px", fontWeight: "bold", color: "#043bb3", margin: 0 }}>{dayjs(last).format("YYYY/MM/DD")}</p>
                    <p style = {{margin: 0, fontSize: "14px", color: "#737373" }}>Lần khám gần nhất</p> 
                </div>
            </div>
            <div  style={{
      flex: 1,
      height: "15vh",
      backgroundColor: "#fff",
      borderRadius: "10px",
      display: "flex",
      flexDirection: "row",
    }}>
                <div  style={{
    width: "45px",
    height: "45px",
    borderRadius: "50%",
    backgroundColor: "#ffffff",
    boxShadow: "3px 3px 10px rgba(0, 0, 0, 0.3)",
    marginTop: "2.2vw",
    marginLeft: "4vh",
  }}>
                    <img src= {eventLogo} alt = "event" style = {{
                        width : "28px", 
                        height: "28px", 
                        marginLeft: "10px", 
                        marginTop: "10px"}}>
                    </img>
                </div>
                <div style = {{marginTop: "21px", marginLeft : "8px"}}>
                    <p style= {{fontSize: "26px", fontWeight: "bold", color: "#043bb3", margin: 0 }}>{dayjs(next).format("YYYY/MM/DD")}</p>
                    <p style = {{margin: 0, fontSize: "14px", color: "#737373" }}>Lần khám tiếp theo</p> 
                </div>
            </div>
        </div>
    );
}