import type React from "react";
import { useState } from "react";
import { Breadcrumb, Layout, Menu } from "antd";
const { Content } = Layout;
import DrugInteractionChecker from "./DrugInteractionChecker/DrugInteractionChecker";
import Logo from "../assets/AIDrugCare.png";
import Sider from "antd/es/layout/Sider";
import DrugListScene from "./DrugListScene";
import Back from "../assets/back.png";
const items = [
  { key: "1", label: "Khám chữa bệnh và kê đơn" },
  { key: "2", label: "Hồ sơ" },
  { key: "3", label: "Lịch sử khám bệnh" },
  { key: "4", label: "Danh mục thuốc" },
  { key: "5", label: "Kiểm tra tương tác thuốc" },
];

export default function DoctorScene() {
  const [selectedLabel, setSelectedLabel] = useState("");
  const handleMenuSelect = ({ key }: { key: string }) => {
    const selectedItem = items.find((item) => item.key === key);
    if (selectedItem) {
      setSelectedLabel(selectedItem.label);
    }
  };
  return (
    <Layout
      className="layout"
      style={{
        minHeight: "100vh",
        minWidth: "100vw",
        backgroundImage: `url(${Back})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
    >
      <Sider
        style={{
          backgroundColor: "#ffffffc6",
          borderRadius: "0px 20px 20px 20px",
          maxHeight: "90vh",
        }}
      >
        <div
          className="demo-logo"
          style={{ marginRight: "10px", padding: "2px" }}
        >
          <img src={Logo} alt="Logo" style={{ width: "100%" }} />
        </div>
        <Menu
          color="#FFFFFF"
          mode="vertical"
          defaultSelectedKeys={["1"]}
          onSelect={handleMenuSelect}
          items={items}
          style={{ flex: 1, minWidth: 0 }}
        />
      </Sider>
      <Layout style={{ backgroundColor: "transparent" }}>
        <Content
          style={{
            padding: "0 10vw",
            backgroundColor: "transparent",
          }}
        >
          <Breadcrumb
            style={{ margin: "16px 0" }}
            items={[{ title: "Trang chủ" }, { title: selectedLabel }]}
          />
          <div
            style={{
              background: "#ffffffce",
              minHeight: "90vh",
              padding: "5vh 5vw 5vh 5vw",
            }}
          >
            {
              <>
                {selectedLabel === "Kiểm tra tương tác thuốc" && (
                  <DrugInteractionChecker />
                )}
                {selectedLabel === "Danh mục thuốc" && <DrugListScene />}
              </>
            }
          </div>
        </Content>
      </Layout>
    </Layout>
  );
}
