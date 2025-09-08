import { useState } from "react";
import moreLogo from "../../assets/more (1).png";
import { Button, Dropdown, Menu, Modal } from "antd";
import dayjs from "dayjs";
import PatientOneHistory from "../PatientHistory/PatientOneHistory";
import "./PatientScene.css"
interface Props {
  visit: any; 
  highlight?: string;
}

export default function PatientCardHistory({ visit, highlight = "#043bb3" } : Props) {
  const [showHistory, setShowHistory] = useState(false);

  const menu = (
    <Menu className="ant-dropdown-menu"
      items={[
        {
          key: "1",
          label: "More",
          onClick: () => 
            {setShowHistory(true); },
        },
      ]}
    />
  );

  return (
    <>
      {!showHistory ? (
        <div className = "patient-card-his">
          {/* Thanh màu bên trái */}
          <div style={{
            position: "absolute",
            left: "0px",
            top: "50%",
            transform: "translateY(-50%)",
            width: "3px",
            height: "56px",
            backgroundColor: highlight,
             borderRadius: "20px",
          }}
          />

          {/* Nội dung */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "2px",
              marginLeft: "10px",
            }}
          >
            <span
              style={{
                fontSize: "16px",
                fontWeight: "bold",
                color: "#000000",
                marginBottom: "4px",
              }}
            >
              ID : {visit._id}
            </span>
            <span style={{ color: "#000000" }}>
              {visit.hospital} - {dayjs(visit.visit_date).format("YYYY/MM/DD")}
            </span>
            <span style={{ color: "#000000" }}>
              Chẩn đoán : {visit.diagnosis}
            </span>
          </div>

          {/* Nút More */}
          <Dropdown overlay={menu} trigger={["click"]}>
            <Button
              className="buttonMore"
              type="text"
              style={{
                position: "absolute",
                right: "10px",
                bottom: "3px",
                padding: "0",
                border: "none",
                background: "transparent",
                outline: "none",
              }}
              icon={
                <img
                  src={moreLogo}
                  alt="More"
                  style={{ width: "20px", height: "20px" }}
                />
              }
            />
          </Dropdown>
        </div>
      ) : (
        <Modal
          open={showHistory}
          centered
          width={1100}
          onCancel={() => setShowHistory(false)}
          footer={null}
        >
          <div
            style={{
              height: "500px",
              overflowY: "auto",
            }}
          >
            <PatientOneHistory visitId = {visit._id.toString()}/>
          </div>
        </Modal>
      )}
    </>
  );
}
