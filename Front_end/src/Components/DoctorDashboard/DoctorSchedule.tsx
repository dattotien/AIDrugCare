import eventLogo from "../../assets/event.png";
import styles from "./DoctorDashboard.module.css";
export default function DoctorSchedule() {
  return (
    <div
      style={{
        width: "100%",
        height: "20%",
        backgroundColor: "transparent",
        display: "flex",
        flexDirection: "column",
        justifyItems: "center",
        borderRadius: "10px",
      }}
    >
      <div style={{ margin: 0, display: "flex", flexDirection: "row" }}>
        <p
          style={{
            color: "black",
            fontSize: "12px",
            fontWeight: "bold",
            marginLeft: 20,
          }}
        >
          Lịch trình
        </p>
        <p
          style={{
            color: "black",
            fontSize: "12px",
            fontWeight: "bold",
            marginLeft: 120,
          }}
        >
          Tháng 09 năm 2025
        </p>
        <img
          src={eventLogo}
          alt="event"
          style={{ width: 15, height: 15, marginTop: 15, marginLeft: 5 }}
        ></img>
      </div>

      <div style={{ marginLeft: 11, paddingBottom: 5 }}>
        <div className={styles.calendar_weekdays}>
          <div>Mon</div>
          <div>Tue</div>
          <div>Wed</div>
          <div>Thu</div>
          <div className={styles.day_name}>Fri</div>
          <div>Sat</div>
          <div>Sun</div>
        </div>
        <div className={styles.calendar_days}>
          <div>08</div>
          <div>09</div>
          <div>10</div>
          <div>11</div>
          <div className={styles.active}>12</div>
          <div>13</div>
          <div>14</div>
        </div>
      </div>
    </div>
  );
}
