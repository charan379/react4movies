import styles from "../TitleActions.module.css";
import React, { useState } from "react";
import { usePathname } from "next/navigation";
import { deleteTitle } from "@/lib/api/moviebunkers/methods/deleteTitle";
import { useRouter } from "next/navigation";
// font awesome library
import { faCircleNotch, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Delete = ({
  toast,
  className = styles.actionButton,
  buttonText,
  loadingText,
  tooltipText,
  titleId,
  auth,
  setAsUpdated,
}) => {
  const pathname = usePathname(); // retrieve current location from next Router
  // next router
  const router = useRouter();
  //   state variable
  const [isLoading, setIsLoading] = useState(false); // state for loading indicator

  const handleDeleteTitle = async (event, titleId) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      // make API request to delete title
      const data = await deleteTitle({ mbdbTitleId: titleId, auth: auth });
      const message = data?.message ?? "Title deleted successfully";
      toast.success(message, {
        autoClose: 1000,
        position: "top-left",
        closeButton: true,
      });

      if (typeof setAsUpdated === "function") {
        setAsUpdated();
      }

      // wait for 1 second before closing window or modal
      setTimeout(() => {
        if (!/\/titles\/(tmdb|mbdb|imdb)\/?$/.test(pathname)) {
          router.back(); // go back if we're in title page
        } else {
          const closeBtn = document.getElementById("title-modal-close-btn");
          const clickEvent = new MouseEvent("click", { bubbles: true });
          closeBtn.dispatchEvent(clickEvent); // click the close button if we're in a modal
        }
      }, 1000);
    } catch (error) {
      const errMsg = error?.message ?? "Something went wrong";
      toast.error(errMsg, {
        autoClose: 2000,
        position: "top-right",
        closeButton: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      className={className}
      onClick={(event) =>
        handleDeleteTitle(
          event,
          btoa(titleId)
            .replace(/=/g, "")
            .replace(/\+/g, "-")
            .replace(/\//g, "_")
        )
      }
      data-tooltip={tooltipText}
      data-flow={`up`}
    >
      {isLoading ? (
        <span>
          <FontAwesomeIcon icon={faCircleNotch} size="lg" pulse />
          {loadingText}
        </span>
      ) : (
        <span>
          <FontAwesomeIcon icon={faTrashAlt} size="lg" />
          {buttonText}
        </span>
      )}
    </button>
  );
};

export default Delete;
