"use client";

import styles from "./TitleActions.module.css";
import { useToastify } from "@/lib/hooks/useToastify";
import React from "react";
import Star from "./Star";
import Seen from "./Seen";
import Favourite from "./Favourite";
import PlayTrailer from "./PlayTrailer";
import { LevelThere, LevelTwo } from "@/constants/AuthRoles";
import UpdateTitle from "./Update";
import AddTitle from "./Add";
import Delete from "./Delete";

const TitleActions = ({ database, title, user, auth }) => {
  const { ToastContainer, toastContainerOptions, toast } = useToastify();

  return (
    <div className={styles.titleActions}>
      <div className={styles.userRelated}>
        {database === "mbdb" && (
          <>
            <Star
              toast={toast}
              titleId={title?._id}
              starredByUser={title?.starredByUser}
              auth={auth}
            />
            <Seen
              toast={toast}
              titleId={title?._id}
              seenByUser={title?.seenByUser}
              unseenByUser={title?.unseenByUser}
              auth={auth}
            />
            <Favourite
              toast={toast}
              titleId={title?._id}
              favouriteByUser={title?.favouriteByUser}
              auth={auth}
            />
          </>
        )}
        <PlayTrailer videos={title?.videos} toolTipDir="up" />
      </div>

      {LevelTwo.includes(user?.role) && (
        <div className={styles.moderatorRelated}>
          {database === "mbdb" && (
            <>
              <UpdateTitle
                toast={toast}
                auth={auth}
                mbdbId={title?._id}
                titleType={title?.title_type}
                tmdbId={title.tmdb_id}
                updatedAt={title?.updatedAt}
              />

              {LevelThere.includes(user?.role) && (
                <Delete
                  toast={toast}
                  buttonText={`Delete`}
                  loadingText={`Deleting....`}
                  titleId={title?._id}
                  auth={auth}
                />
              )}
            </>
          )}

          {database === "tmdb" && (
            <>
              <AddTitle
                toast={toast}
                buttonText={`Add to collection`}
                loadingText={`Adding....`}
                titleType={title?.title_type}
                tmdbId={title?.tmdb_id}
                auth={auth}
              />
            </>
          )}
        </div>
      )}

      <ToastContainer {...toastContainerOptions} />
    </div>
  );
};

export default TitleActions;
