"use client";

import React from "react";
import styles from "./InfoCard.module.css";
// font awesome library
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
library.add(fas, far, fab);
//
import { useDisableBodyScrollOnModalOpen } from "@/lib/hooks/useDisableBodyScrollOnModalOpen";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

const InfoCard = ({ type, message, link, linkText, open, close }) => {
  // disable body scroll when modal is opened
  useDisableBodyScrollOnModalOpen(open);

  const handleClose = (event) => {
    event.preventDefault();
    close();
  };

  // If the `open` prop is false, don't render anything
  if (!open) return null;

  return (
    <div className={`modal-container`}>
      {/*  */}
      <div className={styles.infoCard}>
        {/* Close button */}
        {close && (
          <div className={styles.close}>
            <button
              data-tooltip={`Close`}
              data-flow="left"
              onClick={handleClose}
              id="title-modal-close-btn"
              className={styles.closeBtn}
              tabIndex="0"
            >
              <FontAwesomeIcon icon={["fas", "times"]} size="lg" />
            </button>
          </div>
        )}
        {/*  */}
        {type === "success" && <div className={styles.tickMark}></div>}
        {type === "error" && <div className={styles.xMark}></div>}
        {type === "info" && <div className={styles.infoMark}></div>}
        {/*  */}
        {message && <div className={styles.message}>{message}</div>}
        {/*  */}
        {link && linkText && (
          <Link className={styles.link} href={link ?? "/signup"}>
            {linkText ?? ""}
          </Link>
        )}
      </div>
    </div>
  );
};

export default InfoCard;
