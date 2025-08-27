import { Table } from "antd";
import { useState, useEffect } from "react";
import axios from "axios";

export default function DrugListScene() {
  const [drugList, setDrugList] = useState<any[]>([]);
  const columns = [
    {
      title: "ID",
      dataIndex: "_id",
      key: "_id",
    },
    {
      title: "Tên biệt dược",
      dataIndex: "generic_name",
      key: "generic_name",
    },
    {
      title: "Mô tả",
      dataIndex: "description",
      key: "description",
      ellipsis: true,
      width: 400,
    },
  ];
  useEffect(() => {
    axios.get("http://localhost:8000/drugs").then((response) => {
      setDrugList(response.data.data || []);
    });
  }, []);

  return (
    <>
      <div>DrugListScene</div>
      <Table
        dataSource={drugList.map((item, idx) => ({
          ...item,
          key: item._id || idx,
        }))}
        columns={columns}
        pagination={{ pageSize: 10 }}
        scroll={{ x: 800 }}
      />
    </>
  );
}
