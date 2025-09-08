import { Button, Dropdown, Table, Badge, Input, Tabs, Pagination } from "antd";
import { useState } from "react";
import { MoreOutlined, FilterOutlined } from "@ant-design/icons";
import listDrug from "../../assets/list (1).png";
import "./PatientsList.css";
import { useEffect } from "react";
import dayjs from "dayjs";
// ----------------- Thêm props -----------------
interface PatientsListProps {
  onSelectPatient?: (patient: any) => void;
}
export default function PatientsList({ onSelectPatient }: PatientsListProps) {
  const [showActionBar, setShowActionBar] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchText, setSearchText] = useState("");

  const [patientList, setPatientList] = useState<any[]>([])
  const storedDoctorId = localStorage.getItem("doctorId");
  const doctorId = storedDoctorId ? Number(storedDoctorId) : null;
  useEffect(() => {
  if (!doctorId) return;
  const fetchPatients = async () => {
    try {
      const res = await fetch(`http://localhost:8000/all-patients/${doctorId}`);
      const json = await res.json();
      if (json.success) {
        setPatientList(json.data);
      }
    } catch (error) {
      console.error("Fetch patients error:", error);
    }
  };
  fetchPatients();
}, [doctorId]);
  // Search filter
  const filteredList = patientList.filter((patient) =>
    Object.values(patient).some((field) =>
      String(field).toLowerCase().includes(searchText.toLowerCase())
    )
  );

  const handleSearch = (value: string) => {
    setSearchText(value);
    setCurrentPage(1);
  };

  const handleMore = (record: any) => {
    if (onSelectPatient) {
      onSelectPatient(record); // gọi ra DoctorScene
    }
  };

  const menuItems = (record: any) => [
    {
      key: "more",
      label: (
        <div className="menu-item" onClick={() => handleMore(record)}>
          Khám
        </div>
      ),
    },
  ];

  const columns = [
    { title: <span className="table-header">ID</span>, dataIndex: "id", key: "id", width: 80 },
    { title: <span className="table-header">Tên bệnh nhân</span>, dataIndex: "name", key: "name", width: 200 },
    { title: <span className="table-header">Ngày sinh</span>, dataIndex: "dob", key: "dob", width: 150, render: (dob: Date) => dob ? dayjs(dob).format("DD/MM/YYYY") : "-", },
    { title: <span className="table-header">Giới tính</span>, dataIndex: "gender", key: "gender", width: 100 },
    { title: <span className="table-header">Triệu chứng</span>, dataIndex: "symptoms", key: "symptoms", width: 250 },
    {
      title: <span className="table-header">Trạng thái</span>,
      dataIndex: "status",
      key: "status",
      width: 120,
      render: (text: string) => {
        let color = text === "Chưa khám" ? "#043bb3" : text === "Đã khám" ? "#d12362" : "black";
        return <span style={{ color, fontWeight: "bold" }}>{text}</span>;
        },
      },
    {
      title: "",
      key: "actions",
      width: 50,
      render: (_: any, record: any) => (
        <Dropdown menu={{ items: menuItems(record) }} trigger={["click"]}>
          <MoreOutlined className="more-icon" />
        </Dropdown>
      ),
    },
  ];

  const pageSize = 10;
  const paginatedData = filteredList.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <div>
      {/* Tabs */}
      <Tabs
        defaultActiveKey="1"
        items={[
          {
            key: "1",
            label: (
              <span className="tab-label">
                <img src={listDrug} alt="list" className="tab-icon" />
                <b>All patients</b>
                <Badge
                  count={patientList.length > 1000 ? "1000+" : patientList.length}
                  style={{ backgroundColor: "var(--primary-color)" }}
                />
              </span>
            ),
          },
        ]}
      />

      {/* Table */}
      <Table
        className="patient-table"
        scroll={{ x: "max-content" }}
        rowKey="_id"
        columns={columns}
        dataSource={paginatedData}
        pagination={false}
        title={() => (
          <div className="table-header-bar">
            <Button icon={<FilterOutlined />}>Filter</Button>
            <Pagination
              current={currentPage}
              pageSize={pageSize}
              total={filteredList.length}
              onChange={(page) => setCurrentPage(page)}
              showSizeChanger={false}
            />
            <Input.Search
              placeholder="Tìm bệnh nhân tại đây"
              className="search-input"
              allowClear
              onSearch={handleSearch}
              onPressEnter={(e) => handleSearch(e.currentTarget.value)}
            />
          </div>
        )}
      />
    </div>
  );
}