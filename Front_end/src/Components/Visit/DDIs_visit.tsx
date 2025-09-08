import { Modal, Table, Typography, Input } from "antd";
import { useState } from "react";
import tickIcon from "../../assets/check-mark.png"; 
import "./DDIs_visit.css";
import DrugListScene from "../DrugBank/DrugListScene";
import { useEffect } from "react";

const { Title } = Typography;
type DrugRow = { id: string; name: string; dose: string; time: string; note: string };
interface DDIsVisitProps {
  open: boolean;
  onClose: () => void;
  drugs: DrugRow[];
}

export default function DDIsVisit({ open, onClose, drugs }: DDIsVisitProps) {
  const columns = [
    { title: "Tên thuốc 1", dataIndex: "drug1", key: "drug1" },
    { title: "Tên thuốc 2", dataIndex: "drug2", key: "drug2" },
    { title: "Tương tác thuốc", dataIndex: "interaction", key: "interaction" },
  ];

  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    const fetchInteractions = async () => {
      if (!open || drugs.length === 0) return;
      setLoading(true);
      try {
        const drugNames = drugs.map((d) => d.name); // lấy tên thuốc từ props
        console.log("Danh sách thuốc gửi đi:", drugNames);

        const res = await fetch("http://127.0.0.1:8000/all-interactions", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ drugs: drugNames }),
        });

        const result = await res.json();
        console.log("Kết quả tương tác:", result);

        if (result.success && Array.isArray(result.data)) {
          setData(
            result.data.map((item: any, idx: number) => ({
              key: idx + 1,
              drug1: item.drug1,
              drug2: item.drug2,
              interaction: item.interaction || "Không có tương tác",
            }))
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
  }, [open, drugs]);

  // lọc theo search
  const filteredData = data.filter((row) =>
    Object.values(row).some((val) =>
      String(val).toLowerCase().includes(searchText.toLowerCase())
    )
  );

  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      width="50%"
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
        pagination={false}
        size="middle"
        bordered
        scroll={{ y: 400 }}
      />
    </Modal>
  );
}