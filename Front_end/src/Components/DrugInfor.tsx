import { Tabs, Card, Table, Alert, Tag } from "antd";
import { MedicineBoxOutlined } from "@ant-design/icons";

import avatarDrug from "../assets/drugs_blue.png";

interface DrugInforProps {
  drug: any;
}

export default function DrugInfor({ drug }: DrugInforProps) {
  const items = [
    {
      key: "1",
      label: "Thông tin chi tiết",
      children: (
        <div>
          <Card
            title={<span style={{ color: "#1976d2", fontWeight: "bold" }}>Mô tả chi tiết :</span>}
            bordered={false}
            style={{ marginBottom: 16, background: "#f9fbff" }}
          >
            <p style={{ margin: 0 }}>
              A recombinant DNA-derived cytotoxic protein composed of the amino acid 
              sequences for diphtheria toxin fragments A and B (Met1-Thr387)-His 
              followed by the sequences for interleukin-2 (IL-2; Ala 1-Thr 133). 
              It is produced in an E. coli expression system.
            </p>
          </Card>

          <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
            <Card
                title={<span style={{ color: "#1976d2", fontWeight: "bold" }}>Thông tin sản phẩm</span>}
                bordered
                headStyle={{ borderBottom: "2px solid #c0cde0ff" }}
                style={{ flex: 1, borderRadius: 12, border: "2px solid #85b3f3ff" }}
                >
                <p><b>Tên thương mại:</b> Ontak</p>
                <p><b>Đường dùng:</b> Tiêm tĩnh mạch</p>
                <p><b>Hàm lượng:</b> 150 mg/ml</p>
                <p><b>Dạng bào chế:</b> Dung dịch tiêm</p>
                <p><b>Xuất xứ:</b> US</p>
            </Card>

            <Card
                title={<span style={{ color: "#1976d2", fontWeight: "bold" }}>Thông tin sản phẩm</span>}
                bordered
                headStyle={{ borderBottom: "2px solid #c0cde0ff" }}
                style={{ flex: 1, borderRadius: 12, border: "2px solid #85b3f3ff" }}
                >
                <p><b>Tên thương mại:</b> Ontak</p>
                <p><b>Đường dùng:</b> Tiêm tĩnh mạch</p>
                <p><b>Hàm lượng:</b> 150 mg/ml</p>
                <p><b>Dạng bào chế:</b> Dung dịch tiêm</p>
                <p><b>Xuất xứ:</b> Trung Quốc</p>
            </Card>

            <Card
                title={<span style={{ color: "#1976d2", fontWeight: "bold" }}>Thông tin sản phẩm</span>}
                bordered
                headStyle={{ borderBottom: "2px solid #c0cde0ff" }}
                style={{ flex: 1, borderRadius: 12, border: "2px solid #85b3f3ff" }}
                >
                <p><b>Tên thương mại:</b> Ontak</p>
                <p><b>Đường dùng:</b> Tiêm tĩnh mạch</p>
                <p><b>Hàm lượng:</b> 110 mg/ml</p>
                <p><b>Dạng bào chế:</b> Dung dịch tiêm</p>
                <p><b>Xuất xứ:</b> Anh Quốc</p>
            </Card>
          </div>
        </div>
      ),
    },
    {
      key: "2",
      label: "Phân loại",
      children: (
        <Card bordered={false}>
            {<span style={{ color: "#1976d2", fontWeight: "bold" }}>Phân loại nhóm dược lý - dược lực học:</span>}
          <p>
            Esterase (enzym thuỷ phân este), Enzym, Chế phẩm trị ho và cảm lạnh, 
            Hydrolase (enzym thuỷ phân), Deoxyribonuclease (enzym cắt DNA), …
          </p>
        </Card>
      ),
    },
    {
      key: "3",
      label: "Cảnh báo",
      children: (
        <div>
          <Alert
            type="error"
            message="⚠ Denileukin diftitox có tác động dược lý với một số loại thuốc khác. Yêu cầu kiểm tra tương tác thuốc trước khi kê đơn."
            style={{ marginBottom: 16 }}
          />
          <Table
            bordered
            pagination={false}
            dataSource={[
              { id: "DB100023", name: "Aspirin", interaction: "Tạo kích thích đường ruột" },
              { id: "DB100023", name: "Aspirin", interaction: "Tạo kích thích đường ruột" },
              { id: "DB100023", name: "Aspirin", interaction: "Tạo kích thích đường ruột" },
            ]}
            columns={[
                { 
                    title: <span style={{ color: "#1976d2", fontWeight: "bold" }}>ID</span>, 
                    dataIndex: "id" 
                },
                { 
                    title: <span style={{ color: "#1976d2", fontWeight: "bold" }}>Tên thuốc</span>, 
                    dataIndex: "name" 
                },
                { 
                    title: <span style={{ color: "#1976d2", fontWeight: "bold" }}>Loại tương tác</span>, 
                    dataIndex: "interaction" 
                },
            ]}
          />
        </div>
      ),
    },
  ];

  return (
    <div style={{ borderRadius: 12, overflow: "hidden" }}>
      {/* Header xanh */}
      <div
        style={{
          background: "linear-gradient(90deg, #245bafff, #042f6fff)",
          color: "#fff",
          padding: "40px",
          display: "flex",
          alignItems: "center",
          gap: 40,
        }}
      >
        {/* Avatar thuốc */}
        <div
        style={{
            background: "rgba(255, 255, 255, 1)",
            borderRadius: "50%",
            padding: 18,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
        }}
        >
        <img 
            src={avatarDrug} 
            alt="Drug Avatar" 
            style={{ width: 60, height: 60, objectFit: "contain" }} 
        />
        </div>

        <div style={{ flex: 1 }}>
          <h2 style={{ margin: 0, fontSize: 22 }}>{drug.generic_name}</h2>
          <p style={{ margin: "4px 0", opacity: 0.9 }}>{drug.atc_code} - {drug.synonyms}</p>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            <Tag color="blue">Viên nén</Tag>
            <Tag color="blue">Dung dịch</Tag>
            <Tag color="blue">Nghiền bột</Tag>
          </div>
        </div>

        <div>
          <Tag color="blue" style={{ fontSize: 14, padding: "4px 8px", fontWeight: "bold", marginRight: 5, marginTop: 8 }}>
            ID: {drug._id}
          </Tag>
        </div>
      </div>

      {/* Nội dung Tabs */}
      <div style={{ padding: 16, background: "#fff" }}>
        <Tabs defaultActiveKey="1" items={items} />
      </div>
    </div>
  );
}
