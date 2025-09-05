import "./DoctorDashboard.css";
import blueLogo from "../../assets/blue.png"; // icon nam
import redLogo from "../../assets/red.png";   // icon nữ

export default function DoctorWaitingList() {
  const patients = [
    {
      id: 10002,
      name: "Nguyễn Xuân Nam",
      age: "25 tuổi",
      gender: "Nam",
      symptom: "Đau, quặn thắt ở bụng trái aaaaaaaaaaaaaa",
      status: "Waiting",
    },
    {
      id: 10003,
      name: "Nguyễn Thị Ngọc Yến",
      age: "20 tuổi",
      gender: "Nữ",
      symptom: "Quặn thắt ở bụng trái",
      status: "Waiting",
    },
    {
      id: 10004,
      name: "Nguyễn Phương Đông",
      age: "15 tuổi",
      gender: "Nam",
      symptom: "Đầy hơi, khó tiêu",
      status: "Waiting",
    },
  ];

  return (
    <div className="container">
      {/* Header */}
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          marginBottom: "0px",
          margin: 0

        }}
      >
        <p
          style={{
            fontSize: "14px",
            color: "#043bb3",
            fontWeight: "bold",
            margin: 0,
            marginBottom: -20
          }}
        >
          DANH SÁCH CHƯA KHÁM
        </p>
        <p
          style={{
            fontSize: "12px",
            color: "#fff",
            margin: 0,
          }}
        >
          Xem tất cả
        </p>
      </div>

      {patients.map((p) => (
        <div key={p.id} className="row">

          <span>
            <img
              src={p.gender === "Nam" ? blueLogo : redLogo}
              alt={p.gender}
              style={{ width: "22px", height: "22px" }}
            />
          </span>

          <span>{p.name}</span>
          <span>{p.age}</span>
          <span>{p.gender}</span>
          <span className="symptom">{p.symptom}</span>
          <span className="waiting">{p.status}</span>
        </div>
      ))}
    </div>
  );
}
