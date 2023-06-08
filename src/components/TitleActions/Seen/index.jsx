import styles from "../TitleActions.module.css";
import React, { useState } from "react";
import { addToSeenTitles } from "@/lib/api/moviebunkers/methods/addToSeenTitles";
import { addToUnSeenTitles } from "@/lib/api/moviebunkers/methods/addToUnSeenTitles";
// font awesome library
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
library.add(fas, far, fab);

const Seen = ({
  toast,
  className = styles.actionButton,
  titleId = null,
  seenByUser = false,
  unseenByUser = false,
  auth,
  setAsUpdated,
}) => {
  const [isSeen, setSeen] = useState(seenByUser);

  const [isUnseen, setUnseen] = useState(unseenByUser);

  const [isLoading, setIsLoading] = useState(false); // Loading state

  // Function to add title to seen list
  const handleAddToSeen = async (event, base64TitleId) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      await addToSeenTitles({ mbdbTitleId: base64TitleId, auth: auth });
      setSeen(true);
      setUnseen(false);
      if (typeof setAsUpdated === "function") {
        setAsUpdated();
      }
    } catch (error) {
      const errMsg = error?.message;
      toast.error(errMsg ?? "Something went wrong", {
        autoClose: 2000,
        position: "top-right",
        closeButton: true,
        delay: 50,
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Function to add title to unseen list
  const handleAddToUnseenTitles = async (event, base64TitleId) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      await addToUnSeenTitles({ mbdbTitleId: base64TitleId, auth: auth });
      setUnseen(true);
      setSeen(false);
      if (typeof setAsUpdated === "function") {
        setAsUpdated();
      }
    } catch (error) {
      const errMsg = error?.message;
      toast.error(errMsg ?? "Something went wrong", {
        autoClose: 2000,
        position: "top-right",
        closeButton: true,
        delay: 50,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Button to mark title as unseen if already updated as seen*/}
      {isSeen && (
        <button
          className={className}
          onClick={(event) =>
            handleAddToUnseenTitles(
              event,
              btoa(titleId)
                .replace(/=/g, "")
                .replace(/\+/g, "-")
                .replace(/\//g, "_")
            )
          }
          data-tooltip={`Mark as unseen`}
          data-flow="up"
        >
          <span /*style={{ color: 'rgba(16,125,172, 1)' }} */>
            {isLoading ? (
              <FontAwesomeIcon icon={["fas", "circle-notch"]} size="lg" pulse />
            ) : (
              <FontAwesomeIcon icon={["fas", "eye"]} size="lg" />
            )}
          </span>
        </button>
      )}

      {/* Button to mark title as seen if its already marked as unseen */}
      {isUnseen && (
        <button
          className={className}
          onClick={(event) =>
            handleAddToSeen(
              event,
              btoa(titleId)
                .replace(/=/g, "")
                .replace(/\+/g, "-")
                .replace(/\//g, "_")
            )
          }
          data-tooltip={`Mark as seen`}
          data-flow="up"
        >
          <span /*style={{ color: 'rgba(16,125,172, 1)' }} */>
            {isLoading ? (
              <FontAwesomeIcon icon={["fas", "circle-notch"]} size="lg" pulse />
            ) : (
              <FontAwesomeIcon icon={["fas", "eye-slash"]} size="lg" />
            )}
          </span>
        </button>
      )}

      {/* Button to mark title as unseen by default */}
      {!isUnseen && !isSeen && (
        <button
          className={className}
          onClick={(event) =>
            handleAddToUnseenTitles(
              event,
              btoa(titleId)
                .replace(/=/g, "")
                .replace(/\+/g, "-")
                .replace(/\//g, "_")
            )
          }
          data-tooltip={`Mark as unseen`}
          data-flow="up"
        >
          {isLoading ? (
            <span>
              <FontAwesomeIcon icon={["fas", "circle-notch"]} size="lg" pulse />
            </span>
          ) : (
            <span style={{ opacity: "0.3" }}>
              <FontAwesomeIcon icon={["fas", "eye"]} size="lg" />
            </span>
          )}
        </button>
      )}
    </>
  );
};

export default Seen;
