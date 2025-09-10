// DrugInfor.tsx
import { Tabs, Card, Table, Alert, Tag, Typography } from "antd";
import avatarDrug from "../../assets/drugs_blue.png";
import "./DrugInfor.css";
import type { Drug } from "./drug.types.ts";

const { Text } = Typography;

interface DrugInforProps {
  drug: Drug;
}

export default function DrugInfor({ drug }: DrugInforProps) {
  const items = [
    {
      key: "1",
      label: "Thông tin chi tiết",
      children: (
        <div>
          {/* Mô tả chi tiết */}
          <Card
            title={<span className="card-title">Mô tả chi tiết</span>}
            bordered={false}
            headStyle={{ borderBottom: "2px solid #cbcfd4ff" }}
            className="desc-card"
          >
            <p>{drug.description || "Không có mô tả"}</p>
          </Card>

          {/* Công thức */}
          <Card
            title={<span className="card-title">Công thức</span>}
            bordered={false}
            headStyle={{ borderBottom: "2px solid #cbcfd4ff" }}
            className="desc-card"
          >
            <p>
              <b>Công thức hoá học:</b>{" "}
              {drug.chemical_formula || "Không có dữ liệu"}
            </p>
            <p>
              <b>Công thức phân tử:</b>{" "}
              {drug.molecular_formula || "Không có dữ liệu"}
            </p>
          </Card>

          {/* Nhà sản xuất */}
          <Card
            title={<span className="card-title">Nhà sản xuất</span>}
            bordered={false}
            headStyle={{ borderBottom: "2px solid #cbcfd4ff" }}
            className="desc-card"
          >
            {drug.manufacturers && drug.manufacturers.length > 0
              ? drug.manufacturers.join(", ")
              : "Không có dữ liệu"}
          </Card>

          {/* Thông tin sản phẩm */}
          <div className="product-info-container">
            {drug.brand_names && drug.brand_names.length > 0 ? (
              drug.brand_names.map((b, idx) => (
                <Card
                  key={idx}
                  title={<span className="card-title">Thông tin sản phẩm</span>}
                  bordered
                  headStyle={{ borderBottom: "2px solid #c0cde0ff" }}
                  className="product-card"
                >
                  <p>
                    <b>Tên thị trường:</b> {b.name || "-"}
                  </p>
                  <p>
                    <b>Đường dùng:</b> {b.route || "-"}
                  </p>
                  <p>
                    <b>Hàm lượng:</b> {b.strength || "-"}
                  </p>
                  <p>
                    <b>Dạng bào chế:</b> {b.dosage_form || "-"}
                  </p>
                  <p>
                    <b>Xuất xứ:</b> {b.country || "-"}
                  </p>
                </Card>
              ))
            ) : (
              <p>Không có thông tin sản phẩm</p>
            )}
          </div>
        </div>
      ),
    },
    {
      key: "2",
      label: "Phân loại",
      children: (
        <Card
          title={<span className="card-title">Phân loại nhóm dược lý - dược lực học</span>}
          bordered={false}
          headStyle={{ borderBottom: "2px solid #cbcfd4ff" }}
          className="desc-card"
        >
          <p>
            {drug.categories && drug.categories.length > 0 ? (
              drug.categories.map((cat, idx) => <div key={idx}>{cat}</div>)
            ) : (
              "Chưa có dữ liệu"
            )}
          </p>
        </Card>
      ),
    },
    {
    key: "3",
    label: "Cảnh báo",
    children: (
      <div>
        <Alert
          type="error"
          message={`⚠ ${drug.generic_name} có thể gây tương tác với một số loại thuốc khác. Vui lòng kiểm tra kỹ trước khi kê đơn để đảm bảo sức khỏe cho bệnh nhân.`}
          className="alert-box"
        />
        <div className="interaction-table-wrapper">
          <Table
            bordered
            pagination={false}
            dataSource={(() => {
              console.log("🔎 Drug Interaction Data:", drug.drug_interaction);
              return drug.drug_interaction || [];
            })()}
            rowKey={(row) => row.drugbank_id || row.name || Math.random().toString()}
            columns={[
              {
                title: <span className="table-header">ID</span>,
                dataIndex: "drugbank_id",
                width: "15%",
              },
              {
                title: <span className="table-header">Tên thuốc</span>,
                dataIndex: "name",
                width: "25%",
              },
              {
                title: <span className="table-header">Loại tương tác</span>,
                dataIndex: "description",
                width: "60%",
                render: (text: string) => text || "-",
              },
            ]}
            scroll={{ y: 210 }}
          />
        </div>
      </div>
    ),
  },
  ];

  return (
    <div className="drug-infor-wrapper">
      {/* Header xanh */}
      <div className="drug-header">
        <div className="avatar-wrapper">
          <img src={avatarDrug} alt="Drug Avatar" className="drug-avatar" />
        </div>

        <div className="drug-info">
          <h2>{drug.generic_name}</h2>
          <p className="drug-codes">
            {drug.atc_code && drug.atc_code.length > 0 ? (
              <Text ellipsis={{ tooltip: drug.atc_code.join(", ") }} className="white-text">
                {drug.atc_code.join(", ")}
              </Text>
            ) : (
              "-"
            )}{" "}
            -{" "}
            <span className="white-text">
              {Array.isArray(drug.synonyms)
                ? drug.synonyms.join("/ ")
                : drug.synonyms || ""}
            </span>
          </p>
          <div className="drug-tags">
            {drug.dosage_forms?.slice(0, 3).map((form, i) => (
              <Tag key={i} color="blue">
                {form}
              </Tag>
            ))}
          </div>
        </div>

        <div>
          <Tag className="drug-id">ID: {drug._id}</Tag>
        </div>
      </div>

      <div className="tab-container">
        <Tabs
          key={drug._id}        
          defaultActiveKey="1"  
          items={items}
        />
      </div>
    </div>
  );
}
