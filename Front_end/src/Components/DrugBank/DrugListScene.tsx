import {
  Button,
  Dropdown,
  Table,
  Badge,
  Input,
  Modal,
  Tabs,
  Pagination,
  message,
} from "antd";
import { useEffect, useState } from "react";
import { MoreOutlined, FilterOutlined, PlusOutlined } from "@ant-design/icons";
import axios from "axios";
import type { ColumnsType } from "antd/es/table";

import DrugInfor from "./DrugInfor.tsx";
import listDrug from "../../assets/list (1).png";
import "./DrugListScene.css";

interface Drug {
  _id: string;
  generic_name: string;
  description?: string;
  brand_names?: string[];
  categories?: string[];
  dosage_forms?: string[];
  atc_code?: string[];
  chemical_formula?: string;
  molecular_formula?: string;
  drug_interaction?: string[];
  synonyms?: string[];
  manufacturers?: string[];
}

export default function DrugListScene() {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [showActionBar, setShowActionBar] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchText, setSearchText] = useState("");
  const [showAddDrugModal, setShowAddDrugModal] = useState(false);
  const [showDrugInfoModal, setShowDrugInfoModal] = useState(false);
  const [selectedDrug, setSelectedDrug] = useState<Drug | null>(null);

  const [drugList, setDrugList] = useState<Drug[]>([]);
  const [loading, setLoading] = useState(false);

  // Gọi API lấy danh sách thuốc
  const fetchDrugs = async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:8000/drugs");
      if (res.data.success && Array.isArray(res.data.data)) {
        setDrugList(res.data.data);
      } else {
        setDrugList([]);
        message.error(res.data.message || "Không lấy được danh sách thuốc");
      }
    } catch (err) {
      console.error(err);
      message.error("Lỗi khi gọi API danh sách thuốc");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDrugs();
  }, []);

  // Lọc theo search
  const filteredList = drugList.filter((drug) =>
    Object.values(drug).some((field) =>
      String(field).toLowerCase().includes(searchText.toLowerCase())
    )
  );

  const handleSearch = (value: string) => {
    setSearchText(value);
    setCurrentPage(1);
  };

  // Xóa thuốc
  const handleDelete = async (record: Drug) => {
    try {
      await axios.delete(`http://localhost:8000/drugs/${record._id}`);
      message.success("Xóa thuốc thành công");
      setDrugList((prev) => prev.filter((d) => d._id !== record._id));
    } catch (err) {
      console.error(err);
      message.error("Lỗi khi xóa thuốc");
    }
  };

  // Xem chi tiết
  const handleMore = (record: Drug) => {
    setSelectedDrug(record);
    setShowDrugInfoModal(true);
  };

  // Menu hành động
  const menuItems = (record: Drug) => [
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

  // Cột table
  const columns: ColumnsType<Drug> = [
    {
      title: <span className="table-header">ID</span>,
      dataIndex: "_id",
      key: "_id",
      width: 120,
      align: "left",
      ellipsis: true,
    },
    {
      title: <span className="table-header">Tên thuốc</span>,
      dataIndex: "generic_name",
      key: "generic_name",
      width: 200,
      align: "left",
      ellipsis: true,
    },
    {
      title: <span className="table-header">Mô tả</span>,
      dataIndex: "description",
      key: "description",
      width: 400,
      align: "left",
      ellipsis: false,
    },
    {
      title: <span className="table-header">Tên thị trường</span>,
      dataIndex: "brand_names",
      key: "brand_names",
      width: 200,
      align: "left",
      ellipsis: true,
      render: (brands) => <span>{brands?.join(", ")}</span>,
    },
    {
      title: <span className="table-header">Phân loại</span>,
      dataIndex: "categories",
      key: "categories",
      width: 200,
      align: "left",
      ellipsis: true,
      render: (cats) => <span>{cats?.join(", ")}</span>,
    },
    {
      title: <span className="table-header">Dạng liều</span>,
      dataIndex: "dosage_forms",
      key: "dosage_forms",
      width: 200,
      align: "left",
      ellipsis: true,
      render: (forms) => <span>{forms?.join(", ")}</span>,
    },
    {
      title: <span className="table-header">ATC Code</span>,
      dataIndex: "atc_code",
      key: "atc_code",
      width: 150,
      align: "left",
      ellipsis: true,
      render: (codes) => <span>{codes?.join(", ")}</span>,
    },
    {
      title: <span className="table-header">CTHH</span>,
      dataIndex: "chemical_formula",
      key: "chemical_formula",
      width: 150,
      align: "left",
      ellipsis: true,
    },
    {
      title: <span className="table-header">CTPT</span>,
      dataIndex: "molecular_formula",
      key: "molecular_formula",
      width: 200,
      align: "left",
      ellipsis: true,
    },
    {
      title: <span className="table-header">Tương tác</span>,
      dataIndex: "drug_interaction",
      key: "drug_interaction",
      width: 300,
      align: "left",
      ellipsis: true,
      render: (interactions) => <span>{interactions?.join(", ")}</span>,
    },
    {
      title: <span className="table-header">Tên đồng nghĩa</span>,
      dataIndex: "synonyms",
      key: "synonyms",
      width: 200,
      align: "left",
      ellipsis: true,
      render: (syns) => <span>{syns?.join(", ")}</span>,
    },
    {
      title: <span className="table-header">Nhà sản xuất</span>,
      dataIndex: "manufacturers",
      key: "manufacturers",
      width: 200,
      align: "left",
      ellipsis: true,
      render: (mans) => <span>{mans?.join(", ")}</span>,
    },
    {
      title: "",
      key: "actions",
      width: 50,
      render: (_, record) => (
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
        loading={loading}
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

            {/* Pagination center */}
            <div className="pagination-center">
              <Pagination
                current={currentPage}
                pageSize={pageSize}
                total={filteredList.length}
                onChange={(page) => setCurrentPage(page)}
                showSizeChanger={false}
              />
            </div>

            {/* Search + Add */}
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
            {selectedRowKeys.length}{" "}
            {selectedRowKeys.length > 1 ? "items" : "item"} selected
          </span>
          <Button type="link" className="action-btn">
            Print
          </Button>
          <Button type="link" className="action-btn">
            Send
          </Button>
          <Button danger type="link">
            Delete
          </Button>
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
