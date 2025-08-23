import type React from "react"
import { useState } from "react"
import { Breadcrumb, Layout, Menu } from "antd"
const { Header, Content, Footer } = Layout
import DrugInteractionChecker from "./Components/DrugInteractionChecker"
import UETLogo from "./assets/UET.png";
const items = [
  { key: "1", label: "Khám chữa bệnh và kê đơn" },
  { key: "2", label: "Hồ sơ" },
  { key: "3", label: "Lịch sử khám bệnh" },
  { key: "4", label: "Danh mục thuốc" },
  { key: "5", label: "Kiểm tra tương tác thuốc" },
]

const App: React.FC = () => {
  const [selectedLabel, setSelectedLabel] = useState("");
  const handleMenuSelect = ({ key }: { key: string }) => {
  const selectedItem = items.find(item => item.key === key)
  if (selectedItem) {
    setSelectedLabel(selectedItem.label)
  }
}
  return (
    <Layout className="layout" style={{ minHeight: "100vh", minWidth: "100vw" }}>
      <Header style={{ display: "flex", alignItems: "center" }}>
        <div className="demo-logo" style={{ marginRight: "10px", height: "100%", padding: "2px" }}>
          <img src={UETLogo} alt="UET Logo" style={{ height: "100%" }} />
        </div>
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={["1"]}
          onSelect={handleMenuSelect}
          items={items}
          style={{ flex: 1, minWidth: 0 }}
        />
      </Header>
      <Content style={{ padding: "0 48px" }}>
        <Breadcrumb style={{ margin: "16px 0" }} items={[{ title: "Trang chủ" }, { title: selectedLabel }]} />
        <div
          style={{
            background: "#fff",
            minHeight: "70vh",
            padding: "10vh",
            borderRadius: 20,
          }}
        >
        {
          selectedLabel === "Kiểm tra tương tác thuốc" && <DrugInteractionChecker />
        }
        </div>
      </Content>
      <Footer style={{ textAlign: "center" }}>Hệ thống hỗ trợ kê đơn thuốc - Đại học Công nghệ - ĐHQGHN</Footer>
    </Layout>
  )
}



export default App
