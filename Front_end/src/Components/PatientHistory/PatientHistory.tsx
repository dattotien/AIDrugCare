import { Button, Dropdown, Table, Input, Modal, Pagination } from "antd";
import { useState, useEffect } from "react";
import { MoreOutlined, FilterOutlined } from "@ant-design/icons";
import "./PatientHistory.css";
import backPic from "../../assets/Group 68.png";
import listDrug from "../../assets/list (1).png";
import PatientOneHistory from "./PatientOneHistory";
import type { ColumnsType } from "antd/es/table";
import axios from "axios";
import dayjs from "dayjs";

interface His {
  patientId: string | null;
}

interface History {
  visit_id: number;
  doctor_name: string;
  date: string;
  doctor_specialty: string;
  diagnosis: string;
}

export default function PatientHistory({ patientId }: His) {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [showActionBar, setShowActionBar] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchText, setSearchText] = useState("");
  const [showHistoryInfoModal, setShowHistoryInfoModal] = useState(false);
  const [selectedHistory, setSelectedHistory] = useState<any | null>(null);
  const [history, setHistory] = useState<any[]>([]);
  const [selectVisitId, setSelectVisitId] = useState<string | null>(null);
  const API_URL = import.meta.env.VITE_API_URL;
  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await axios.get(
          `${API_URL}/visit-history/${patientId}`
        );
        if (res.data && Array.isArray(res.data)) {
          setHistory(res.data);
        } else if (res.data?.data && Array.isArray(res.data.data)) {
          setHistory(res.data.data);
        } else {
          console.warn("Dữ liệu trả về không hợp lệ:", res.data);
        }
      } catch (error) {
        console.error("Lỗi khi lấy lịch sử khám:", error);
      }
    };

    if (patientId) {
      fetchHistory();
    }
  }, [patientId]);

  const filteredList = history.filter((history) =>
    Object.values(history).some((field) =>
      String(field).toLowerCase().includes(searchText.toLowerCase())
    )
  );

  const handleSearch = (value: string) => {
    setSearchText(value);
    setCurrentPage(1);
  };

  const handleMore = (record: any) => {
    setSelectedHistory(record);
    setShowHistoryInfoModal(true);
    setSelectVisitId(record.visit_id.toString());
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
          More
        </div>
      ),
    },
  ];

  const columns: ColumnsType<History> = [
    { title: "ID", dataIndex: "visit_id", key: "visit_id", align: "left" },
    {
      title: "Tên bác sĩ",
      dataIndex: "doctor_name",
      key: "doctor_name",
      align: "left",
    },
    {
      title: "Ngày khám",
      dataIndex: "date",
      key: "date",
      align: "left",
      render: (date: string) =>
        date ? dayjs(date).format("YYYY/MM/DD") : "",
    },
    {
      title: "Khoa",
      dataIndex: "doctor_specialty",
      key: "doctor_specialty",
      align: "left",
    },
    {
      title: "Chẩn đoán",
      dataIndex: "diagnosis",
      key: "diagnosis",
      align: "center",
    },
    {
      title: "",
      key: "actions",
      align: "center",
      render: (_, record) => (
        <Dropdown menu={{ items: menuItems(record) }} trigger={["click"]}>
          <MoreOutlined style={{ fontSize: 16, cursor: "pointer" }} />
        </Dropdown>
      ),
    },
  ];

  const pageSize = 7;
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
          marginTop: "5vh",
          marginLeft : "1vw",
          backgroundPosition: "center",
          padding: "1vw",
        }}
      >
        <div className="flex-title">
          <img
            src={listDrug}
            alt="list"
            style={{ width: "15px", height: "15px" }}
          />
          <span>Items</span>
          <div className="patient-circle-badge">
            {history.length}
          </div>
        </div>

        {/* Table */}
        <div style={{ flex: 1, width: "100%" }}>
          <Table
            size="small"
            style={{
              overflow: "hidden",
            }}
            rowKey="id"
            columns={columns}
            dataSource={paginatedData}
            rowSelection={{
              selectedRowKeys,
              onChange: (newSelectedRowKeys) => {
                setSelectedRowKeys(newSelectedRowKeys);
                setShowActionBar(newSelectedRowKeys.length > 0);
              },
              preserveSelectedRowKeys: true,
            }}
            rowClassName={(_, index) => {
              let classes = "custom-row ";
              classes += index % 2 === 0 ? "row-even" : "row-odd";
              return classes;
            }}
            pagination={false}
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
                  className="custom-search"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    width: "250px",
                    borderColor: "#737373",
                    borderRadius: "20px",
                  }}
                >
                  <Input.Search
                    placeholder="Tìm lịch sử khám tại đây"
                    style={{ width: 250 }}
                    allowClear
                    onSearch={handleSearch}
                    onPressEnter={(e) =>
                      handleSearch(e.currentTarget.value)
                    }
                  />
                </div>
              </div>
            )}
          />
        </div>
      </div>

      {showActionBar && (
        <div className="patient-fixed-footer">
          <div className="circle-badge">
            {selectedRowKeys.length}
          </div>
          <span style={{ marginLeft: "8px" }}>
            {selectedRowKeys.length > 1
              ? "items selected"
              : "item selected"}
          </span>
          <Button
            disabled
            className="btn"
            type="link"
            style={{
              width: "4vw",
              height: "4vh",
              fontSize: "12px",
              color: "#ffffff",
              backgroundColor: "#737373",
              borderRadius: "20px",
              marginLeft: 30,
            }}
          >
            Print
          </Button>
          <Button
            disabled
            className="btn"
            type="link"
            style={{
              width: "4vw",
              height: "4vh",
              fontSize: "12px",
              color: "#ffffff",
              backgroundColor: "#d12326",
              borderRadius: "20px",
              marginRight: 5,
            }}
          >
            Send
          </Button>
          <Button
            className="btn"
            type="link"
            style={{
              color: "#fff",
              borderRadius: "50%",
              width: 30,
              height: 30,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "background 0.3s",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.background =
                "rgba(255,255,255,0.2)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.background = "transparent")
            }
            onClick={() => {
              setSelectedRowKeys([]);
              setShowActionBar(false);
            }}
          >
            X
          </Button>
        </div>
      )}

      {showHistoryInfoModal && selectedHistory && selectVisitId && (
        <Modal
          open={showHistoryInfoModal}
          centered
          width={"90%"}
          onCancel={() => setShowHistoryInfoModal(false)}
          footer={null}
        >
          <div
            style={{
              height: "500px",
              overflowY: "auto",
            }}
          >
            <PatientOneHistory visitId={selectVisitId} />
          </div>
        </Modal>
      )}
    </div>
  );
}
