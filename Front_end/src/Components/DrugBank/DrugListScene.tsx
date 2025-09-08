// DrugListScene.tsx
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
  Spin,
} from "antd";
import { useEffect, useState } from "react";
import { MoreOutlined, FilterOutlined } from "@ant-design/icons";
import axios from "axios";
import type { ColumnsType } from "antd/es/table";
import type { Drug } from "./drug.types.ts";

import DrugInfor from "./DrugInfor.tsx";
import listDrug from "../../assets/list (1).png";
import "./DrugListScene.css";

const { Text } = Typography;

export default function DrugListScene() {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [showActionBar, setShowActionBar] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchText, setSearchText] = useState("");
  const [showDrugInfoModal, setShowDrugInfoModal] = useState(false);
  const [selectedDrug, setSelectedDrug] = useState<Drug | null>(null);

  const [drugList, setDrugList] = useState<Drug[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingDetail, setLoadingDetail] = useState(false);

  // fetch danh sách cơ bản
  const fetchDrugs = async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:8000/drugs");
      console.log("API /drugs response:", res.data);

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

  // Search chỉ trong field text
  const filteredList = drugList.filter((drug) => {
    const search = searchText.toLowerCase();
    return (
      drug.generic_name?.toLowerCase().includes(search) ||
      drug.description?.toLowerCase().includes(search) ||
      drug.synonyms?.some((s) => s.toLowerCase().includes(search)) ||
      drug.categories?.some((c) => c.toLowerCase().includes(search)) ||
      drug.atc_code?.some((a) => a.toLowerCase().includes(search)) ||
      drug.brand_names?.some((b) =>
        b.name?.toLowerCase().includes(search)
      ) ||
      drug.manufacturers?.some((m) =>
        m.toLowerCase().includes(search)
      )
    );
  });

  const handleSearch = (value: string) => {
    setSearchText(value);
    setCurrentPage(1);
  };

  const handleMore = async (record: Drug) => {
    setLoadingDetail(true);
    try {
      const res = await axios.get(`http://localhost:8000/drugs/${record._id}`);
      console.log(`API /drugs/${record._id} response:`, res.data);
      const data = res.data.data || res.data; 

      if (data) {
        setSelectedDrug(data);
        setShowDrugInfoModal(true);
      } else {
        message.error("Không lấy được chi tiết thuốc");
      }
    } catch (err) {
      console.error(err);
      message.error("Lỗi khi gọi API chi tiết thuốc");
    } finally {
      setLoadingDetail(false);
    }
  };

  const menuItems = (record: Drug) => [
    {
      key: "more",
      label: (
        <div onClick={() => handleMore(record)}>
          More
        </div>
      ),
    },
  ];

  const renderEllipsis = (value?: string | string[], maxWidth?: number) => {
    if (!value) return <Text>-</Text>;
    const text = Array.isArray(value) ? value.join(", ") : value;
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
      title: "ID",
      dataIndex: "_id",
      key: "_id",
      width: 200,
      render: (text) => renderEllipsis(text, 200),
    },
    {
      title: "Tên thuốc",
      dataIndex: "generic_name",
      key: "generic_name",
      width: 300,
      render: (text) => renderEllipsis(text, 300),
    },
    {
      title: "Mô tả",
      dataIndex: "description",
      key: "description",
      width: 600,
      render: (text) => renderEllipsis(text, 600),
    },
    {
      title: "",
      key: "actions",
      width: 30,
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
            </div>
          </div>
        )}
      />

      {/* Modal chi tiết */}
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
        {loadingDetail ? (
          <Spin />
        ) : (
          selectedDrug && <DrugInfor drug={selectedDrug} />
        )}
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
