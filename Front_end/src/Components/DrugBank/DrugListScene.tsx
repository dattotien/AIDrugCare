import { Button, Dropdown, Table, Badge, Input, Modal, Form, Tabs, Pagination } from "antd";
import { useState } from "react";
import { MoreOutlined, FilterOutlined, PlusOutlined } from "@ant-design/icons";

import DrugInfor from "./DrugInfor.tsx";
import listDrug from "../../assets/list (1).png";
import "./DrugListScene.css";

export default function DrugListScene() {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [showActionBar, setShowActionBar] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchText, setSearchText] = useState("");
  const [showAddDrugModal, setShowAddDrugModal] = useState(false);
  const [showDrugInfoModal, setShowDrugInfoModal] = useState(false);
  const [selectedDrug, setSelectedDrug] = useState<any | null>(null);

  const [drugList, setDrugList] = useState<any[]>([
    { _id: "DB00001", generic_name: "Dornase Alfa", atc_code: "R05CB13", brand_names: "Pulmozyme", categories: "Cough and Cold Preparations", dosage_forms: "Aerosol, spray" },
    { _id: "DB00002", generic_name: "Aspirin", atc_code: "B01AC06", brand_names: "Aspirin Bayer", categories: "Antiplatelet", dosage_forms: "Tablet" },
    // ... (giữ nguyên danh sách như cũ)
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
        <div className="menu-item" onClick={() => handleDelete(record)}>
          Delete
        </div>
      ),
    },
    {
      key: "more",
      label: (
        <div className="menu-item" onClick={() => handleMore(record)}>
          More
        </div>
      ),
    },
  ];

  const columns = [
    { title: <span className="table-header">ID</span>, dataIndex: "_id", key: "_id", width: 100, ellipsis: true },
    { title: <span className="table-header">Tên thuốc</span>, dataIndex: "generic_name", key: "generic_name", width: 200, ellipsis: true },
    { title: <span className="table-header">Tên thị trường</span>, dataIndex: "brand_names", key: "brand_names", width: 200, ellipsis: true },
    { title: <span className="table-header">Phân loại</span>, dataIndex: "categories", key: "categories", width: 200, ellipsis: true },
    { title: <span className="table-header">Dạng liều</span>, dataIndex: "dosage_forms", key: "dosage_forms", width: 200, ellipsis: true },
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
                <b>All drugs</b>
                <Badge
                  count={drugList.length > 1000 ? "1000+" : drugList.length}
                  style={{ backgroundColor: "var(--primary-color)" }}
                />
              </span>
            ),
          },
        ]}
      />

      {/* Table */}
      <Table
        className="drug-table"
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
          <div className="table-header-bar">
            <Button icon={<FilterOutlined />}>Filter</Button>

            <div className="pagination-center">
              <Pagination
                current={currentPage}
                pageSize={pageSize}
                total={filteredList.length}
                onChange={(page) => setCurrentPage(page)}
                showSizeChanger={false}
              />
            </div>

            <div className="search-add">
              <Input.Search
                placeholder="Tìm thuốc tại đây"
                className="search-input"
                allowClear
                onSearch={handleSearch}
                onPressEnter={(e) => handleSearch(e.currentTarget.value)}
              />
              <Button
                type="primary"
                shape="circle"
                icon={<PlusOutlined />}
                className="add-button"
                onClick={() => setShowAddDrugModal(true)}
              />
            </div>
          </div>
        )}
      />

      {/* Modal thêm thuốc */}
      <Modal
        title={null}
        open={showAddDrugModal}
        onCancel={() => setShowAddDrugModal(false)}
        onOk={() => setShowAddDrugModal(false)}
        className="add-drug-modal"
        footer={null}
      >
        <div className="modal-header">
          <h2>Thêm thuốc mới</h2>
        </div>
        <Form layout="vertical" className="add-drug-form">
          <Form.Item label="Tên thuốc" name="generic_name">
            <Input placeholder="Nhập tên thuốc..." />
          </Form.Item>
          <Form.Item label="ATC Code" name="atc_code">
            <Input placeholder="Nhập ATC Code..." />
          </Form.Item>
          <Form.Item label="Tên thị trường" name="brand_names">
            <Input placeholder="Nhập tên thị trường..." />
          </Form.Item>
          <Form.Item label="Phân loại" name="categories">
            <Input placeholder="Nhập phân loại..." />
          </Form.Item>
          <Form.Item label="Dạng liều" name="dosage_forms">
            <Input placeholder="Nhập dạng liều..." />
          </Form.Item>

          <div className="modal-footer">
            <Button onClick={() => setShowAddDrugModal(false)}>Cancel</Button>
            <Button type="primary" htmlType="submit">
              OK
            </Button>
          </div>
        </Form>
      </Modal>

      {/* Modal hiển thị thông tin thuốc */}
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
        closeIcon={<div className="close-btn">X</div>}
      >
        {selectedDrug && <DrugInfor drug={selectedDrug} />}
      </Modal>

      {/* Action Bar */}
      {showActionBar && (
        <div className="action-bar">
          <span>
            {selectedRowKeys.length} {selectedRowKeys.length > 1 ? "items" : "item"} selected
          </span>
          <Button type="link" className="action-btn">Print</Button>
          <Button type="link" className="action-btn">Send</Button>
          <Button danger type="link">Delete</Button>
          <Button
            type="link"
            className="action-close"
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
