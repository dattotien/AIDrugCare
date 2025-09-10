import styles from "./DoctorDashboard.module.css";
import blueLogo from "../../assets/blue.png"; // icon nam
import redLogo from "../../assets/red.png"; // icon nữ
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface Patient {
  id: number;
  name: string;
  gender: string;
  symptoms: string;
  status: string;
}
interface DoctorWaitingListProps {
  onSelectPatient: (patient: any) => void;
  onSeeAll: () => void; 
}
export default function DoctorWaitingList({ onSelectPatient, onSeeAll }: DoctorWaitingListProps) {
  const [patients, setPatients] = useState<Patient[]>([]);
  const navigate = useNavigate();
  const storedDoctorId = localStorage.getItem("doctorId");
  const doctorId = storedDoctorId ? Number(storedDoctorId) : null;
  useEffect(() => {
    const fetchWaitingList = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8000/waiting-patients/${doctorId}`
        );
        setPatients(Array.isArray(res.data.data) ? res.data.data : []);
      } catch (err: any) {
        console.error(
          "Error fetching waiting list:",
          err.response?.data || err.message
        );
      }
    };

    if (doctorId !== null && !isNaN(doctorId)) {
      fetchWaitingList();
    } else {
      console.warn("doctorId không hợp lệ:", doctorId);
    }
  }, [doctorId]);

  return (
    <div className={styles.container}>
      {/* Header */}
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          marginBottom: "0px",
        }}
      >
        <p
          style={{
            fontSize: "14px",
            color: "#043bb3",
            fontWeight: "bold",
            margin: 0,
          }}
        >
          DANH SÁCH CHƯA KHÁM
        </p>
        <p
          style={{
            fontSize: "12px",
            color: "#fff",
            margin: 0,
            cursor: "pointer",
          }}
          onClick={onSeeAll}
        >
          Xem tất cả
        </p>
      </div>
      {patients.length === 0 ? (
        <p style={{ fontSize: "12px", color: "#999" }}>
          Không có bệnh nhân nào
        </p>
      ) : (
        patients.slice(0, 3).map((p) => (
          <div key={p.id} className={styles.row}
            onClick={() => onSelectPatient(p)}   // 👈 gọi callback
            style={{ cursor: "pointer" }}>
            <span>
              <img
                src={p.gender === "Nam" ? blueLogo : redLogo}
                alt={p.gender}
              />
            </span>
            <span style={{ fontWeight: "bold" }}>{p.name}</span>
            <span>{p.gender}</span>
            <span>{p.symptoms}</span>
            <span className={styles.waiting}>{p.status}</span>
          </div>
        ))
      )}
    </div>
  );
}
