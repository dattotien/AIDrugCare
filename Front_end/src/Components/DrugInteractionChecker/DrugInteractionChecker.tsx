import { useState } from "react";
import {
  Button,
  Card,
  Space,
  Typography,
  Input,
  message,
  AutoComplete,
} from "antd";
import styles from "./DrugInteractionChecker.module.css";
import checked from "../../assets/check-mark.png";
import note_img from "../../assets/notes.png";
import check from "../../assets/checked.png";
import no_entry from "../../assets/no-entry.png";

const { Title, Text, Paragraph } = Typography;
const { Search } = Input;

export default function DrugInteractionChecker() {
  const [drugA, setDrugA] = useState<string>("");
  const [drugB, setDrugB] = useState<string>("");
  const [optionsA, setOptionsA] = useState<{ value: string }[]>([]);
  const [optionsB, setOptionsB] = useState<{ value: string }[]>([]);
  const [result, setResult] = useState<{ description: string } | null>(null);
  const [loading, setLoading] = useState(false);
  const fetchDrugOptions = async (query: string, setOptions: Function) => {
    if (!query) {
      setOptions([]);
      return;
    }
    try {
      const res = await fetch(
        `http://localhost:8000/search?name=${encodeURIComponent(query)}`
      );
      const data = await res.json();
      if (data.success && Array.isArray(data.data)) {
        setOptions(data.data.map((d: any) => ({ value: d.generic_name })));
      } else {
        setOptions([]);
      }
    } catch (err) {
      console.error(err);
      setOptions([]);
    }
  };
  const handleCheck = async () => {
    if (!drugA || !drugB) return;

    setLoading(true);
    setResult(null);

    try {
      const res = await fetch(
        `http://localhost:8000/drugs/predict${drugA}/${drugB}`
      );
      const data = await res.json();

      if (data.success) {
        setResult({ description: data.data });
      } else {
        message.error(data.message || "Không lấy được kết quả");
      }
    } catch (err) {
      console.error(err);
      message.error("Lỗi khi gọi API");
    } finally {
      setLoading(false);
    }
  };

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
              <AutoComplete
                options={optionsA}
                className={styles.searchInput}
                value={drugA}
                onSearch={(val) => fetchDrugOptions(val, setOptionsA)}
                onChange={(val) => {
                  setDrugA(val);
                  setResult(null);
                }}
                placeholder="Nhập tên thuốc"
              />
            </div>
            <div>
              <p>Thuốc thứ hai</p>
              <AutoComplete
                className={styles.searchInput}
                options={optionsB}
                value={drugB}
                onSearch={(val) => fetchDrugOptions(val, setOptionsB)}
                onChange={(val) => {
                  setDrugB(val);
                  setResult(null);
                }}
                placeholder="Nhập tên thuốc"
              />
            </div>
          </div>

          <Button
            type="primary"
            size="large"
            disabled={!drugA || !drugB}
            loading={loading}
            onClick={handleCheck}
            className={styles.button}
          >
            KIỂM TRA TƯƠNG TÁC THUỐC
          </Button>
        </Space>
      </Card>

      {result && (
        <DrugInteractionCard
          drugA={drugA}
          drugB={drugB}
          description={result.description}
        />
      )}
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
    <Card
      style={{
        margin: "0 auto",
        width: "70vw",
        backgroundColor: "transparent",
      }}
    >
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
