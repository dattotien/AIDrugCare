import { useState } from "react";
import moreLogo from "../../assets/Group 133.png";
import editLogo from "../../assets/edit (2).png";
import PatientOneHistory from "../PatientHistory/PatientOneHistory";
import { Modal } from "antd";

export default function DoctorEventListCard({ highlight = "#043bb3" }) {
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
        padding: "6px 12px", // thêm padding thay vì margin fix cứng
        boxSizing: "border-box",
        marginBottom: 15,
        marginLeft: 18,
        boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
        

      }}
    >
      {/* Thanh highlight bên trái */}
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

      {/* Hàng 1: Tiểu phẫu + icon edit */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <p style={{ fontSize: "12px", color: "#737373", margin: 0, marginTop: -10 }}>
          Tiểu phẫu 
        </p>
        <img
          src={editLogo}
          alt="edit"
          style={{
            width: "15px",
            height: "15px",
            cursor: "pointer",
          }}
        />
      </div>

      {/* Hàng 2: Nội dung chính */}
      <p
        style={{
          fontSize: "12px",
          color: "#000000",
          fontWeight: "bold",
          margin: 0,
          marginTop: -8
        }}
      >
        Cắt bỏ ruột thừa
      </p>

      {/* Hàng 3: Thời gian + (+10 & moreLogo) */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <p
          style={{
            fontSize: "12px",
            color: "#737373",
            margin: 0,
            marginTop: 10
          }}
        >
          7:00 - 8:00 A.M
        </p>

        <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
          <p
            style={{
              fontSize: "12px",
              color: "#737373",
              margin: 0,
              marginTop: 10
            }}
          >
            +10
          </p>
          <img
            src={moreLogo}
            alt="event"
            style={{ width: "30px", height: "20px" }}
          />
        </div>
      </div>
    </div>
  );
}
