import { useState } from "react";
import moreLogo from "../../assets/arrow-right.png";
import evenLogo from "../../assets/event.png";
import PatientOneHistory from "../PatientHistory/PatientOneHistory";
import { Modal } from "antd";
import dayjs from "dayjs";

interface Props {
  visit : any;
  highlight?: string; 
}
export default function DoctorDoneListCard({ visit, highlight = "#043bb3" }: Props) {

  return (
    <div
      style={{
        position: "relative",
        width: "300px",
        height: "60px",
        backgroundColor: "white",
        borderRadius: "10px",
        display: "flex",
        flexDirection: "column",
        margin: 0,
        padding: "6px 10px",
        boxSizing: "border-box",
        overflow: "hidden",
        marginBottom: 15,
        marginLeft: 18,
        boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
      }}
    >

      <div
        style={{
          position: "absolute",
          left: "0px",
          top: "50%",
          transform: "translateY(-50%)",
          width: "3px",
          height: "45px",
          backgroundColor: highlight,
          borderRadius: "20px",
        }}
      />

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <p style={{ fontSize: "12px", color: "#737373", margin: 0, marginTop: -8}}>
          {dayjs(visit.age).format("YYYY-MM-DD")} - {visit.dob} 
        </p>
        <img
          src={moreLogo}
          alt="more"
          style={{
            width: "15px",
            height: "15px",
            cursor: "pointer",
            flexShrink: 0,
          }}
        />
      </div>

      <p
        style={{
          fontSize: "12px",
          color: "#000000",
          fontWeight: "bold",
          margin: "2px 0 0 0",
          marginTop: -6
        }}
      >
        {visit.diagnosis}
      </p>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: 4,
        }}
      >
        <p
          style={{
            fontSize: "12px",
            color: "#737373",
            margin: 0,
            marginTop: 2
          }}
        >
          ID : {visit.patient_id}
        </p>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 4,
            flexShrink: 0,
          }}
        >
          <img
            src={evenLogo}
            alt="event"
            style={{ width: "15px", height: "15px" }}
          />
          <p
            style={{
              fontSize: "12px",
              color: "#737373",
              margin: 0,
            }}
          >
            28, tháng 8
          </p>
        </div>
      </div>
    </div>
  );
}
