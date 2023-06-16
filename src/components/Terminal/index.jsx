import styles from "./Terminal.module.css";
import React from "react";

const Terminal = ({ logs, title }) => {
  const reversedLogs = [...logs].reverse(); // create a reversed copy of the logs array

  return (
    <div className={styles.terminal}>
      <div className={styles.terminalHeader}>
        <span className={styles.terminalTitle}>{title}</span>
      </div>
      <div className={styles.terminalBody}>
        {reversedLogs?.map((log, index) => {
          return (
            <p key={`${index}`} className={styles.terminalLine}>
              {log?.name && `${log.name}`}
              {log?.status && ` - ${log.status}`}
              {log?.error && ` : ${log.error}`}
            </p>
          );
        })}
      </div>
    </div>
  );
};

export default Terminal;
