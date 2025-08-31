import { Avatar, Button, Dropdown, Menu, Table, Badge, Input, Pagination, Modal, Form } from "antd";
import { useState } from "react";
import { MoreOutlined, FilterOutlined, PlusOutlined } from "@ant-design/icons";
import userAvatar from "../assets/user (4).png";
import userMailNoti from "../assets/envelope.png";
import userNoti from "../assets/active.png";

export default function DrugListScene() {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [showActionBar, setShowActionBar] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [searchText, setSearchText] = useState("");
  const [showAddDrugModal, setShowAddDrugModal] = useState(false);

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
    drug.generic_name.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleSearch = (value: string) => {
    setSearchText(value);
    setCurrentPage(1);
  };

  const handleDelete = (record: any) => {
    setDrugList((prev) => prev.filter((d) => d._id !== record._id));
  };

  const handleMore = (record: any) => {
    console.log("More info", record);
  };

  const menu = (record: any) => (
    <Menu>
      <Menu.Item key="delete" onClick={() => handleDelete(record)}>
        Delete
      </Menu.Item>
      <Menu.Item key="more" onClick={() => handleMore(record)}>
        More
      </Menu.Item>
    </Menu>
  );

  const columns = [
    { title: "ID", dataIndex: "_id", key: "_id" },
    { title: "Tên thuốc", dataIndex: "generic_name", key: "generic_name" },
    { title: "ATC - Code", dataIndex: "atc_code", key: "atc_code" },
    { title: "Tên thị trường", dataIndex: "brand_names", key: "brand_names" },
    { title: "Phân loại", dataIndex: "categories", key: "categories" },
    { title: "Dạng liều", dataIndex: "dosage_forms", key: "dosage_forms" },
    {
      title: "",
      key: "actions",
      render: (_: any, record: any) => (
        <Dropdown overlay={menu(record)} trigger={["click"]}>
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

  const pageSize = 8;
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
        <h2 style={{ color: "#1b76d1ff", fontWeight: "bold", margin: 0 }}>
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

      {/* Table */}
      <Table
        scroll={{ x: "max-content" }}
        rowKey="_id"
        columns={columns}
        dataSource={filteredList}
        rowSelection={{
          selectedRowKeys,
          onChange: (newSelectedRowKeys) => {
            setSelectedRowKeys(newSelectedRowKeys);
            setShowActionBar(newSelectedRowKeys.length > 0);
          },
          preserveSelectedRowKeys: true, // ✅ giữ tick khi đổi trang
        }}
        pagination={{
          current: currentPage,
          pageSize,
          total: filteredList.length,
          onChange: (page) => setCurrentPage(page),
          showSizeChanger: false,
        }}
        title={() => (
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            {/* Bên trái: Filter */}
            <Button icon={<FilterOutlined />}>Filter</Button>

            {/* Bên phải: Search + Add */}
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <Input.Search
                placeholder="Tìm thuốc tại đây"
                style={{ width: 250 }}
                onSearch={handleSearch}
                allowClear
              />
              <Button
                type="primary"
                shape="circle"
                icon={<PlusOutlined />}
                style={{ backgroundColor: "#1890ff" }}
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
          <span>{selectedRowKeys.length} items selected</span>
          <Button type="link" style={{ color: "#fff" }}>Print</Button>
          <Button type="link" style={{ color: "#fff" }}>Send</Button>
          <Button danger type="link">Delete</Button>
          <Button
            type="link"
            style={{ color: "#fff" }}
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