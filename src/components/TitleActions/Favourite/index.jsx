import styles from "../TitleActions.module.css";
import React, { useState } from "react";
import { addToFavouriteTitles } from "@/lib/api/moviebunkers/methods/addToFavouriteTitles";
import { removeFromFavouriteTitles } from "@/lib/api/moviebunkers/methods/removeFromFavouriteTitles";
// font awesome library
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
library.add(fas, far, fab);

const Favourite = ({
  toast,
  className = styles.actionButton,
  titleId = null,
  favouriteByUser = false,
  auth,
  setAsUpdated,
}) => {
  const [isFavourite, setFavourite] = useState(favouriteByUser);

  const [isLoading, setIsLoading] = useState(false);

  // Add the current title to the user's favourite titles
  const handleAddToFavourites = async (event, base64TitleId) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      await addToFavouriteTitles({ mbdbTitleId: base64TitleId, auth: auth });
      setFavourite(true);
      setAsUpdated();
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

  // Remove the current title from the user's favourite titles
  const handleRemoveFromFavourites = async (event, base64TitleId) => {
    event.preventDefault();
    try {
      await removeFromFavouriteTitles({
        mbdbTitleId: base64TitleId,
        auth: auth,
      });
      setFavourite(false);
      setAsUpdated();
    } catch (error) {
      const errMsg = error?.message;
      toast.error(errMsg ?? "Something went wrong", {
        autoClose: 2000,
        position: "top-right",
        closeButton: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {isFavourite && (
        <button
          className={className}
          onClick={(event) =>
            handleRemoveFromFavourites(
              event,
              btoa(titleId)
                .replace(/=/g, "")
                .replace(/\+/g, "-")
                .replace(/\//g, "_")
            )
          }
          data-tooltip={`Remove from favourite's`}
          data-flow="up"
        >
          {isLoading ? (
            <span>
              <FontAwesomeIcon icon={["fas", "circle-notch"]} size="lg" pulse />
            </span>
          ) : (
            <span style={{ color: "rgba(255, 20, 70, 1)" }}>
              <FontAwesomeIcon icon={["fas", "heart"]} size="lg" />
            </span>
          )}
        </button>
      )}

      {!isFavourite && (
        <button
          className={className}
          onClick={(event) =>
            handleAddToFavourites(
              event,
              btoa(titleId)
                .replace(/=/g, "")
                .replace(/\+/g, "-")
                .replace(/\//g, "_")
            )
          }
          data-tooltip={`Mark as favourite`}
          data-flow="up"
        >
          <span>
            {isLoading ? (
              <FontAwesomeIcon icon={["fas", "circle-notch"]} size="lg" pulse />
            ) : (
              <FontAwesomeIcon icon={["far", "heart"]} size="lg" />
            )}
          </span>
        </button>
      )}
    </>
  );
};

export default Favourite;
