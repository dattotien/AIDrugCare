import { Button, Dropdown, Table, Badge, Input, Modal, Form, Tabs, Pagination } from "antd";
import { useState } from "react";
import { MoreOutlined, FilterOutlined, PlusOutlined } from "@ant-design/icons";
import "./DoctorHistoryScene.css";
import binLogo from "../../assets/bin.png";
import backPic from "../../assets/Group3.png";
import listDrug from "../../assets/list (1).png";
import PatientOneHistory from "../PatientHistory/PatientOneHistory";
import type { ColumnsType } from "antd/es/table";
import Back from "../../assets/back.png";
interface History {
  id: string;
  name: string;
  dob: string;
  gender: string;
  trieuchung: string;
  trangthai: string;
}
export default function doctorHistory() {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [showActionBar, setShowActionBar] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchText, setSearchText] = useState("");
  const [showHistoryInfoModal, setShowHistoryInfoModal] = useState(false);
  const [selectedHistory, setSelectedHistory] = useState<any | null>(null);

  const [historyList, setHistoryList] = useState<any[]>([
    {
      id: "10000",
      name: "Nguyễn Thị Ngọc Yến",
      dob: "23 - 10 - 2005",
      gender : "Nữ",
      trieuchung: "Đầy hơi, nhức ở bụng dưới",
      trangthai: "Chưa khám",
    },
    {
      id: "10001",
      name: "Nguyễn Thị Yến",
      dob: "23 - 1 - 2003",
      gender : "Nữ",
      trieuchung: "Đầy hơi, nhức bụng",
      trangthai: "Chưa khám",
    },
    {
      id: "10003",
      name: "Trần Thị Hà",
      dob: "14 - 4 - 1999",
      gender : "Nam",
      trieuchung: "Nôn, hay ợ chua",
      trangthai: "Đã khám",
    },
    {
      id: "10019",
      name: "Nguyễn Thị Ngọc Huyền",
      dob: "24 - 7 - 2001",
      gender : "Nữ",
      trieuchung: "Tiêu chảy",
      trangthai: "Chưa khám",
    },
    {
      id: "10020",
      name: "Nguyễn Thị Hiền",
      dob: "16 - 9 -1980",
      gender : "Nữ",
      trieuchung: "Đầy hơi, nhức ở bụng dưới",
      trangthai: "Đã khám",
    },
    {
      id: "102209",
      name: "Nguyễn Phương Đông",
      dob: "1 - 3 - 2010",
      gender : "Nam",
      trieuchung: "Nhức bụng dưới",
      trangthai: "Chưa khám",
    },
    {
      id: "103303",
      name: "Nguyễn Xuân Nam",
      dob: "23 - 10 - 2078",
      gender : "Nam",
      trieuchung: "Đầy hơi, nhức ở bụng dưới",
      trangthai: "Chưa khám",
    },
    {
      id: "103389",
      name: "Bùi Thiên Hương",
      dob: "23 - 10 - 2005",
      gender : "Nữ",
      trieuchung: "Đi ngoài ra máu",
      trangthai: "Đã khám",
    },
    {
      id: "103390",
      name: "Bùi Định",
      dob: "23 - 10 - 2005",
      gender : "Nam",
      trieuchung: "Đi ngoài ra máu",
      trangthai: "Đã khám",
    },
    {
      id: "103400",
      name: "Bùi Công Nam",
      dob: "23 - 10 - 2004",
      gender : "Nam",
      trieuchung: "Ợ chua",
      trangthai: "Chưa khám",
    },
    {
      id: "103401",
      name: "Bùi Mai Hương",
      dob: "23 - 10 - 2004",
      gender : "Nữ",
      trieuchung: "Ợ chua",
      trangthai: "Đã khám",
    },
    {
      id: "103402",
      name: "Bùi Mai Hương",
      dob: "23 - 10 - 2004",
      gender : "Nữ",
      trieuchung: "Ợ chua",
      trangthai: "Chưa khám",
    },
    {
      id: "103403",
      name: "Bùi Minh Tuân",
      dob: "23 - 10 - 2000",
      gender : "Nam",
      trieuchung: "Oự hua",
      trangthai: "Chưa khám",
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
  { title: "Tên bệnh nhân", dataIndex: "name", key: "name", align: "center" },
  { title: "Ngày sinh", dataIndex: "dob", key: "dob", align: "center" },
  { title: "Triệu chứng", dataIndex: "trieuchung", key: "trieuchung", align: "center" },
  { 
    title: "Trạng thái", 
    dataIndex: "trangthai", 
    key: "trangthai", 
    align: "center",
    render: (text: string) => {
      let color = text === "Chưa khám" ? "#043bb3" : text === "Đã khám" ? "#d12362" : "black";
      return <span style={{ color, fontWeight: "bold" }}>{text}</span>;
    }
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

  const rowSelection = {
    selectedRowKeys,
    onChange: (newSelectedRowKeys: React.Key[]) => {
      setSelectedRowKeys(newSelectedRowKeys);
      setShowActionBar(newSelectedRowKeys.length > 0);
    },
  };

  const [activeTab, setActiveTab] = useState<"Tất cả" | "Đã khám" | "Chưa khám">("Tất cả");
  const filterList = activeTab ==="Tất cả" ? filteredList : filteredList.filter(h  => h.trangthai === activeTab);

  const pageSize = 8;
  const paginatedData = filterList.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", gap: 8, color: activeTab === "Tất cả" ? "#043bb3" : "#737373", fontWeight: "bold" , position: "absolute", top: 113, left: 270}}>
        <span>Tất cả</span>
      <div
        style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "20px",
        height: "20px",
        borderRadius: "50%",
        backgroundColor: activeTab === "Tất cả" ? "#043bb3" : "#737373",
        color: "#fff",
        fontSize: "10px",
        fontWeight: "bold"
        }}
        onClick={() => {
          setActiveTab("Tất cả");
          setCurrentPage(1);
        }}
      >
        {filteredList.length}
      </div>
    </div>  
     
     <div style={{ display: "flex", alignItems: "center", gap: 8, color: activeTab === "Đã khám" ? "#043bb3" : "#737373", fontWeight: "bold" , position: "absolute", top: 113, left: 370}}>
        <span>Đã khám</span>
      <div
        style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "20px",
        height: "20px",
        borderRadius: "50%",
        backgroundColor: activeTab === "Đã khám" ? "#043bb3" : "#737373",
        color: "#fff",
        fontSize: "10px",
        fontWeight: "bold"
        }}
        onClick={() => {
          setActiveTab("Đã khám");
          setCurrentPage(1);
        }}        
      >
        {filteredList.filter(h => h.trangthai === "Đã khám").length}
      </div>
    </div> 

        <div style={{ display: "flex", alignItems: "center", gap: 8, color: activeTab === "Chưa khám" ? "#043bb3" : "#737373", fontWeight: "bold" , position: "absolute", top: 113, left: 490}}>
        <span>Chưa khám</span>
      <div
        style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "20px",
        height: "20px",
        borderRadius: "50%",
        backgroundColor: activeTab === "Chưa khám" ? "#043bb3" : "#737373",
        color: "#fff",
        fontSize: "10px",
        fontWeight: "bold"
        }}
        onClick={() => {
          setActiveTab("Chưa khám");
          setCurrentPage(1);
        }}        
      >
        {filteredList.filter(h => h.trangthai === "Chưa khám").length}
      </div>
    </div> 

      <div style={{width: "1320x", height: "500px", backgroundColor: "transparent", 
      display: "flex",  justifyItems: "center",
      marginLeft: 25,marginTop:3, borderRadius: 10,  backgroundImage: `url(${backPic})`,    
      backgroundSize: "cover",
      backgroundPosition: "center",}}>
        <div style={{width : "950px", borderRadius: "0"}}>
          <Table   size="small"
        style={{
          overflow: "hidden",
          marginLeft: 10,
          marginTop: 40,

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