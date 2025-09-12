import waitLogo from "../../assets/waiting.png";
import timeLogo from "../../assets/time-left.png";
import eventLogo from "../../assets/event.png";
import dayjs from "dayjs";
import "./PatientScene.css";

interface CountProps {
  total?: any; 
  last?: any;
  next?: any;
}

export default function PatientCardCount({ total, last, next }: CountProps) {
  return (
    <div className="patient-card-count-container">
      {/* Tổng số lần khám */}
      <div className="patient-card-count-box">
        <div className="patient-card-count-icon">
          <img src={waitLogo} alt="wait" className="patient-card-count-img" />
        </div>
        <div className="patient-card-count-text">
          <p className="patient-card-count-value">{total}</p>
          <p className="patient-card-count-label">Tổng số lần khám</p>
        </div>
      </div>

      {/* Lần khám gần nhất */}
      <div className="patient-card-count-box">
        <div className="patient-card-count-icon">
          <img src={timeLogo} alt="time" className="patient-card-count-img" />
        </div>
        <div className="patient-card-count-text">
          <p className="patient-card-count-value">
            {dayjs(last).format("YYYY/MM/DD")}
          </p>
          <p className="patient-card-count-label">Lần khám gần nhất</p>
        </div>
      </div>

      {/* Lần khám tiếp theo */}
      <div className="patient-card-count-box">
        <div className="patient-card-count-icon">
          <img src={eventLogo} alt="event" className="patient-card-count-img" />
        </div>
        <div className="patient-card-count-text">
          <p className="patient-card-count-value">
            {dayjs(next).format("YYYY/MM/DD")}
          </p>
          <p className="patient-card-count-label">Lần khám tiếp theo</p>
        </div>
      </div>
    </div>
  );
}
