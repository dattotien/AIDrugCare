import {
  Button,
  Dropdown,
  Table,
  Input,
  Pagination,
  Typography,
} from "antd";
import { useState, useEffect } from "react";
import { MoreOutlined, FilterOutlined } from "@ant-design/icons";
import backPic from "../../assets/Group 68.png";
import styles from "../PatientsList/PatientsList.module.css";
import dayjs from "dayjs";
import type { ColumnsType } from "antd/es/table";

const { Text } = Typography;

interface PatientsListProps {
  onSelectPatient?: (patient: any) => void;
}

interface Patient {
  id: string;
  name: string;
  dob: Date;
  gender: string;
  symptoms: string;
  status: string;
  _id: string;
}

export default function PatientsList({ onSelectPatient }: PatientsListProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchText, setSearchText] = useState("");
  const [patientList, setPatientList] = useState<Patient[]>([]);
  const API_URL = import.meta.env.VITE_API_URL;
  const storedDoctorId = localStorage.getItem("doctorId");
  const doctorId = storedDoctorId ? Number(storedDoctorId) : null;

  useEffect(() => {
    if (!doctorId) return;
    const fetchPatients = async () => {
      try {
        const res = await fetch(`${API_URL}/all-patients/${doctorId}`);
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
      onSelectPatient(record);
    }
  };

  const menuItems = (record: any) => [
    {
      key: "more",
      label: (
        <div
          style={{
            color: "#043bb3",
            fontWeight: "bold",
            textAlign: "center",
            whiteSpace: "nowrap",
            padding: "1px 1px",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.backgroundColor = "#043bb3";
            (e.currentTarget as HTMLElement).style.color = "white";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.backgroundColor = "white";
            (e.currentTarget as HTMLElement).style.color = "#000000";
          }}
          onClick={() => handleMore(record)}
        >
          Khám
        </div>
      ),
    },
  ];

  // Hàm render text ellipsis
  const renderEllipsis = (value?: string, maxWidth?: number) => {
    if (!value) return <Text>-</Text>;
    return (
      <Text
        ellipsis={{ tooltip: value }}
        style={{
          display: "inline-block",
          maxWidth: maxWidth || "100%",
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
        }}
      >
        {value}
      </Text>
    );
  };

  const columns : ColumnsType<Patient> = [
    { title: "ID", dataIndex: "id", key: "id", align: "center", render: (t: string) => renderEllipsis(t, 100) },
    { title: "Tên bệnh nhân", dataIndex: "name", key: "name", align: "center", render: (t: string) => renderEllipsis(t, 200) },
    { title: "Ngày sinh", dataIndex: "dob", key: "dob", align: "center", render: (dob: Date) => dob ? dayjs(dob).format("DD/MM/YYYY") : "-" },
    { title: "Giới tính", dataIndex: "gender", key: "gender", align: "center", render: (t: string) => renderEllipsis(t, 80) },
    { title: "Triệu chứng", dataIndex: "symptoms", key: "symptoms", align: "center", render: (t: string) => renderEllipsis(t, 300) },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      align: "center",
      render: (text: string) => {
        let color =
          text === "Chưa khám"
            ? "#043bb3"
            : text === "Đã khám"
            ? "#d12362"
            : "black";
        return <span style={{ color, fontWeight: "bold" }}>{text}</span>;
      },
    },
    {
      title: "",
      key: "actions",
      align: "center",
      render: (_: any, record: any) => (
        <Dropdown menu={{ items: menuItems(record) }} trigger={["click"]}>
          <MoreOutlined style={{ fontSize: 16, cursor: "pointer" }} />
        </Dropdown>
      ),
    },
  ];

  const pageSize = 8;
  const paginatedData = filteredList.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <div>
      <div
        style={{
          width: "75vw",
          height: "70vh",
          backgroundColor: "transparent",
          display: "flex",
          flexDirection: "column",
          borderRadius: 10,
          backgroundImage: `url(${backPic})`,
          backgroundSize: "cover",
          marginTop: "4vh",
          marginLeft: "3vw",
          backgroundPosition: "center",
          padding: "1vw",
        }}
      >
        <div className={styles["flex-title"]}>
          <span>Chưa khám</span>
          <div className={styles["doctor-circle-badge"]}>
            {patientList.length}
          </div>
        </div>

        {/* Table */}
        <div style={{ flex: 1, width: "100%" }}>
          <Table
            size="small"
            style={{ overflow: "hidden" }}
            rowKey="_id"
            columns={columns}
            dataSource={paginatedData}
            pagination={false}
            rowClassName={(_, index) =>
              index % 2 === 0 ? "row-even" : "row-odd"
            }
            title={() => (
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  flexWrap: "wrap",
                }}
              >
                <Button icon={<FilterOutlined />}>Filter</Button>

                <div
                  style={{
                    flex: 1,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Pagination
                    current={currentPage}
                    pageSize={pageSize}
                    total={filteredList.length}
                    onChange={(page) => setCurrentPage(page)}
                    showSizeChanger={false}
                  />
                </div>

                <div
                  className={styles["custom-search"]}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    width: "250px",
                    borderColor: "#737373",
                    borderRadius: "20px",
                  }}
                >
                  <Input.Search
                    placeholder="Tìm bệnh nhân tại đây"
                    style={{ width: 250 }}
                    allowClear
                    onSearch={handleSearch}
                    onPressEnter={(e) => handleSearch(e.currentTarget.value)}
                  />
                </div>
              </div>
            )}
          />
        </div>
      </div>
    </div>
  );
}