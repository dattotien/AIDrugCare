import {
  Button,
  Dropdown,
  Table,
  Input,
  Modal,
  Pagination,
  message,
  Typography,
  Spin,
  Badge,
} from "antd";
import { useEffect, useState } from "react";
import { MoreOutlined, FilterOutlined } from "@ant-design/icons";
import axios from "axios";
import type { ColumnsType } from "antd/es/table";
import PatientOneHistory from "../PatientHistory/PatientOneHistory";
import backPic from "../../assets/Group 68.png";
import "./DoctorHistoryScene.css";

const { Text } = Typography;

interface History {
  id: string;
  patientId: string;
  name: string;
  gender: string;
  trieuchung: string;
  date: string;
  trangthai?: string;
}

export default function DoctorHistory() {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [showActionBar, setShowActionBar] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchText, setSearchText] = useState("");
  const [showHistoryInfoModal, setShowHistoryInfoModal] = useState(false);
  const [selectedHistory, setSelectedHistory] = useState<History | null>(null);

  const [historyList, setHistoryList] = useState<History[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingDetail, setLoadingDetail] = useState(false);

  const storedDoctorId = localStorage.getItem("doctorId");
  const doctorId = storedDoctorId ? Number(storedDoctorId) : null;

  const API_URL = import.meta.env.VITE_API_URL;
  // fetch danh sách lịch sử khám
  const fetchHistory = async () => {
    if (!doctorId) return;
    setLoading(true);
    try {
      const response = await axios.get(
        `${API_URL}/visited-by-doctor/${doctorId}`
      );
      const mappedData = response.data.data.map((item: any) => {
        const utcDate = new Date(item.date);
        const vnDate = new Date(utcDate.getTime() + 7 * 60 * 60 * 1000);

        const formattedDate = vnDate.toLocaleString("vi-VN", {
          timeZone: "Asia/Ho_Chi_Minh",
          hour12: false,
        });

        return {
          id: item.visit_id,
          patientId: item.patient_id,
          name: item.patient_name,
          date: formattedDate,
          gender: item.gender,
          trieuchung: item.diagnosis,
          trangthai: item.status,
        };
      });

      setHistoryList(mappedData);
    } catch (error) {
      console.error("Lấy lịch sử khám thất bại:", error);
      message.error("Không lấy được danh sách lịch sử khám");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, [doctorId]);

  // Search
  const filteredList = historyList.filter((history) => {
    const search = searchText.toLowerCase();
    return (
      history.id?.toLowerCase().includes(search) ||
      history.patientId?.toLowerCase().includes(search) ||
      history.name?.toLowerCase().includes(search) ||
      history.gender?.toLowerCase().includes(search) ||
      history.trieuchung?.toLowerCase().includes(search) ||
      history.date?.toLowerCase().includes(search) ||
      history.trangthai?.toLowerCase().includes(search)
    );
  });

  const handleSearch = (value: string) => {
    setSearchText(value);
    setCurrentPage(1);
  };

  const handleMore = (record: History) => {
    setLoadingDetail(true);
    try {
      setSelectedHistory(record);
      setShowHistoryInfoModal(true);
    } finally {
      setLoadingDetail(false);
    }
  };

  const menuItems = (record: History) => [
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

  const columns: ColumnsType<History> = [
    { title: "ID", dataIndex: "id", key: "id", align: "center", render: (t) => renderEllipsis(t, 120) },
    { title: "ID bệnh nhân", dataIndex: "patientId", key: "patientId", align: "center", render: (t) => renderEllipsis(t, 120) },
    { title: "Tên bệnh nhân", dataIndex: "name", key: "name", align: "left", render: (t) => renderEllipsis(t, 200) },
    { title: "Giới tính", dataIndex: "gender", key: "gender", align: "center", render: (t) => renderEllipsis(t, 80) },
    { title: "Triệu chứng", dataIndex: "trieuchung", key: "trieuchung", align: "center", render: (t) => renderEllipsis(t, 300) },
    { title: "Ngày khám", dataIndex: "date", key: "date", align: "center", render: (t) => renderEllipsis(t, 200) },
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
        <div className="flex-title">
          <span>Đã khám</span>
          <div className="doctor-circle-badge">{historyList.length}</div>
        </div>

        {/* Table */}
        <div style={{ flex: 1, width: "100%" }}>
          <Table
            size="small"
            style={{ overflow: "hidden" }}
            rowKey="id"
            columns={columns}
            dataSource={paginatedData}
            loading={loading}
            rowSelection={{
              selectedRowKeys,
              onChange: (newSelectedRowKeys) => {
                setSelectedRowKeys(newSelectedRowKeys);
                setShowActionBar(newSelectedRowKeys.length > 0);
              },
              preserveSelectedRowKeys: true,
            }}
            rowClassName={(_, index) =>
              index % 2 === 0 ? "row-even" : "row-odd"
            }
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
                    onPressEnter={(e) => handleSearch(e.currentTarget.value)}
                  />
                </div>
              </div>
            )}
          />
        </div>
      </div>

      {/* Action Bar */}
      {showActionBar && (
        <div className="doctor-fixed-footer">
          <div className="circle-badge">{selectedRowKeys.length}</div>
          <span style={{ marginLeft: "8px" }}>
            {selectedRowKeys.length > 1 ? "items selected" : "item selected"}
          </span>
          <Button disabled className="btn" type="link" 
          style={{
              width: "4vw",
              height: "4vh",
              fontSize: "12px",
              color: "#ffffff",
              backgroundColor: "#737373",
              borderRadius: "20px",
              marginLeft: 30,
            }}>
            Print
          </Button>
          <Button disabled className="btn" type="link" 
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
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.background = "rgba(255,255,255,0.2)")
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

      {/* Modal chi tiết */}
      {showHistoryInfoModal && selectedHistory && (
        <Modal
          open={showHistoryInfoModal}
          centered
          width={"90%"}
          onCancel={() => setShowHistoryInfoModal(false)}
          footer={null}
        >
          <div
            style={{
              height: "85vh",
              overflowY: "auto",
            }}
          >
            {loadingDetail ? <Spin /> : <PatientOneHistory visitId={selectedHistory.id} />}
          </div>
        </Modal>
      )}
    </div>
  );
}
