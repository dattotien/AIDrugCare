import { Modal, Table, Typography, Input } from "antd";
import { useState, useEffect } from "react";
import tickIcon from "../../assets/check-mark.png"; 
import "./DDIs_visit.css";
import axios from "axios";

const { Title } = Typography;
type DrugRow = { id: string; name: string; dose: string; time: string; note: string };

interface DDIsVisitProps {
  open: boolean;
  onClose: () => void;
  drugs: DrugRow[];
  patientId: number;
}

export default function DDIsVisit({ open, onClose, drugs, patientId }: DDIsVisitProps) {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [previousDrugs, setPreviousDrugs] = useState<{ generic_name: string }[]>([]);
  const API_URL =
    import.meta.env.VITE_API_URL || "http://localhost:8000";
  useEffect(() => {
    const fetchPrevious = async () => {
      try {
        const res = await axios.get(
          `${API_URL}/previous-drugs/${patientId}`
        );
        setPreviousDrugs(res.data.data);
        console.log("Previous drugs:", res.data.data);
      } catch (err) {
        console.error("Lỗi lấy previous drugs:", err);
      }
    };
    fetchPrevious();
  }, [patientId]);

  useEffect(() => {
    const fetchInteractions = async () => {
      if (!open || drugs.length === 0) return;
      setLoading(true);
      try {
        const drugNames = drugs.map((d) => ({ name: d.name, type: "new" }));
        const previousDrugNames = previousDrugs.map((d) => ({ name: d.generic_name, type: "old" }));
        const allDrugs = [...drugNames, ...previousDrugNames];

        const res = await fetch(`${API_URL}/all-interactions`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ drugs: allDrugs.map((d) => d.name) }),
        });

        const result = await res.json();
        console.log("Kết quả tương tác:", result);

        if (result.success && Array.isArray(result.data)) {
          const formatted = result.data.map((item: any, idx: number) => {
            const type1 = allDrugs.find(d => d.name === item.drug1)?.type || "unknown";
            const type2 = allDrugs.find(d => d.name === item.drug2)?.type || "unknown";

            let category = "Khác";
            if (type1 === "new" && type2 === "new") {
              category = "Thuốc mới ↔ Thuốc mới";
            } else if (
              (type1 === "new" && type2 === "old") ||
              (type1 === "old" && type2 === "new")
            ) {
              category = "Thuốc mới ↔ Thuốc cũ";
            }

            return {
              key: idx + 1,
              drug1: { name: item.drug1, type: type1 },
              drug2: { name: item.drug2, type: type2 },
              interaction: item.interaction || "Không có tương tác",
              category,
            };
          });

          // Chỉ lấy loại cần
          setData(
            formatted.filter((row: any) =>
              row.category === "Thuốc mới ↔ Thuốc mới" ||
              row.category === "Thuốc mới ↔ Thuốc cũ"
            )
          );
        } else {
          setData([]);
        }
      } catch (err) {
        console.error("Fetch interactions error:", err);
        setData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchInteractions();
  }, [open, drugs, previousDrugs]);

  // lọc theo search
  const filteredData = data.filter((row) =>
    Object.values(row).some((val) => {
      if (typeof val === "string") {
        return val.toLowerCase().includes(searchText.toLowerCase());
      }
      if (val && typeof val === "object" && "name" in val) {
        return (val as { name: string }).name
          .toLowerCase()
          .includes(searchText.toLowerCase());
      }
      return false;
    })
  );

  const columns = [
    {
      title: "Tên thuốc 1",
      dataIndex: "drug1",
      key: "drug1",
      render: (drug: any) => (
        <span style={{ color: drug.type === "new" ? "#44c17eff" : "#f65baeff", fontWeight: 600 }}>
          {drug.name}
        </span>
      ),
    },
    {
      title: "Tên thuốc 2",
      dataIndex: "drug2",
      key: "drug2",
      render: (drug: any) => (
        <span style={{ color: drug.type === "new" ? "#44c17eff" : "#f65baeff", fontWeight: 600 }}>
          {drug.name}
        </span>
      ),
    },
    { title: "Tương tác thuốc", dataIndex: "interaction", key: "interaction" },
    { title: "Loại tương tác", dataIndex: "category", key: "category", width: 200 },
  ];

  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      width="80%"
      centered
      className="ddi-modal"
    >
      {/* Header */}
      <div className="ddi-header">
        <div className="ddi-icon-wrapper">
          <img src={tickIcon} alt="tick" className="ddi-icon" />
        </div>
        <Title level={4} className="ddi-title">
          KIỂM TRA TƯƠNG TÁC THUỐC
        </Title>
      </div>

      {/* Search box */}
      <div className="ddi-search">
        <Input.Search
          placeholder="Tìm kiếm thuốc..."
          allowClear
          onChange={(e) => setSearchText(e.target.value)}
        />
      </div>

      {/* Bảng */}
      <Table
        className="ddi-table"
        columns={columns}
        dataSource={filteredData}
        loading={loading}
        pagination={false}
        size="large"
        bordered
        scroll={filteredData.length > 8 ? { y: 500 } : undefined}
      />
    </Modal>
  );
}
