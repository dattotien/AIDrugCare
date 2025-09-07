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
  Typography,
} from "antd";
import { useEffect, useState } from "react";
import { MoreOutlined, FilterOutlined } from "@ant-design/icons";
import axios from "axios";
import type { ColumnsType } from "antd/es/table";

import DrugInfor from "./DrugInfor.tsx";
import listDrug from "../../assets/list (1).png";
import "./DrugListScene.css";

const { Text } = Typography;

interface BrandName {
  name: string;
  route?: string;
  strength?: string;
  dosage_form?: string;
  country?: string;
}

interface Manufacturer {
  name: string;
}

interface Drug {
  _id: string;
  generic_name: string;
  description?: string;
  brand_names?: BrandName[];
  manufacturers?: Manufacturer[];
}

export default function DrugListScene() {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [showActionBar, setShowActionBar] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchText, setSearchText] = useState("");
  const [showDrugInfoModal, setShowDrugInfoModal] = useState(false);
  const [selectedDrug, setSelectedDrug] = useState<Drug | null>(null);

  const [drugList, setDrugList] = useState<Drug[]>([]);
  const [loading, setLoading] = useState(false);

  // Gọi API lấy danh sách thuốc (có thêm fetch chi tiết để hiển thị 1 ít brand_names & manufacturers)
  const fetchDrugs = async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:8000/drugs");
      if (res.data.success && Array.isArray(res.data.data)) {
        const baseList = res.data.data;

        // Gọi thêm chi tiết cho từng thuốc, chỉ lấy vài trường cần
        const detailed = await Promise.all(
          baseList.map(async (drug: any) => {
            try {
              const detailRes = await axios.get(`http://localhost:8000/drugs/${drug._id}`);
              if (detailRes.data.success && detailRes.data.data) {
                const detail = detailRes.data.data;
                return {
                  ...drug,
                  brand_names: Array.isArray(detail.brand_names)
                    ? detail.brand_names.slice(0, 5).map((b: any) => ({
                        name: b?.name ?? "",
                        route: b?.route ?? "",
                        strength: b?.strength ?? "",
                        dosage_form: b?.dosage_form ?? "",
                        country: b?.country ?? "",
                      }))
                    : [],
                  manufacturers: Array.isArray(detail.manufacturers)
                    ? detail.manufacturers.slice(0, 5).map((m: any) =>
                        typeof m === "string" ? { name: m } : { name: m?.name ?? "" }
                      )
                    : [],
                };
              }
            } catch (err) {
              console.error("Lỗi fetch chi tiết thuốc:", err);
            }
            return {
              ...drug,
              brand_names: [],
              manufacturers: [],
            };
          })
        );

        setDrugList(detailed);
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

  // Xem chi tiết
  const handleMore = (record: Drug) => {
    setSelectedDrug(record);
    setShowDrugInfoModal(true);
  };

  // Menu hành động
  const menuItems = (record: Drug) => [
    {
      key: "more",
      label: (
        <div className="menu-item" onClick={() => handleMore(record)}>
          More
        </div>
      ),
    },
  ];

  const renderEllipsis = (value?: string | string[], maxWidth?: number) => {
    if (!value) return <Text>-</Text>;

    const text = Array.isArray(value)
      ? value.join(", ") 
      : value;

    return (
      <Text
        ellipsis={{ tooltip: text }}
        style={{
          display: "inline-block",
          maxWidth: maxWidth || "100%",
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
        }}
      >
        {text}
      </Text>
    );
  };

  const columns: ColumnsType<Drug> = [
    {
      title: <span className="table-header">ID</span>,
      dataIndex: "_id",
      key: "_id",
      width: 120,
      render: (text) => renderEllipsis(text, 120),
    },
    {
      title: <span className="table-header">Tên thuốc</span>,
      dataIndex: "generic_name",
      key: "generic_name",
      width: 200,
      render: (text) => renderEllipsis(text, 200),
    },
    {
      title: <span className="table-header">Mô tả</span>,
      dataIndex: "description",
      key: "description",
      width: 400,
      render: (text) => renderEllipsis(text, 400),
    },
    {
      title: "Tên thị trường",
      dataIndex: "brand_names",
      key: "brand_names",
      width: 200,
      render: (brands?: BrandName[]) =>
        renderEllipsis(
          brands && brands.length ? brands.map(b => b.name) : "-",
          200
        ),
    },
    {
      title: "Nhà sản xuất",
      dataIndex: "manufacturers",
      key: "manufacturers",
      width: 200,
      render: (mans?: Manufacturer[]) =>
        renderEllipsis(
          mans && mans.length ? mans.map(m => m.name) : "-",
          200
        ),
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
