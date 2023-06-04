"use client";

import React, { Suspense, useRef, useState } from "react";
import styles from "./TitleModal.module.css";
// font awesome library
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
library.add(fas, far, fab);
import { useSession } from "next-auth/react";
import { useDisableBodyScrollOnModalOpen } from "@/lib/hooks/useDisableBodyScrollOnModalOpen";
import { useToastify } from "@/lib/hooks/useToastify";
import { useEscapeKey } from "@/lib/hooks/useEscapeKey";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { TitlePoster } from "../TitlePoster";
import ShowLessText from "../ShowLessText";
import { getExternalLinks } from "@/lib/utils/getExternalLinks";
import { TitleExternalLinks } from "../TitleExternalLinks";
import BarsLoadingAnimation from "../BarsLoadingAnimation";
import Favourite from "../TitleActions/Favourite";
import Seen from "../TitleActions/Seen";
import Star from "../TitleActions/Star";
import { LevelThere } from "@/constants/AuthRoles";
import Delete from "../TitleActions/Delete";
import { useMbdbQuery } from "@/redux/hooks/useMbdbQuery";
import AddTitle from "../TitleActions/Add";
import PlayTrailer from "../TitleActions/PlayTrailer";

const WatchProviders = React.lazy(() => import("../WatchProviders"));

const TitleModal = ({ title, open, close }) => {
  // get user session details
  const { data: session } = useSession();
  // State to identify user want to show details of title of links
  const [showDetails, setShowDetails] = useState(false);
  // State to get tack of amy updates
  const [isSomthingUpdated, setIsSomthingUpdated] = useState(false);
  // mbdb query hook
  const { refreshMbdbCachedResults } = useMbdbQuery();
  // Hook that return ReactTostify toast component and toast options
  const { ToastContainer, toastContainerOptions, toast } = useToastify();
  // Create a ref that will be used to detect clicks outside the modal
  const titleModalRef = useRef();

  // Register a callback to close the modal when the user presses the Escape key
  useEscapeKey(() => {
    if (isSomthingUpdated) {
      refreshMbdbCachedResults();
    }
    close();
  });

  // disable body scroll when modal is opened
  useDisableBodyScrollOnModalOpen(open);

  // show Open Title link after 500ms from modal popup
  setTimeout(() => {
    try {
      const titleLink = document.getElementById(`title-page-link`);
      titleLink.dataset.show = "true";
    } catch (error) {
      console.log(error?.message);
    }
  }, 500);

  const handleClose = (event) => {
    event.preventDefault();
    if (isSomthingUpdated) {
      refreshMbdbCachedResults();
    }

    close();
  };

  // If the `open` prop is false, don't render anything
  if (!open) return null;

  return (
    <>
      {/* The modal overlay */}
      <div className={`modal-container`}>
        <div ref={titleModalRef} className={styles.titleModal}>
          {/* Close button */}
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

          {/* The modal content */}
          <div className={styles.title}>
            <div className={styles.titlePosterSection}>
              {/* Render the title poster */}
              <TitlePoster url={title?.posterPath ?? ""} alt={title?.title} />
            </div>

            <div className={styles.titleInfoSection}>
              {/* title name */}
              <div className={styles.titleName}>
                <h3 className="sub-heading">{title?.title}</h3>
              </div>
              {/* year and ratting */}
              <div className={styles.minorDetails}>
                <ul className={styles.ul}>
                  <li style={{ display: "inline" }}>
                    {title?.ratting && (
                      <>
                        <span style={{ color: "rgb(255 149 0)" }}>
                          <FontAwesomeIcon icon={["fas", "star"]} size="sm" />
                        </span>
                        {" " + title?.ratting}
                      </>
                    )}
                  </li>
                  <li style={{ display: "inline" }}>
                    {title?.year && (
                      <>
                        <span>{title?.year}</span>
                      </>
                    )}
                  </li>
                </ul>
              </div>

              <div
                className={`${styles.linkActions} ${
                  showDetails ? styles.hide : styles.show
                }`}
              >
                <PlayTrailer
                  videos={title?.videos}
                  className={styles.actionButton}
                />

                {title?.database === "mbdb" && (
                  <>
                    <Favourite
                      toast={toast}
                      titleId={title?.id}
                      favouriteByUser={title?.favouriteByUser}
                      className={styles.actionButton}
                      auth={session?.auth}
                      setAsUpdated={() => setIsSomthingUpdated(true)}
                    />

                    <Seen
                      toast={toast}
                      titleId={title?.id}
                      seenByUser={title?.seenByUser}
                      unseenByUser={title?.unseenByUser}
                      className={styles.actionButton}
                      auth={session?.auth}
                      setAsUpdated={() => setIsSomthingUpdated(true)}
                    />

                    <Star
                      toast={toast}
                      titleId={title?.id}
                      starredByUser={title?.starredByUser}
                      className={styles.actionButton}
                      auth={session?.auth}
                      setAsUpdated={() => setIsSomthingUpdated(true)}
                    />

                    {LevelThere.includes(session?.user?.role) && (
                      <Delete
                        toast={toast}
                        tooltipText={`Delete`}
                        titleId={title?.id}
                        className={styles.actionButton}
                        auth={session?.auth}
                        setAsUpdated={() => setIsSomthingUpdated(true)}
                      />
                    )}
                  </>
                )}

                {title?.database === "tmdb" && (
                  <>
                    <AddTitle
                      toast={toast}
                      tooltipText={`Add to collection`}
                      titleType={title?.titleType}
                      className={styles.actionButton}
                      tmdbId={title?.tmdbId}
                      auth={session?.auth}
                    />
                  </>
                )}
              </div>

              {/* external links */}
              <div
                className={`${styles.links} ${
                  showDetails ? styles.hide : styles.show
                }`}
              >
                <h6 className="sub-heading">External Links</h6>
                {title?.tmdbId && (
                  <TitleExternalLinks links={getExternalLinks(title)} />
                )}
              </div>
              {/* watch providers */}
              <div
                className={`${styles.links} ${
                  showDetails ? styles.hide : styles.show
                }`}
              >
                <h6 className="sub-heading">Watch Providers</h6>
                {title?.tmdbId && (
                  <Suspense fallback={<BarsLoadingAnimation />}>
                    <WatchProviders
                      tmdbId={title?.tmdbId}
                      titleType={title?.titleType}
                    />
                  </Suspense>
                )}
              </div>

              {/* title details */}
              <div
                className={`${styles.detailsText} ${
                  !showDetails ? styles.hide : styles.show
                }`}
              >
                {/* title type [tv,movie] */}
                {title?.titleType && (
                  <p>
                    <b>Title type:</b>
                    &nbsp; &nbsp;
                    {title?.titleType === "tv" && (
                      <span data-tooltip={`Tv`} data-flow="down">
                        <FontAwesomeIcon icon={["fas", "tv"]} size="lg" />
                      </span>
                    )}
                    {title?.titleType === "movie" && (
                      <span data-tooltip={`Movie`} data-flow="down">
                        <FontAwesomeIcon icon={["fas", "film"]} size="lg" />
                      </span>
                    )}
                  </p>
                )}

                {/* title genres  */}
                {title?.genres && (
                  <p>
                    <b>Genres:</b>
                    &nbsp;
                    <span>
                      {title?.genres?.map((genre) => genre).join(", ")}
                    </span>
                  </p>
                )}

                {/* title tagline */}
                {title?.tagline && (
                  <p>
                    <b>Tagline:</b>
                    &nbsp;
                    <span>{title?.tagline}</span>
                  </p>
                )}

                {/* title run time */}
                {title?.runtime && (
                  <p>
                    <b>Runtime:</b>
                    &nbsp;
                    <span>{title?.runtime}m</span>
                  </p>
                )}

                {/* number of seasons released or anounced */}
                {title?.numberOfSeasons && (
                  <p>
                    <b>Seasons:</b>
                    &nbsp;
                    <span>{title?.numberOfSeasons}</span>
                  </p>
                )}

                {/* number of episodes released or anounced */}
                {title?.numberOfEpisodes && (
                  <p>
                    <b>Episodes:</b>
                    &nbsp;
                    <span>{title?.numberOfEpisodes}</span>
                  </p>
                )}

                {title?.overview && (
                  <p>
                    <b>Overview:</b>
                    &nbsp;
                    <ShowLessText text={title?.overview} limit={260} />
                  </p>
                )}
              </div>

              {/* button to open title page */}
              <div className={styles.bottomSection}>
                <button
                  id={`title-page-link`}
                  data-show="false"
                  className={styles.moreDetails}
                  // onClick={() => {
                  //   handleOnClick(title);
                  // }}
                >
                  Open Title
                </button>
              </div>
            </div>
          </div>

          {/* title details toggle button */}
          <button
            data-tooltip={` ${showDetails ? "Hide Details" : "Show Details"}`}
            data-flow="left"
            className={styles.toggleDetails}
            tabIndex="0"
            onClick={() => setShowDetails(!showDetails)}
          >
            <FontAwesomeIcon icon={["fas", "info-circle"]} size="lg" />
          </button>
        </div>

        {/* raectToastify component*/}
        <ToastContainer {...toastContainerOptions} />
      </div>
    </>
  );
};

export default TitleModal;
