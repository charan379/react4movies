import './title-actions.style.css';
import React from "react";
import { Link } from "react-router-dom";
import { LevelOne, LevelThere, LevelTwo } from "constants/AuthRoles";
import { useTheme, useAuth, useTitle, useToastify } from "hooks";
import AddTitle from "./AddTitle";
import DeleteTitle from "./DeleteTitle";
import EditTitle from "./EditTitle";
import UpdateTitle from "./UpdateTitle";
import Favourite from "./Favourite";
import Seen from "./Seen";
import Star from "./Star";
import { PlayTrailer } from './PlayTrailer';

const TitleActions = () => {
  const { ToastContainer, toastContainerOptions, toast } = useToastify();

  const { auth } = useAuth();

  const { title } = useTitle();

  const { theme } = useTheme();

  return (
    <div className={`title-actions ${theme}`}>
      <div className="user-related">
        {title?.state === "moviebunkers" && (
          <>
            <Star
              toast={toast}
              titleId={title?._id}
              starredByUser={title?.starredByUser}
            />
            <Seen
              toast={toast}
              titleId={title?._id}
              seenByUser={title?.seenByUser}
              unseenByUser={title?.unseenByUser}
            />
            <Favourite
              toast={toast}
              titleId={title?._id}
              favouriteByUser={title?.favouriteByUser}
            />
          </>
        )}
        <PlayTrailer videos={title?.videos} />
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

export { TitleActions };
