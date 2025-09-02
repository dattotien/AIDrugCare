import PatientCardHis from "./PatientCardHistory";

export default function () {
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
          marginLeft : "25px",
          marginTop: "12px"
        }}
      >
        Lịch sử khám bệnh gần nhất
      </p>
      <div style = {{marginLeft: "10px", marginTop: "3px"}}>
        <PatientCardHis highlight="#043bb3"/>
        <PatientCardHis highlight="#d12316"/>
        <PatientCardHis highlight="#043bb3"/>
      </div>
    </div>
  );
}
