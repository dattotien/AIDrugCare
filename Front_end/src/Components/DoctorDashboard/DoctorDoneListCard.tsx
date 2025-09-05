import { useState } from "react";
import moreLogo from "../../assets/arrow-right.png";
import evenLogo from "../../assets/event.png";
import PatientOneHistory from "../PatientHistory/PatientOneHistory";
import { Modal } from "antd";

export default function DoctorDoneListCard({ highlight = "#043bb3" }) {
  const [open, setOpen] = useState(false);

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
          Tuổi : 30 - Nữ 
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
          onClick={() => setOpen(true)}
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
        Đau bụng, đầy hơi, khó tiêu
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
          ID : 1004
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
            20, tháng 8
          </p>
        </div>
      </div>

      <Modal
        open={open}
        centered
        width={1100}
        onCancel={() => setOpen(false)}
        footer={null}
      >
        <div
          style={{
            height: "500px",
            overflowY: "auto",
          }}
        >
          <PatientOneHistory />
        </div>
      </Modal>
    </div>
  );
}
