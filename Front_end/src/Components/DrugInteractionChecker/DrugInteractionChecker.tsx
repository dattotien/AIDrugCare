import { useState } from "react";
import { Select, Button, Card, Space, Typography, Input } from "antd";
import styles from "./DrugInteractionChecker.module.css";
import checked from "../../assets/check-mark.png";

const { Title } = Typography;
const { Search } = Input;

export default function DrugInteractionChecker() {
  const [selectedDrugs, setSelectedDrugs] = useState<string[]>([]);

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
  ];

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <img src={checked} className={styles.logo} />
        <Title level={2} className={styles.title}>
          KIỂM TRA TƯƠNG TÁC THUỐC
        </Title>
        <p>Nhập tên hai loại thuốc để kiểm tra tương tác</p>
      </div>

      <Card className={styles.card}>
        <Space direction="vertical" size="large" className={styles.space}>
          <div className={styles.searchRow}>
            <div>
              <p>Thuốc thứ nhất</p>
              <Search
                placeholder="Nhập tên thuốc"
                className={styles.searchInput}
              />
            </div>
            <div>
              <p>Thuốc thứ hai</p>
              <Search
                placeholder="Nhập tên thuốc"
                className={styles.searchInput}
              />
            </div>
          </div>

          <Button
            type="primary"
            size="large"
            disabled={selectedDrugs.length < 2}
            className={styles.button}
          >
            KIỂM TRA TƯƠNG TÁC THUỐC
          </Button>
        </Space>
      </Card>
      <Card className={styles.resultCard}>

      </Card>
    </div>
  );
}


const DrugInteractionCard = ({
  drugA,
  drugB,
  description,
  recommendation,
  note,
}) => {
  return (
    <Card
      style={{
        width: "100%",
        maxWidth: 800,
        margin: "20px auto",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        borderRadius: "12px",
      }}
    >
      <Space direction="vertical" size="middle" style={{ width: "100%" }}>
        <Title level={4}>
          {drugA} <span style={{ color: "red" }}> × </span> {drugB}
        </Title>

        <div>
          <Text strong>Mô tả:</Text>
          <Paragraph>{description || "Chưa có thông tin"}</Paragraph>
        </div>

        <div>
          <Text strong>Khuyến nghị:</Text>
          <Paragraph>{recommendation || "Chưa có khuyến nghị"}</Paragraph>
        </div>

        <div>
          <Text strong>Lưu ý:</Text>
          <Paragraph>{note || "Chưa có lưu ý"}</Paragraph>
        </div>
      </Space>
    </Card>
  );
};