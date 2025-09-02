import { useState } from "react";
import moreLogo from "../../assets/more (1).png";
import { Button, Dropdown, Menu, Modal } from "antd";
import PatientOneHistory from "../PatientHistory/PatientOneHistory";

export default function PatientCardHistory({ highlight = "blue" }) {
  const [showHistory, setShowHistory] = useState(false);

  const menu = (
    <Menu
      items={[
        {
          key: "1",
          label: "More",
          onClick: () => setShowHistory(true), // khi chọn thì hiển thị PatientHistory
        },
      ]}
    />
  );

  return (
    <>
      {!showHistory ? (
        <div
          style={{
            width: "740px",
            height: "98px",
            backgroundColor: "#ffffff",
            borderRadius: "12px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "10px 20px",
            boxSizing: "border-box",
            margin: "8px",
            position: "relative",
          }}
        >
          {/* Thanh màu bên trái */}
          <div
            style={{
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
              Khám ngoại tổng quát
            </span>
            <span style={{ color: "#000000" }}>
              Bệnh viện đa khoa - cơ sở 3 - 28/8/2025
            </span>
            <span style={{ color: "#000000" }}>
              Khoa răng-hàm-mặt: PGS.TS Nguyễn Thị Ngọc Yến
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
            <PatientOneHistory />
          </div>
        </Modal>
      )}
    </>
  );
}
