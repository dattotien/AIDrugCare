import React from "react";
import styles from "./LocationCard.module.css";
type LocationCardProps = {
  picture: string;
  index: number;
  title: string;
  content: React.ReactNode;
};

const LocationCard: React.FC<LocationCardProps> = ({
  picture,
  index,
  title,
  content,
}) => {
  return (
    <div className={styles.location_card}>
      <img src={picture} alt={title} className={styles.card_img} />
      <div className={styles.card_info}>
        <div className={styles.card_badge}>{index}</div>
        <h3 className={styles.card_title}>{title}</h3>
        <p className={styles.card_content}>{content}</p>
      </div>
    </div>
  );
};

export default LocationCard;
