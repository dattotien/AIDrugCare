import { Button, Dropdown, Table, Badge, Input, Modal, Form, Tabs, Pagination } from "antd";
import { useState } from "react";
import { MoreOutlined, FilterOutlined, PlusOutlined } from "@ant-design/icons";
import "./PatientHistory.css";
import binLogo from "../../assets/bin.png";
import backPic from "../../assets/Group 68.png";
import listDrug from "../../assets/list (1).png";
import PatientOneHistory from "./PatientOneHistory";
import type { ColumnsType } from "antd/es/table";
import Back from "../../assets/back.png";
interface History {
  id: string;
  name: string;
  date: string;
  department: string;
  diagnosis: string;
}
export default function PatientHistory() {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [showActionBar, setShowActionBar] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchText, setSearchText] = useState("");
  const [showHistoryInfoModal, setShowHistoryInfoModal] = useState(false);
  const [selectedHistory, setSelectedHistory] = useState<any | null>(null);

  const [historyList, setHistoryList] = useState<any[]>([
    {
      id: "10000",
      name: "Nguyen Thi Ngoc Yen",
      date: "28 - 8 - 2025",
      department: "Tiêu hóa",
      diagnosis: "Viêm dạ dày cấp",
    },
    {
      id: "10001",
      name: "Nguyen Thi  Yen",
      date: "28 - 2 - 2025",
      department: "Tiêu hóa",
      diagnosis: "Viêm dạ dày cấp",
    },
    {
      id: "10003",
      name: "Trần Thi Lien",
      date: "20 - 12 - 2024",
      department: "Tiêu hóa",
      diagnosis: "Viêm dạ dày cấp",
    },
    {
      id: "10019",
      name: "Trần Thi Lien",
      date: "1 - 12 - 2024",
      department: "Tiêu hóa",
      diagnosis: "Viêm dạ dày cấp",
    },
    {
      id: "10020",
      name: "Mai Thi Thao",
      date: "20 - 9 - 2024",
      department: "Rang - ham - mat",
      diagnosis: "viem loi",
    },
    {
      id: "102209",
      name: "Trần Kim Thoa",
      date: "1 - 6 - 2024",
      department: "Tiêu hóa",
      diagnosis: "Viêm dạ dày cấp",
    },
    {
      id: "103303",
      name: "Trần Thanh Lien",
      date: "20 - 5- 2024",
      department: "Tiêu hóa",
      diagnosis: "Viêm dạ dày cấp",
    },
    {
      id: "103389",
      name: "Bùi Thiên Hương",
      date: "20 - 4 - 2024",
      department: "Tiêu hóa",
      diagnosis: "Viêm dạ dày cấp",
    },
    {
      id: "103398",
      name: "Trần Thi Lien",
      date: "20 - 3 - 2024",
      department: "Tiêu hóa",
      diagnosis: "Viêm dạ dày cấp",
    },
    {
      id: "103399",
      name: "Trần Thi Lien",
      date: "20 - 2 - 2024",
      department: "Tiêu hóa",
      diagnosis: "Viêm dạ dày cấp",
    },
    {
      id: "103435",
      name: "Trần Thi Lien",
      date: "20 - 1 - 2024",
      department: "Tiêu hóa",
      diagnosis: "Viêm dạ dày cấp",
    },
    {
      id: "103445",
      name: "Trần Thi Binh",
      date: "2 - 1 - 2024",
      department: "Tiêu hóa",
      diagnosis: "Viêm dạ dày cấp",
    },
    {
      id: "103550",
      name: "Đao Thi Lâm",
      date: "10 - 12 - 2023",
      department: "Tiêu hóa",
      diagnosis: "Viêm dạ dày cấp",
    },
    {
      id: "103689",
      name: "Trần Thi Lien",
      date: "1 - 12 - 2023",
      department: "Tiêu hóa",
      diagnosis: "Viêm dạ dày cấp",
    },
  ]);

  const filteredList = historyList.filter((history) =>
    Object.values(history).some((field) =>
      String(field).toLowerCase().includes(searchText.toLowerCase())
    )
  );

  const handleSearch = (value: string) => {
    setSearchText(value); 
    setCurrentPage(1);    
  };

  const handleDelete = (record: any) => {
    setHistoryList((prev) => prev.filter((d) => d.id !== record.id));
  };

  const handleMore = (record: any) => {
    setSelectedHistory(record);
    setShowHistoryInfoModal(true);
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
  { title: "ID", dataIndex: "id", key: "id", align: "center" },
  { title: "Tên bác sĩ", dataIndex: "name", key: "name", align: "center" },
  { title: "Ngày khám", dataIndex: "date", key: "date", align: "center" },
  { title: "Khoa", dataIndex: "department", key: "department", align: "center" },
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
        {historyList.length}
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
          <PatientOneHistory />
        </div>
        </Modal>
      )}
    </div>
    
  );
}