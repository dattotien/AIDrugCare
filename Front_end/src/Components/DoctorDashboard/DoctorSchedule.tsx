import eventLogo from "../../assets/event.png";
import styles from "./DoctorDashboard.module.css";
export default function DoctorSchedule() {
  return (
    <div
      style={{
        width: "340px",
        height: "110px",
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
          Tháng 8 năm 2025
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
          <div className={styles.day_name}>Wed</div>
          <div>Thu</div>
          <div>Fri</div>
          <div>Sat</div>
          <div>Sun</div>
        </div>
        <div className={styles.calendar_days}>
          <div>18</div>
          <div>19</div>
          <div className={styles.active}>20</div>
          <div>21</div>
          <div>22</div>
          <div>23</div>
          <div>24</div>
        </div>
      </div>
    </div>
  );
}