import styles from "../TitleActions.module.css";
import React, { useState } from "react";
// font awesome library
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { addToStarredTitles } from "@/lib/api/moviebunkers/methods/addToStarredTitles";
import { removeFromStarredTitles } from "@/lib/api/moviebunkers/methods/removeFromStarredTitles";
library.add(fas, far, fab);

const Star = ({
  toast,
  className = styles.actionButton,
  titleId = null,
  starredByUser = false,
  auth,
  setAsUpdated,
}) => {
  const [isStarred, setStarred] = useState(starredByUser);

  // State to keep track of whether the button is in a loading state or not
  const [isLoading, setIsLoading] = useState(false);

  // Function to add a title to the user's starred titles
  const handleAddToStarred = async (event, base64TitleId) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      // Send a request to the API to add the title to the user's starred titles
      await addToStarredTitles({ mbdbTitleId: base64TitleId, auth: auth });
      // Update the state to reflect that the title is now starred by the user
      setStarred(true);
      setAsUpdated();
    } catch (error) {
      // If there was an error, display an error toast message
      const errMsg = error?.message;
      toast.error(errMsg ?? "Somthing went wrong", {
        autoClose: 2000,
        position: "top-right",
        closeButton: true,
      });
    } finally {
      // Set the loading state back to false
      setIsLoading(false);
    }
  };

  // Function to remove a title from the user's starred titles
  const handleRemoveFromStarred = async (event, base64TitleId) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      // Send a request to the API to remove the title from the user's starred titles
      await removeFromStarredTitles({ mbdbTitleId: base64TitleId, auth: auth });
      // Update the state to reflect that the title is no longer starred by the user
      setStarred(false);
      setAsUpdated();
    } catch (error) {
      // If there was an error, display an error toast message
      const errMsg = error?.response?.data?.error?.message;
      toast.error(errMsg ?? "Somthing went wrong", {
        autoClose: 2000,
        position: "top-right",
        closeButton: true,
      });
    } finally {
      // Set the loading state back to false
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* If the title is already starred by the user, display a button to remove it from their starred titles */}
      {isStarred && (
        <button
          className={className}
          onClick={(event) =>
            handleRemoveFromStarred(
              event,
              btoa(titleId)
                .replace(/=/g, "")
                .replace(/\+/g, "-")
                .replace(/\//g, "_")
            )
          }
          data-tooltip={`Remove from starred`}
          data-flow="up"
        >
          {/* Display a loading spinner if the button is in a loading state */}
          {isLoading ? (
            <span>
              <FontAwesomeIcon icon={["fas", "circle-notch"]} size="lg" pulse />
            </span>
          ) : (
            <span style={{ color: "rgb(255 149 0)" }}>
              <FontAwesomeIcon icon={["fas", "star"]} size="lg" />
            </span>
          )}
        </button>
      )}

      {/* Display a button to add this title to  starred titles */}
      {!isStarred && (
        <button
          className={className}
          onClick={(event) =>
            handleAddToStarred(
              event,
              btoa(titleId)
                .replace(/=/g, "")
                .replace(/\+/g, "-")
                .replace(/\//g, "_")
            )
          }
          data-tooltip={`Mark as starred`}
          data-flow="up"
        >
          <span>
            {/* Display a loading spinner if the button is in a loading state */}
            {isLoading ? (
              <FontAwesomeIcon icon={["fas", "circle-notch"]} size="lg" pulse />
            ) : (
              <FontAwesomeIcon icon={["far", "star"]} size="lg" />
            )}
          </span>
        </button>
      )}
    </>
  );
};

export default Star;
