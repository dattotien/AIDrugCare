import { Avatar, Button, Dropdown, Table, Badge, Input, Modal, Form, Tabs, Pagination } from "antd";
import { useState } from "react";
import { MoreOutlined, FilterOutlined, PlusOutlined } from "@ant-design/icons";

import DrugInfor from "./DrugInfor.tsx";

import userAvatar from "../assets/user.png";
import userMailNoti from "../assets/envelope.png";
import userNoti from "../assets/active.png";
import listDrug from "../assets/list.png";

export default function DrugListScene() {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [showActionBar, setShowActionBar] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchText, setSearchText] = useState("");
  const [showAddDrugModal, setShowAddDrugModal] = useState(false);
  const [showDrugInfoModal, setShowDrugInfoModal] = useState(false);
  const [selectedDrug, setSelectedDrug] = useState<any | null>(null);

  const [drugList, setDrugList] = useState<any[]>([
    {
      _id: "DB00001",
      generic_name: "Dornase Alfa",
      atc_code: "R05CB13",
      brand_names: "Pulmozyme",
      categories: "Cough and Cold Preparations",
      dosage_forms: "Aerosol, spray",
    },
    {
      _id: "DB00002",
      generic_name: "Aspirin",
      atc_code: "B01AC06",
      brand_names: "Aspirin Bayer",
      categories: "Antiplatelet",
      dosage_forms: "Tablet",
    },
    {
      _id: "DB00003",
      generic_name: "Dornase Alfa",
      atc_code: "R05CB13",
      brand_names: "Pulmozyme",
      categories: "Cough and Cold Preparations",
      dosage_forms: "Aerosol, spray",
    },
    {
      _id: "DB00004",
      generic_name: "Aspirin",
      atc_code: "B01AC06",
      brand_names: "Aspirin Bayer",
      categories: "Antiplatelet",
      dosage_forms: "Tablet",
    },
    {
      _id: "DB00005",
      generic_name: "Dornase Alfa",
      atc_code: "R05CB13",
      brand_names: "Pulmozyme",
      categories: "Cough and Cold Preparations",
      dosage_forms: "Aerosol, spray",
    },
    {
      _id: "DB00006",
      generic_name: "Aspirin",
      atc_code: "B01AC06",
      brand_names: "Aspirin Bayer",
      categories: "Antiplatelet",
      dosage_forms: "Tablet",
    },
    {
      _id: "DB00007",
      generic_name: "Dornase Alfa",
      atc_code: "R05CB13",
      brand_names: "Pulmozyme",
      categories: "Cough and Cold Preparations",
      dosage_forms: "Aerosol, spray",
    },
    {
      _id: "DB00008",
      generic_name: "Aspirin",
      atc_code: "B01AC06",
      brand_names: "Aspirin Bayer",
      categories: "Antiplatelet",
      dosage_forms: "Tablet",
    },
    {
      _id: "DB00009",
      generic_name: "Dornase Alfa",
      atc_code: "R05CB13",
      brand_names: "Pulmozyme",
      categories: "Cough and Cold Preparations",
      dosage_forms: "Aerosol, spray",
    },
    {
      _id: "DB00010",
      generic_name: "Aspirin",
      atc_code: "B01AC06",
      brand_names: "Aspirin Bayer",
      categories: "Antiplatelet",
      dosage_forms: "Tablet",
    },
    {
      _id: "DB00011",
      generic_name: "Dornase Alfa",
      atc_code: "R05CB13",
      brand_names: "Pulmozyme",
      categories: "Cough and Cold Preparations",
      dosage_forms: "Aerosol, spray",
    },
    {
      _id: "DB00012",
      generic_name: "Aspirin",
      atc_code: "B01AC06",
      brand_names: "Aspirin Bayer",
      categories: "Antiplatelet",
      dosage_forms: "Tablet",
    },
    {
      _id: "DB00013",
      generic_name: "Dornase Alfa",
      atc_code: "R05CB13",
      brand_names: "Pulmozyme",
      categories: "Cough and Cold Preparations",
      dosage_forms: "Aerosol, spray",
    },
    {
      _id: "DB00014",
      generic_name: "Aspirin",
      atc_code: "B01AC06",
      brand_names: "Aspirin Bayer",
      categories: "Antiplatelet",
      dosage_forms: "Tablet",
    },
  ]);

  const filteredList = drugList.filter((drug) =>
    Object.values(drug).some((field) =>
      String(field).toLowerCase().includes(searchText.toLowerCase())
    )
  );

  const handleSearch = (value: string) => {
    setSearchText(value); 
    setCurrentPage(1);    
  };

  const handleDelete = (record: any) => {
    setDrugList((prev) => prev.filter((d) => d._id !== record._id));
  };

  const handleMore = (record: any) => {
    setSelectedDrug(record);
    setShowDrugInfoModal(true);
  };

  const menuItems = (record: any) => [
    {
      key: "delete",
      label: (
        <div
          style={{
            color: "#1976d2",
            fontWeight: "bold",
            minWidth: 80,
            textAlign: "center",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.background = "#1976d2";
            (e.currentTarget as HTMLElement).style.color = "white";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.background = "white";
            (e.currentTarget as HTMLElement).style.color = "#1976d2";
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
            color: "#1976d2",
            fontWeight: "bold",
            minWidth: 80,
            textAlign: "center",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.background = "#1976d2";
            (e.currentTarget as HTMLElement).style.color = "white";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.background = "white";
            (e.currentTarget as HTMLElement).style.color = "#1976d2";
          }}
          onClick={() => handleMore(record)}
        >
          More
        </div>
      ),
    },
  ];

  const columns = [
    { title: <span style={{ color: "#1976d2", fontWeight: "bold" }}>ID</span>, dataIndex: "_id", key: "_id", width: 100, ellipsis: true },
    { title: <span style={{ color: "#1976d2", fontWeight: "bold" }}>Tên thuốc</span>, dataIndex: "generic_name", key: "generic_name", width: 200, ellipsis: true },
    { title: <span style={{ color: "#1976d2", fontWeight: "bold" }}>Tên thị trường</span>, dataIndex: "brand_names", key: "brand_names", width: 200, ellipsis: true },
    { title: <span style={{ color: "#1976d2", fontWeight: "bold" }}>Phân loại</span>, dataIndex: "categories", key: "categories", width: 200, ellipsis: true },
    { title: <span style={{ color: "#1976d2", fontWeight: "bold" }}>Dạng liều</span>, dataIndex: "dosage_forms", key: "dosage_forms", width: 200, ellipsis: true },
    {
      title: "",
      key: "actions",
      width: 50,
      render: (_: any, record: any) => (
        <Dropdown menu={{ items: menuItems(record) }} trigger={["click"]}>
          <MoreOutlined style={{ fontSize: 18, cursor: "pointer" }} />
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

  const pageSize = 7;
  const paginatedData = filteredList.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const accountInfo = {
    name: "Dr. N.T.N Yen",
    email: "yennguyen@gmail.com",
    avatar: userAvatar,
  };

  return (
    <div style={{ padding: 20, position: "relative" }}>
      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 20,
        }}
      >
        <h2 style={{ color: "#1c5cb6ff", fontWeight: "bold", margin: 0 }}>
          DRUGBANK
        </h2>

        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <Badge size="small">
            <img src={userMailNoti} alt="mail" style={{ width: 24, cursor: "pointer" }} />
          </Badge>
          <Badge size="small">
            <img src={userNoti} alt="noti" style={{ width: 24, cursor: "pointer" }} />
          </Badge>
          <div style={{ display: "flex", alignItems: "center" }}>
            <Avatar src={accountInfo.avatar} size={40} style={{ marginRight: "10px" }} />
            <div>
              <div style={{ fontWeight: "bold", color: "#333" }}>{accountInfo.name}</div>
              <div style={{ fontSize: "12px", color: "#666" }}>{accountInfo.email}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <Tabs
        defaultActiveKey="1"
        items={[
          {
            key: "1",
            label: (
              <span style={{ display: "flex", alignItems: "center", gap: 8, color: "#000" }}>
                <img src={listDrug} alt="list" style={{ width: 20, height: 20 }} />
                <b>All drugs</b>
                <Badge
                  count={drugList.length > 1000 ? "1000+" : drugList.length}
                  style={{ backgroundColor: "#1c5cb6ff" }}
                />
              </span>
            ),
          },
        ]}
      />

      {/* Table */}
      <Table
        style={{
          boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
          borderRadius: 12,
          overflow: "hidden",
        }}
        scroll={{ x: "max-content" }}
        rowKey="_id"
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
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: 10,
            }}
          >
            {/* Bên trái: Filter */}
            <Button icon={<FilterOutlined />}>Filter</Button>

            {/* Giữa: Pagination */}
            <div style={{ flex: 1, display: "flex", justifyContent: "center" }}>
              <Pagination
                current={currentPage}
                pageSize={pageSize}
                total={filteredList.length}
                onChange={(page) => setCurrentPage(page)}
                showSizeChanger={false}
              />
            </div>

            {/* Bên phải: Search + Add */}
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <Input.Search
                placeholder="Tìm thuốc tại đây"
                style={{ width: 300 }}
                allowClear
                onSearch={handleSearch}
                onPressEnter={(e) => handleSearch(e.currentTarget.value)}
              />
              <Button
                type="primary"
                shape="circle"
                icon={<PlusOutlined />}
                style={{ backgroundColor: "#1c5cb6ff" }}
                onClick={() => setShowAddDrugModal(true)}
              />
            </div>
          </div>
        )}
      />

      {/* Modal thêm thuốc */}
      <Modal
        title="Thêm thuốc mới"
        open={showAddDrugModal}
        onCancel={() => setShowAddDrugModal(false)}
        onOk={() => setShowAddDrugModal(false)}
      >
        <Form layout="vertical">
          <Form.Item label="Tên thuốc" name="generic_name">
            <Input />
          </Form.Item>
          <Form.Item label="ATC Code" name="atc_code">
            <Input />
          </Form.Item>
          <Form.Item label="Tên thị trường" name="brand_names">
            <Input />
          </Form.Item>
          <Form.Item label="Phân loại" name="categories">
            <Input />
          </Form.Item>
          <Form.Item label="Dạng liều" name="dosage_forms">
            <Input />
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        open={showDrugInfoModal}
        footer={null}
        onCancel={() => {
          setShowDrugInfoModal(false);
          setSelectedDrug(null);
        }}
        width="60%"
        style={{ top: 20 }}
        title={null} 
        closeIcon={
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: "50%",
              background: "#8b9aceff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: 600,
              fontSize: 16,
              color: "#0a2855ff",
              cursor: "pointer",
            }}
          >
            X
          </div>
        }
      >
        {selectedDrug && <DrugInfor drug={selectedDrug} />}
      </Modal>

      {/* Action Bar */}
      {showActionBar && (
        <div
          style={{
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
            gap: 20,
          }}
        >
          <span>
            {selectedRowKeys.length} {selectedRowKeys.length > 1 ? "items" : "item"} selected
          </span>
          <Button type="link" style={{ color: "#fff" }}>Print</Button>
          <Button type="link" style={{ color: "#fff" }}>Send</Button>
          <Button danger type="link">Delete</Button>
          <Button
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
    </div>
  );
}