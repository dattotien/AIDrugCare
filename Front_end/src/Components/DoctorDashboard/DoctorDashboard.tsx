import DoctorCardCount from "./DoctorCardCount";
import DoctorEventListCard from "./DoctorEventListCard";
import DoctorNews from "./DoctorNews";
import DoctorWaitingList from "./DoctorWaitingList";
import DoctorSchedule from "./DoctorSchedule";
import DoctorDoneList from "../DoctorDoneList/DoctorDoneList";

import styles from "./DoctorDashboard.module.css";

export default function DoctorDashboard() {
  return (
    <div className={styles.dashboard}>
      <div className={styles.leftPanel}>
        <DoctorCardCount />
        <DoctorWaitingList />
        <DoctorNews />
      </div>

      <div className={styles.rightPanel}>
        <DoctorSchedule />
        <DoctorDoneList />

        <div className={styles.eventHeader}>
          <p className={styles.eventTitle}>Sự kiện</p>
          <p className={styles.eventSeeAll}>Xem tất cả</p>
        </div>

        <DoctorEventListCard highlight="#043bb3" />
        <DoctorEventListCard highlight="#d12362" />
      </div>
    </div>
  );
}
