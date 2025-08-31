import type React from "react";
import { useState } from "react";
import { Breadcrumb, Layout, Menu } from "antd";
const { Header, Content, Footer } = Layout;
import DrugInteractionChecker from "./Components/DrugInteractionChecker";
import Logo from "./assets/AIDrugCare.png";
import Sider from "antd/es/layout/Sider";
import DrugListScene from "./Components/DrugListScene";
import backgroundImage from "./assets/tải xuống.png";

const items = [
  { key: "1", label: "Khám chữa bệnh và kê đơn" },
  { key: "2", label: "Hồ sơ" },
  { key: "3", label: "Lịch sử khám bệnh" },
  { key: "4", label: "Danh mục thuốc" },
  { key: "5", label: "Kiểm tra tương tác thuốc" },
];

const App: React.FC = () => {
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
        backgroundImage: `url(${backgroundImage})`, 
        backgroundSize: "cover", 
        backgroundPosition: "center", 
        backgroundRepeat: "no-repeat", 
      }}
    >
      <Sider style={{ backgroundColor: "#FFFFFF" }}>
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
      <Layout>
        <Content style={{ 
          padding: "0 48px", 
          backgroundImage: `url(${backgroundImage})`, 
          backgroundSize: "cover", 
          backgroundPosition: "center", 
          backgroundRepeat: "no-repeat",  
        }}>
          <div
            style={{
              height: "100%",
              width: "100%",
              padding: "0",
              borderRadius: 20,
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
};

export default App;
