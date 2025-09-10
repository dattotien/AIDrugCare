import React, { useEffect, useState } from "react";
import waitLogo from "../../assets/waiting.png";
import timeLogo from "../../assets/time-left.png";
import eventLogo from "../../assets/event.png";
import styles from "./DoctorDashboard.module.css";
import axios from "axios";

export default function DoctorCardCount() {
  const [visitedCount, setVisitedCount] = useState<number>(0);
  const [notVisitedCount, setNotVisitedCount] = useState<number>(0);
  const storedDoctorId = localStorage.getItem("doctorId");
  const doctorId = storedDoctorId ? Number(storedDoctorId) : null;

  useEffect(() => {
    const fetchVisitedCount = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8000/visited-count-today/${doctorId}`
        );
        setVisitedCount(Number(res.data.data));
      } catch (err: any) {
        console.error(
          "Error fetching visited count:",
          err.response?.data || err.message
        );
      }
    };

    if (doctorId) {
      fetchVisitedCount();
    }
  }, [doctorId]);

  useEffect(() => {
    const fetchNotVisitedCount = async () => {
      try {
        const res = await axios.get("http://localhost:8000/waiting-count");
        setNotVisitedCount(Number(res.data.data));
      } catch (err: any) {
        console.error(
          "Error fetching not visited count:",
          err.response?.data || err.message
        );
      }
    };
    fetchNotVisitedCount();
  }, []);

  return (
    <div className={styles.cardContain}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          width: "60%",
        }}
      >
        <div className={styles.card1}>
          <div className={styles.circle}>
            <img
              src={waitLogo}
              style={{
                width: "22px",
                height: "22px",
              }}
            />
          </div>
          <div>
            <p className={styles.cardHeader}>{notVisitedCount || "No data"}</p>
            <p className={styles.cardText}>Tổng số chưa khám</p>
          </div>
        </div>

        <div className={styles.card1}>
          <div className={styles.circle}>
            <img
              src={timeLogo}
              alt="time"
              style={{
                width: "22px",
                height: "22px",
              }}
            />
          </div>
          <div>
            <p className={styles.cardHeader}>{visitedCount}</p>
            <p className={styles.cardText}>Tổng số đã khám</p>
          </div>
        </div>
      </div>
      <div className={styles.cardSmall}>
        <div className={styles.circleSmall}>
          <p
            style={{
              fontSize: "45px",
              fontWeight: "bold",
              color: "#737373",
              margin: 0,
            }}
          >
            +
          </p>
        </div>
        <div>
          <p className={styles.cardText}>Tạo thêm</p>
        </div>
      </div>
    </div>
  );
}
