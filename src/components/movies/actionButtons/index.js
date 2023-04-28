import React from "react";
import { Link } from "react-router-dom";
import { LevelOne, LevelThere, LevelTwo } from "../../../constants/AuthRoles";
import useAuth from "../../../hooks/useAuth";
import useTheme from "../../../hooks/useTheme";
import useTitle from "../../../hooks/useTitle";
import useToastify from "../../../hooks/useToast";
import AddTitle from "./moderatorActions/AddTitle";
import DeleteTitle from "./moderatorActions/DeleteTitle";
import EditTitle from "./moderatorActions/EditTitle";
import UpdateTitle from "./moderatorActions/UpdateTitle";
import Favourite from "./userActions/Favourite";
import Seen from "./userActions/Seen";
import Star from "./userActions/Star";

const MovieActions = () => {
  const { ToastContainer, toastContainerOptions, toast } = useToastify();

  const { auth } = useAuth();

  const { title } = useTitle();

  const { theme } = useTheme();

  return (
    <div className={`movie-actions ${theme}`}>
      <div className="user-related">
        {title?.state === "moviebunkers" && (
          <>
            <Star toast={toast} />
            <Seen toast={toast} />
            <Favourite toast={toast} />
          </>
        )}
      </div>

      {LevelOne.includes(auth?.role) && (
        <div className="moderator-related">
          <Link
            className="action-button"
            to={`/downloads/torrent-search?query=${encodeURI(
              title?.title + " " + title?.year
            )}&provider=${"1337x"}&pageNo=1`}
          >
            <span>
              <i class="fas fa-download fa-lg"></i>
              Download
            </span>
          </Link>
        </div>
      )}

      {LevelTwo.includes(auth?.role) && (
        <div className="moderator-related">
          {title?.state === "moviebunkers" && (
            <>
              <EditTitle toast={toast} />
              <UpdateTitle toast={toast} />
              {LevelThere.includes(auth?.role) && <DeleteTitle toast={toast} />}
            </>
          )}
          {title?.state === "tmdb" && (
            <>
              <AddTitle toast={toast} />
            </>
          )}
        </div>
      )}

      <ToastContainer {...toastContainerOptions} />
    </div>
  );
};

export default MovieActions;
