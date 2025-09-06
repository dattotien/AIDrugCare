import { Button, Dropdown, Table, Badge, Input, Modal, Form, Tabs, Pagination } from "antd";
import { useState, useEffect } from "react";
import { MoreOutlined, FilterOutlined, PlusOutlined } from "@ant-design/icons";
import "./PatientHistory.css";
import binLogo from "../../assets/bin.png";
import backPic from "../../assets/Group 68.png";
import listDrug from "../../assets/list (1).png";
import PatientOneHistory from "./PatientOneHistory";
import type { ColumnsType } from "antd/es/table";
import Back from "../../assets/back.png";
import axios from "axios";

interface His{
  patientId: string | null;
}

interface History {
  visit_id: number;
  doctor_name: string;
  date: string;
  doctor_specialty: string;
  diagnosis: string;
}
export default function PatientHistory({patientId} : His) {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [showActionBar, setShowActionBar] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchText, setSearchText] = useState("");
  const [showHistoryInfoModal, setShowHistoryInfoModal] = useState(false);
  const [selectedHistory, setSelectedHistory] = useState<any | null>(null);
  const [history, setHistory] = useState<any[]> ([]);
  const [selectVisitId, setSelectVisitId] = useState<string | null>(null);

 useEffect(() => {
  const fetchHistory = async () => {
    try {
      const res = await axios.get(`http://127.0.0.1:8000/visit-history/${patientId}`);
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

  const handleDelete = (record: any) => {
    setHistory((prev) => prev.filter((d) => d.id !== record.id));
  };

  const handleMore = (record: any) => {
    setSelectedHistory(record);
    setShowHistoryInfoModal(true);
    setSelectVisitId(record.visit_id.toString());
  };

  const menuItems = (record: any) => [
    {
      key: "delete",
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
          onClick={() => handleDelete(record)}
        >
          Delete
        </div>
      ),
    },
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
  { title: "ID", dataIndex: "visit_id", key: "visit_id", align: "left" },
  { title: "Tên bác sĩ", dataIndex: "doctor_name", key: "doctor_name", align: "left" },
  { title: "Ngày khám", dataIndex: "date", key: "date", align: "left" },
  { title: "Khoa", dataIndex: "doctor_specialty", key: "doctor_specialty", align: "left" },
  { title: "Chẩn đoán", dataIndex: "diagnosis", key: "diagnosis", align: "center" },
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

  const rowSelection = {
    selectedRowKeys,
    onChange: (newSelectedRowKeys: React.Key[]) => {
      setSelectedRowKeys(newSelectedRowKeys);
      setShowActionBar(newSelectedRowKeys.length > 0);
    },
  };

  const pageSize = 8;
  const paginatedData = filteredList.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", gap: 8, color: "#043bb3", fontWeight: "bold" , position: "absolute", top: 120, left: 260}}>
        <img src={listDrug} alt="list" style={{ width: "15px", height: "15px" }} />
        <span>Items</span>
      <div
        style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "20px",
        height: "20px",
        borderRadius: "50%",
        backgroundColor: "#043bb3",
        color: "#fff",
        fontSize: "12px",
        fontWeight: "bold"
        }}
      >
        {history.length}
      </div>
    </div>

      <div style={{width: "1320x", height: "500px", backgroundColor: "transparent", 
      display: "flex",  justifyItems: "center",
      marginLeft: 7,marginTop: 50, borderRadius: 10,  backgroundImage: `url(${backPic})`,    
      backgroundSize: "cover",
      backgroundPosition: "center",}}>
        <div style={{width : "950px", borderRadius: "0"}}>
          <Table   size="small"
        style={{
          overflow: "hidden",
          marginLeft: 30,
          marginTop: 50,

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

            <div style={{ flex: 1, display: "flex", justifyContent: "center", justifyItems: "center", alignItems: "center", marginLeft: "100px"}}>
              <Pagination
                current={currentPage}
                pageSize={pageSize}
                total={filteredList.length}
                onChange={(page) => setCurrentPage(page)}
                showSizeChanger={false}
              />
            </div>

            <div className="custom-search" style={{ display: "flex", alignItems: "center", width: "250px", borderColor: "#737373", borderRadius: "20px"  }}>
              <Input.Search
                placeholder="Tìm lịch sử khám tại đây"
                style={{ width: 250}}
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

      {showActionBar && (
        <div
          style={{
            height: "45px",
            position: "fixed",
            bottom: 20,
            left: "50%",
            transform: "translateX(-50%)",
            background: "#000",
            color: "#fff",
            padding: "10px 20px",
            borderRadius: 30,
            display: "flex",
            alignItems: "center",
            marginBottom: 37,
            marginLeft: 80
          }}
        >
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              width: "24px",
              height: "24px",
              backgroundColor: "#737373",
              color: "#ffffff",
              borderRadius: "50%", 
              fontWeight: "bold",
              fontSize: "12px",
            }}
          >
          {selectedRowKeys.length}
          </div>
            <span style={{ marginLeft: "8px" }}>
              {selectedRowKeys.length > 1 ? "items selected" : "item selected"}
            </span>
          <Button className = "btn" type="link" style={{ width: "50px",height: "25px",  fontSize: "12px", color: "#ffffff", backgroundColor: "#737373", borderRadius: "20px" ,marginRight: 5 , marginLeft: 30}}>Print</Button>
          <Button className = "btn" type="link" style={{ width: "50px",height: "25px",fontSize: "12px",color: "#ffffff", backgroundColor: "#737373", borderRadius: "20px",marginRight: 5 }}>Send</Button>
          <Button className = "btn" danger type="link" style = {{width: "70px",height: "25px",fontSize: "12px",color : "#ffffff", backgroundColor: "#d12326", borderRadius: "20px", marginRight: 0}}>
            <img src = {binLogo} alt = "bin" style = {{width: "15px", height: "15px"}} ></img>
            Delete
          </Button>
          <Button className = "btn"
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
              marginLeft: 5,
              marginRight: 0
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
      {showHistoryInfoModal&& selectedHistory && (
        <Modal
          open={showHistoryInfoModal}
          centered
          width={1100}
          onCancel={() => setShowHistoryInfoModal(false)}
          footer={null}
        >
        <div style={{ 
          height: "500px", 
          overflowY: "auto",
          }}>
          <PatientOneHistory visitId = {selectVisitId}/>
        </div>
        </Modal>
      )}
    </div>
    
  );
}