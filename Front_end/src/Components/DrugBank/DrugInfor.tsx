import { Tabs, Card, Table, Alert, Tag } from "antd";
import avatarDrug from "../../assets/drugs_blue.png";
import "./DrugInfor.css";

interface DrugInforProps {
  drug: any;
}

export default function DrugInfor({ drug }: DrugInforProps) {
  const items = [
    {
      key: "1",
      label: "Thông tin chi tiết",
      children: (
        <div>
          <Card
            title={<span className="card-title">Mô tả chi tiết :</span>}
            bordered={false}
            className="desc-card"
          >
            <p>
              A recombinant DNA-derived cytotoxic protein composed of the amino
              acid sequences for diphtheria toxin fragments A and B
              (Met1-Thr387)-His followed by the sequences for interleukin-2
              (IL-2; Ala 1-Thr 133). It is produced in an E. coli expression
              system.
            </p>
          </Card>

          <div className="product-info-container">
            {[1, 2, 3].map((idx) => (
              <Card
                key={idx}
                title={<span className="card-title">Thông tin sản phẩm</span>}
                bordered
                headStyle={{ borderBottom: "2px solid #c0cde0ff" }}
                className="product-card"
              >
                <p>
                  <b>Tên thương mại:</b> Ontak
                </p>
                <p>
                  <b>Đường dùng:</b> Tiêm tĩnh mạch
                </p>
                <p>
                  <b>Hàm lượng:</b> {idx === 3 ? "110" : "150"} mg/ml
                </p>
                <p>
                  <b>Dạng bào chế:</b> Dung dịch tiêm
                </p>
                <p>
                  <b>Xuất xứ:</b> {idx === 2 ? "Trung Quốc" : idx === 3 ? "Anh Quốc" : "US"}
                </p>
              </Card>
            ))}
          </div>
        </div>
      ),
    },
    {
      key: "2",
      label: "Phân loại",
      children: (
        <Card bordered={false}>
          <span className="card-title">
            Phân loại nhóm dược lý - dược lực học:
          </span>
          <p>
            Esterase (enzym thuỷ phân este), Enzym, Chế phẩm trị ho và cảm lạnh,
            Hydrolase (enzym thuỷ phân), Deoxyribonuclease (enzym cắt DNA), …
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
            message="⚠ Denileukin diftitox có tác động dược lý với một số loại thuốc khác. Yêu cầu kiểm tra tương tác thuốc trước khi kê đơn."
            className="alert-box"
          />
          <Table
            bordered
            pagination={false}
            dataSource={[
              {
                id: "DB100023",
                name: "Aspirin",
                interaction: "Tạo kích thích đường ruột",
              },
              {
                id: "DB100023",
                name: "Aspirin",
                interaction: "Tạo kích thích đường ruột",
              },
              {
                id: "DB100023",
                name: "Aspirin",
                interaction: "Tạo kích thích đường ruột",
              },
            ]}
            columns={[
              {
                title: <span className="table-header">ID</span>,
                dataIndex: "id",
              },
              {
                title: <span className="table-header">Tên thuốc</span>,
                dataIndex: "name",
              },
              {
                title: <span className="table-header">Loại tương tác</span>,
                dataIndex: "interaction",
              },
            ]}
          />
        </div>
      ),
    },
  ];

  return (
    <div className="drug-infor-wrapper">
      {/* Header xanh */}
      <div className="drug-header">
        {/* Avatar thuốc */}
        <div className="avatar-wrapper">
          <img
            src={avatarDrug}
            alt="Drug Avatar"
            className="drug-avatar"
          />
        </div>

        <div className="drug-info">
          <h2>{drug.generic_name}</h2>
          <p>
            {drug.atc_code} - {drug.synonyms}
          </p>
          <div className="drug-tags">
            <Tag color="blue">Viên nén</Tag>
            <Tag color="blue">Dung dịch</Tag>
            <Tag color="blue">Nghiền bột</Tag>
          </div>
        </div>

        <div>
          <Tag className="drug-id">
            ID: {drug._id}
          </Tag>
        </div>
      </div>

      {/* Nội dung Tabs */}
      <div className="tab-container">
        <Tabs defaultActiveKey="1" items={items} />
      </div>
    </div>
  );
}
