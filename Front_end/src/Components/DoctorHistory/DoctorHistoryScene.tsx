import { Button, Dropdown, Table, Input, Modal, Pagination } from "antd";
import { useState, useEffect } from "react";
import { MoreOutlined, FilterOutlined } from "@ant-design/icons";
import styles from "./DoctorHistoryScene.module.css";
import binLogo from "../../assets/bin.png";
import backPic from "../../assets/Group3.png";
import axios from "axios";
import PatientOneHistory from "../PatientHistory/PatientOneHistory";
import type { ColumnsType } from "antd/es/table";

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
  const [selectedHistory, setSelectedHistory] = useState<any | null>(null);
  const [historyList, setHistoryList] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const storedDoctorId = localStorage.getItem("doctorId");
  const doctorId = storedDoctorId ? Number(storedDoctorId) : null;

  useEffect(() => {
    const fetchHistory = async () => {
      if (!doctorId) return;
      setLoading(true);
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/visited-by-doctor/${doctorId}`
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
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, [doctorId]);

  const filteredList = historyList.filter((history) =>
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
  };

  const menuItems = (record: any) => [
    {
      key: "more",
      label: (
        <div
          style={{
            color: "#000000",
            minWidth: 80,
            textAlign: "center",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.background = "#043bb3";
            (e.currentTarget as HTMLElement).style.color = "white";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.background = "white";
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
    { title: "ID", dataIndex: "id", key: "id", align: "center" },
    {
      title: "ID bệnh nhân",
      dataIndex: "patientId",
      key: "patientId",
      align: "center",
    },
    { title: "Tên bệnh nhân", dataIndex: "name", key: "name", align: "left" },
    { title: "Giới tính", dataIndex: "gender", key: "gender", align: "center" },
    {
      title: "Triệu chứng",
      dataIndex: "trieuchung",
      key: "trieuchung",
      align: "center",
    },
    { title: "Ngày khám", dataIndex: "date", key: "date", align: "center" },
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

  const filterList = filteredList;
  const pageSize = 8;
  const paginatedData = filterList.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <div className={styles.container}>
      <div
        className={styles.tabAll}
        style={{ color: "#1c57d5ff" }}
      >
        <span>Đã khám</span>
        <div
          className={styles.tabCount}
          style={{
            backgroundColor: "#043bb3",
          }}
        >
          {filteredList.length}
        </div>
      </div>

      <div
        className={styles.background}
        style={{ backgroundImage: `url(${backPic})` }}
      >
        <div style={{ width: "950px", borderRadius: 0 }}>
          <Table
            size="small"
            style={{ overflow: "hidden", marginLeft: 10, marginTop: 40 }}
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
            pagination={false}
            title={() => (
              <div className={styles.tableTitle}>
                <Button icon={<FilterOutlined />}>Filter</Button>

                <Pagination
                  current={currentPage}
                  pageSize={pageSize}
                  total={filteredList.length}
                  onChange={(page) => setCurrentPage(page)}
                  showSizeChanger={false}
                />

                <div className={styles.searchBox}>
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
        <div className={styles.actionBar}>
          <div className={styles.actionCount}>{selectedRowKeys.length}</div>
          <span>
            {selectedRowKeys.length > 1 ? "items selected" : "item selected"}
          </span>

          <Button className={styles.actionBtn} type="link">
            Print
          </Button>
          <Button className={styles.actionBtn} type="link">
            Send
          </Button>
          <Button className={styles.actionBtnDelete} type="link">
            <img src={binLogo} alt="bin" style={{ width: 15, height: 15 }} />
            Delete
          </Button>
          <div
            className={styles.closeBtn}
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
          </div>
        </div>
      )}

      {showHistoryInfoModal && selectedHistory && (
        <Modal
          open={showHistoryInfoModal}
          centered
          width={"90%"}
          onCancel={() => setShowHistoryInfoModal(false)}
          footer={null}
        >
          <div style={{ height: "500px", overflowY: "auto" }}>
            <PatientOneHistory visitId={selectedHistory.id} />
          </div>
        </Modal>
      )}
    </div>
  );
}
