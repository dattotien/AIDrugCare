import {
  Button,
  Dropdown,
  Table,
  Input,
  Modal,
  Pagination,
  message,
  Typography,
  Spin,
  Badge,
} from "antd";
import { useEffect, useState } from "react";
import { MoreOutlined, FilterOutlined } from "@ant-design/icons";
import axios from "axios";
import type { ColumnsType } from "antd/es/table";
import type { Drug } from "./drug.types.ts";

import DrugInfor from "./DrugInfor.tsx";
import backPic from "../../assets/Group 68.png";
import styles from "./DrugListScene.module.css";

const { Text } = Typography;

export default function DrugListScene() {
  //const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
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

  // Search
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
        <div
          style={{
            color: "#043bb3",
            fontWeight: "bold",
            textAlign: "center",
            whiteSpace: "nowrap",
            padding: "1px 1px",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.backgroundColor = "#043bb3";
            (e.currentTarget as HTMLElement).style.color = "white";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.backgroundColor = "white";
            (e.currentTarget as HTMLElement).style.color = "#000000";
          }}
          onClick={() => handleMore(record)}
        >
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
      width: 100,
      render: (text) => renderEllipsis(text, 100),
    },
    {
      title: "Tên thuốc",
      dataIndex: "generic_name",
      key: "generic_name",
      width: 200,
      render: (text) => renderEllipsis(text, 200),
    },
    {
      title: "Mô tả",
      dataIndex: "description",
      key: "description",
      width: 500,
      render: (text) => renderEllipsis(text, 500),
    },
    {
      title: "",
      key: "actions",
      width: 80,
      fixed: "right",
      render: (_, record) => (
        <Dropdown menu={{ items: menuItems(record) }} trigger={["click"]}>
          <MoreOutlined style={{ fontSize: 16, cursor: "pointer" }} />
        </Dropdown>
      ),
    },
  ];

  const pageSize = 8;
  const paginatedData = filteredList.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <div>
<<<<<<< Updated upstream
      <div
        style={{
          width: "75vw",
          height: "70vh",
          backgroundColor: "transparent",
          display: "flex",
          flexDirection: "column",
          borderRadius: 10,
          backgroundImage: `url(${backPic})`,
          backgroundSize: "cover",
          marginTop: "4vh",
          marginLeft : "3vw",
          backgroundPosition: "center",
          padding: "1vw",
        }}
=======
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
        columns={columns}
        dataSource={paginatedData}
        loading={loading}
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
>>>>>>> Stashed changes
      >
        <div className={styles["flex-title"]}>
          <span>Tất cả</span>
          <div className={styles["doctor-circle-badge"]}>
            {drugList.length}
          </div>
        </div>

        {/* Table */}
        <div style={{ flex: 1, width: "100%" }}>
          <Table
            size="small"
            style={{ overflow: "hidden" }}
            rowKey="_id"
            columns={columns}
            dataSource={paginatedData}
            loading={loading}
            tableLayout="fixed"   
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

                <div
                  style={{
                    flex: 1,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Pagination
                    current={currentPage}
                    pageSize={pageSize}
                    total={filteredList.length}
                    onChange={(page) => setCurrentPage(page)}
                    showSizeChanger={false}
                  />
                </div>

                <div
                  className={styles["custom-search"]}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    width: "250px",
                    borderColor: "#737373",
                    borderRadius: "20px",
                  }}
                >
                  <Input.Search
                    placeholder="Tìm thuốc tại đây"
                    style={{ width: 250 }}
                    allowClear
                    onSearch={handleSearch}
                    onPressEnter={(e) =>
                      handleSearch(e.currentTarget.value)
                    }
                  />
                </div>
              </div>
            )}
          />
        </div>
      </div>

      {/* Action Bar */}
      {showActionBar && (
<<<<<<< Updated upstream
<<<<<<< Updated upstream
        <div className={styles["doctor-fixed-footer"]}>
          <div className={styles["circle-badge"]}>{selectedRowKeys.length}</div>
          <span style={{ marginLeft: "8px" }}>
            {selectedRowKeys.length > 1 ? "items selected" : "item selected"}
          </span>
          <Button
            disabled
            className={styles["btn"]}
            type="link"
            style={{
              width: "4vw",
              height: "4vh",
              fontSize: "12px",
              color: "#ffffff",
              backgroundColor: "#737373",
              borderRadius: "20px",
              marginLeft: 30,
            }}
          >
=======
=======
>>>>>>> Stashed changes
        <div className="action-bar">
          <Button type="link" className="action-btn">
>>>>>>> Stashed changes
            Print
          </Button>
          <Button
            disabled
            className={styles["btn"]}
            type="link"
            style={{
              width: "4vw",
              height: "4vh",
              fontSize: "12px",
              color: "#ffffff",
              backgroundColor: "#d12326",
              borderRadius: "20px",
              marginRight: 5,
            }}
          >
            Send
          </Button>
          <Button
            className={styles["btn"]}
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
              setShowActionBar(false);
            }}
          >
            X
          </Button>
        </div>
      )}

      {/* Modal chi tiết */}
      {showDrugInfoModal && selectedDrug && (
        <Modal
          open={showDrugInfoModal}
          centered
          width={"90%"}
          onCancel={() => setShowDrugInfoModal(false)}
          footer={null}
        >
          <div
            style={{
              height: "500px",
              overflowY: "auto",
            }}
          >
            {loadingDetail ? <Spin /> : <DrugInfor drug={selectedDrug} />}
          </div>
        </Modal>
      )}
    </div>
  );
}
