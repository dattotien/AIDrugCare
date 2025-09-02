import { useState } from "react";
import { Select, Button, Card, Space, Typography, Input } from "antd";
import styles from "./DrugInteractionChecker.module.css";
import checked from "../../assets/check-mark.png";
import note_img from "../../assets/notes.png";
import check from "../../assets/checked.png";
import no_entry from "../../assets/no-entry.png";
const { Title, Text, Paragraph } = Typography;
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
      <DrugInteractionCard
        drugA={selectedDrugs[0] || "para"}
        drugB={selectedDrugs[1] || "asipirin"}
        description="aa\"
      />
    </div>
  );
}
interface DrugInteractionCardProps {
  drugA: string;
  drugB: string;
  description?: string;
}
const DrugInteractionCard: React.FC<DrugInteractionCardProps> = ({
  drugA,
  drugB,
  description,
}) => {
  return (
    <Card style={{ margin: "0 auto", width: "70vw" ,backgroundColor:"transparent"}}>
      <div style={{ display: "flex", alignItems: "center" }}>
        <img src={note_img} style={{ width: "30px", height: "30px" }}></img>
        <p
          style={{
            fontWeight: "700",
            marginLeft: "10px",
            color: "#043BB3",
            fontSize: "18px",
          }}
        >
          KẾT QUẢ KIỂM TRA
        </p>
      </div>
      {description ? (
        <Interaction drugA={drugA} drugB={drugB} description={description} />
      ) : (
        <NoInteraction drugA={drugA} drugB={drugB} />
      )}
      <div className={styles.noteSection}>
        <Paragraph style={{ color: "#043BB3", margin: "15px" }}>
          <Text style={{ fontWeight: "bold", color: "#043BB3" }} strong>
            Lưu ý:
          </Text>{" "}
          Mọi thông tin chỉ mang tính chất tham khảo, cần kiểm định chuyên sâu
          hơn với các cặp thuốc cần dự đoán tương tác trước khi sử dụng cặp
          thuốc.
        </Paragraph>
      </div>
    </Card>
  );
};

function Interaction({
  drugA,
  drugB,
  description,
}: {
  drugA: string;
  drugB: string;
  description: string;
}) {
  return (
    <Card className={styles.noInteractionCard}>
      <div className={styles.interactionBody}>
        <div
          style={{
            backgroundColor: "#D12326",
            width: "8px",
            alignItems: "stretch",
            borderRadius: "10px",
          }}
        ></div>
        <div>
          <div className={styles.interactionHeader}>
            <img src={no_entry} style={{ width: "25px" }}></img>
            <Text style={{ color: "#D12326" }}>Hai thuốc có tương tác</Text>
          </div>
          <p className={styles.drugPara1}>
            {drugA} + {drugB}
          </p>
          <p className={styles.interDescription}>{description}</p>
          <Card className={styles.warningCard}>
            <div className={styles.warningBody}>
              <div
                style={{
                  backgroundColor: "#043BB3",
                  width: "5px",
                  alignItems: "stretch",
                  borderRadius: "5px",
                }}
              ></div>
              <Text style={{ color: "#043BB3" }}>
                <strong>Khuyến nghị:</strong> Cần cân nhắc kỹ trước khi sử dụng
                đồng thời hai thuốc
              </Text>
            </div>
          </Card>
        </div>
      </div>
    </Card>
  );
}
function NoInteraction({ drugA, drugB }: { drugA: string; drugB: string }) {
  return (
    <Card className={styles.interactionCard}>
      <div className={styles.interactionBody}>
        <div
          style={{
            backgroundColor: "#043BB3",
            width: "8px",
            alignItems: "stretch",
            borderRadius: "10px",
          }}
        ></div>
        <div>
          <div className={styles.interactionHeader}>
            <img src={check} style={{ width: "25px" }}></img>
            <Text style={{ color: "#043BB3" }}>
              Hai thuốc không có tương tác
            </Text>
          </div>
          <p className={styles.drugPara}>
            {drugA} + {drugB}
          </p>
        </div>
      </div>
    </Card>
  );
}
