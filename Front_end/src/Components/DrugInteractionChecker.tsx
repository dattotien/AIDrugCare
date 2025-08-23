import { useState } from "react"
const { Title, Text } = Typography
import {Select, Button, Card, Space, Typography} from "antd"
export default function DrugInteractionChecker() {
  const [selectedDrugs, setSelectedDrugs] = useState<string[]>([])
  const drugDatabase = [
    { value: "warfarin", label: "Warfarin (Thuốc chống đông máu)" },
    { value: "aspirin", label: "Aspirin (Axit acetylsalicylic)" },
    { value: "ibuprofen", label: "Ibuprofen (Thuốc giảm đau)" },
    { value: "paracetamol", label: "Paracetamol (Thuốc hạ sốt)" },
    { value: "amoxicillin", label: "Amoxicillin (Kháng sinh)" },
    { value: "metformin", label: "Metformin (Thuốc tiểu đường)" },
    { value: "lisinopril", label: "Lisinopril (Thuốc huyết áp)" },
    { value: "simvastatin", label: "Simvastatin (Thuốc cholesterol)" },
    { value: "omeprazole", label: "Omeprazole (Thuốc dạ dày)" },
    { value: "digoxin", label: "Digoxin (Thuốc tim mạch)" },
  ]
  return (
    <div style={{ maxWidth: 1200, margin: "0 auto" }}>
      <Title level={2} style={{ textAlign: "center", marginBottom: 30, color: "#1890ff" }}>
        Kiểm Tra Tương Tác Thuốc
      </Title>

      <Card style={{ marginBottom: 24 }}>
        <Space direction="vertical" size="large" style={{ width: "100%" }}>
          <div>
            <Text strong style={{ fontSize: 16, marginBottom: 8, display: "block" }}>
              Chọn các loại thuốc cần kiểm tra:
            </Text>
            <Select
              mode="multiple"
              style={{ width: "100%", minHeight: 40 }}
              placeholder="Tìm kiếm và chọn thuốc..."
              value={selectedDrugs}
              onChange={setSelectedDrugs}
              options={drugDatabase}
              showSearch
              filterOption={(input, option) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase())}
              maxTagCount="responsive"
            />
          </div>

          <Button
            type="primary"
            size="large"
            disabled={selectedDrugs.length < 2}
            style={{ width: "100%" }}
          >
            Kiểm tra
          </Button>
        </Space>
      </Card>
    </div>
  )
}