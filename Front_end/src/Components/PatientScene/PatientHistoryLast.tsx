import PatientCardHis from "./PatientCardHistory";

interface Props {
  visits: any[];
}

export default function PatientHistoryMost({ visits }: Props) {
  return (
    <div
      style={{
        width: "775px",
        height: "385px",
        backgroundColor: "rgba(255,255,255,0.7)",
        borderRadius: "20px",
        marginTop: "30px",
        display: "flex",
        flexDirection: "column",
        boxSizing: "border-box",
      }}
    >
      <p
        style={{
          fontSize: "20px",
          fontWeight: "bold",
          color: "#043bb3",
          margin: 0,
          marginLeft: "25px",
          marginTop: "12px",
        }}
      >
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
