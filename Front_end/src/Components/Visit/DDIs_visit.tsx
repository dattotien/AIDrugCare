import { Modal, Table, Typography, Input } from "antd";
import { useState } from "react";
import tickIcon from "../../assets/check-mark.png"; 
import "./DDIs_visit.css";

const { Title } = Typography;

interface DDIsVisitProps {
  open: boolean;
  onClose: () => void;
}

export default function DDIsVisit({ open, onClose }: DDIsVisitProps) {
  const columns = [
    { title: "Tên thuốc 1", dataIndex: "drug1", key: "drug1" },
    { title: "Tên thuốc 2", dataIndex: "drug2", key: "drug2" },
    { title: "Tương tác thuốc", dataIndex: "interaction", key: "interaction" },
  ];

  // tạo dữ liệu mẫu
  const rawData = Array.from({ length: 30 }).map((_, i) => ({
    key: i + 1,
    drug1: "Aspirin",
    drug2: "Warfarin",
    interaction: "2 thuốc phản ứng có hại cho cơ thể",
  }));

  const [searchText, setSearchText] = useState("");

  // lọc theo search
  const filteredData = rawData.filter((row) =>
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