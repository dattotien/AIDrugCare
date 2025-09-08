import PatientCardHis from "./PatientCardHistory";
import "./PatientScene.css";

interface Props {
  visits: any[];
}

export default function PatientHistoryMost({ visits }: Props) {
  return (
    <div className="patient-his-container">
      <p className = "patient-his-title">
        Lịch sử khám bệnh gần nhất
      </p>

      <div style={{ marginLeft: "10px", marginTop: "3px" }}>
        {visits.length > 0 ? (
          visits.map((visit, idx) => (
            <PatientCardHis
              key={visit.id || idx}
              highlight={idx % 2 === 0 ? "#043bb3" : "#d12316"} 
              visit={visit}
            />
          ))
        ) : (
          <p style={{ marginLeft: "20px", color: "gray" }}>
            Chưa có dữ liệu khám bệnh.
          </p>
        )}
      </div>
    </div>
  );
}
