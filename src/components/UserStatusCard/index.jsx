import styles from "./UserStatusCard.module.css";
import React from "react";

const UserStatusCard = (props = { status: "", userName: "" }) => {
  return (
    <div
      className={styles.userStatusCard}
      data-status={props?.status.toString().toLowerCase()}
    >
      <h2 className={styles.status}>{props.status}</h2>
      <h3 className={styles.username}>{props.userName}</h3>
    </div>
  );
};

export default UserStatusCard;
