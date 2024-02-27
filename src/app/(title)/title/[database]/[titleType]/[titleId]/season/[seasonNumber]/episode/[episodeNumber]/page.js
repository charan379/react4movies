import EpisodePoster from "@/components/Episode/EpisodePoster";
import styles from "./EpisodePage.module.css";
//
// font awesome library
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
//
import { authOptions } from "@/lib/nextauth/auth";
import { getServerSession } from "next-auth";
import convertIsoDate from "@/lib/utils/convertIsoDate";
import ShowLessText from "@/components/ShowLessText";
import PlayTrailer from "@/components/TitleActions/PlayTrailer";
import { LevelTwo } from "@/constants/AuthRoles";
import LinkList from "@/components/Links";
import { fetchTmdbTvSeasonEpisode } from "@/lib/api/themoviedb/fetchTmdbTvSeasonEpisode";
import { fetchTvSeasonEpisodes } from "@/lib/api/moviebunkers/methods/fetchTvSeasonEpisodes";

export const revalidate = 3600; // revalidate every hour

export async function generateMetadata({
  params: { database, titleType, titleId, seasonNumber, episodeNumber },
}) {
  const session = await getServerSession(authOptions);
  //
  const titleIdElements = titleId?.split("-"); // id elements
  // 
  const tvShowId = titleId?.split("-")[0]; // tv shoe id
  //  tv show name
  const titleName = titleId
    ?.split("-")
    ?.map((elem, index) => {
      if (index !== 0 && index !== titleIdElements?.length - 1) {
        let word = [...elem];
        word?.splice(0, 1, word[0]?.toString()?.toUpperCase())
        return word.join("");
      }
    })
    .join(" ")
    ?.trim();
  // tv show initial release year

  const year = titleId?.split("-")?.slice(-1)[0];
  // 
  let data;
  // 
  try {
    switch (database) {
      case "tmdb":
        const tmdbData = await fetchTmdbTvSeasonEpisode({
          episodeNumber: episodeNumber,
          seasonNumber: seasonNumber,
          tmdbTitleId: tvShowId,
        });

        if (tmdbData?.episode_number) {
          data = tmdbData;
        } else {
          throw Error("Can't find requested episode data");
        }
        break;

      case "mbdb":
        const mbdbData = await fetchTvSeasonEpisodes({
          titleId: tvShowId,
          seasonNumber: seasonNumber,
          queryParams: {
            limit: 1,
            skip: episodeNumber - 1 || 0,
            sort_by: "episode_number.asc",
          },
          auth: session?.auth,
        });

        if (mbdbData?.length > 0 && mbdbData[0]?.episode_number) {
          data = mbdbData[0];
        } else {
          throw Error("Can't find requested episode data");
        }

        break;

      default:
        break;
    }
  } catch (error) {
    return {
      title: "Error",
      description: `${error?.message}`,
    };
  }

  // 
  return {
    title: `Episode ${data?.episode_number} | ${data?.name} | ${titleName} ${year}`,
    description: data?.overview,
    openGraph: {
      title: `Episode ${data?.episode_number} | ${data?.name} | ${titleName} ${year}`,
      description: data?.overview,
      url: process.env.NEXTAUTH_URL,
      siteName: "React4Movies",
      images: [
        {
          url: data?.still_path
            ?.toString()
            ?.replace(/(w\d+|original)/g, "w92"),
          width: 92,
          height: 52,
        },
        {
          url: data?.still_path
            ?.toString()
            ?.replace(/(w\d+|original)/g, "w185"),
          width: 185,
          height: 104,
        },
        {
          url: data?.still_path
            ?.toString()
            ?.replace(/(w\d+|original)/g, "w300"),
          width: 300,
          height: 169,
        },
        {
          url: data?.still_path
            ?.toString()
            ?.replace(/(w\d+|original)/g, "original"),
          width: 342,
          height: 218,
        },
      ],
      locale: "en-US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `Episode ${data?.episode_number} | ${data?.name} | ${titleName} ${year}`,
      description: data?.overview,
      images: [
        data?.still_path?.toString()?.replace(/(w\d+|original)/g, "original"),
      ],
    },
  };
}

export default async function EpisodePage({
  params: { database, titleType, titleId, seasonNumber, episodeNumber },
}) {
  const session = await getServerSession(authOptions);

  //
  const titleIdElements = titleId?.split("-"); // id elements
  // 
  const tvShowId = titleId?.split("-")[0]; // tv shoe id
  //  tv show name
  const titleName = titleId
    ?.split("-")
    ?.map((elem, index) => {
      if (index !== 0 && index !== titleIdElements?.length - 1) {
        return elem;
      }
    })
    .join(" ")
    ?.trim();
  // tv show initial release year
  const year = titleId?.split("-")?.slice(-1)[0];

  let episode;

  try {
    switch (database) {
      case "tmdb":
        const tmdbData = await fetchTmdbTvSeasonEpisode({
          episodeNumber: episodeNumber,
          seasonNumber: seasonNumber,
          tmdbTitleId: tvShowId,
        });

        if (tmdbData?.episode_number) {
          episode = tmdbData;
        } else {
          throw Error("Can't find requested episode data");
        }
        break;

      case "mbdb":
        const mbdbData = await fetchTvSeasonEpisodes({
          titleId: tvShowId,
          seasonNumber: seasonNumber,
          queryParams: {
            limit: 1,
            skip: episodeNumber - 1 || 0,
            sort_by: "episode_number.asc",
          },
          auth: session?.auth,
        });

        if (mbdbData?.length > 0 && mbdbData[0]?.episode_number) {
          episode = mbdbData[0];
        } else {
          throw Error("Can't find requested episode data");
        }

        break;

      default:
        break;
    }
  } catch (error) {
    throw new Error(error?.message);
  }

  return (
    <>
      <main>
        {/* episode page */}
        <div className={styles.episodePage}>
          {/* link tree */}
          {/* <div className="link-tree-section" id="link-tree-top">
            <ul>
              <li className="link-tree-child">
                <span>
                  <Link to={linkTree.title}>
                    {titleName.replace(/-/g, " ")}
                  </Link>
                </span>
              </li>
              <li className="link-tree-child">
                <span>
                  <Link
                    to={linkTree.season}
                  >{`season ${episode?.season_number}`}</Link>
                </span>
              </li>
              <li className="link-tree-child">
                <span>
                  <Link to={`#`}>{`Episode ${episode?.episode_number}`}</Link>
                </span>
              </li>
            </ul>
          </div> */}
          {/* poster and info of episode section */}
          <div className={styles.mainInfoSection} id={`main-card`}>
            {/* episode poster section */}
            <div className={styles.posterSection}>
              {/* code to display poster */}
              <EpisodePoster
                stillPath={episode?.still_path}
                episodeName={episode?.name}
              />
            </div>
            {/* episode info section */}
            <div className={styles.infoSection}>
              {/* code to display episode info */}
              <ul>
                <li>
                  <span className={styles.infoItem}>
                    <b>Name</b> : {episode?.name ?? ""}
                  </span>
                </li>
                <li>
                  <span className={styles.infoItem}>
                    <b>Season Number</b> : {episode?.season_number ?? ""}
                  </span>
                </li>
                <li>
                  <span className={styles.infoItem}>
                    <b>Episode Number</b> : {episode?.episode_number ?? ""}
                  </span>
                </li>
                {episode?.air_date && (
                  <li>
                    <span className={styles.infoItem}>
                      <b>Aired Date</b> : {convertIsoDate(episode?.air_date)}
                    </span>
                  </li>
                )}
                {episode?.runtime && (
                  <li>
                    <span className={styles.infoItem}>
                      <b>Runtime</b> : {episode?.runtime}m
                    </span>
                  </li>
                )}
                {episode?.overview && (
                  <li>
                    <span className={styles.infoItem}>
                      <b>Overview</b> :{" "}
                      <ShowLessText text={episode?.overview} limit={180} />
                    </span>
                  </li>
                )}
              </ul>
            </div>

            <div className={styles.actionButtonsSection}>
              <div className={styles.actionButtons}>
                <PlayTrailer
                  videos={episode?.videos}
                  toolTipDir="up"
                  className={styles.actionButton}
                />
              </div>
            </div>
          </div>

          {/* links section */}
          {database === "mbdb" && LevelTwo.includes(session?.user?.role) && (
            <div className={styles.linksSection}>
              <h2 className="page-section-heading" id="links">
                Links
                <span>
                  &nbsp;
                  <FontAwesomeIcon icon={faChevronRight} size="lg" />
                </span>
              </h2>
              <LinkList auth={session?.auth} parentId={episode?._id} />
            </div>
          )}

          {/* images section */}
          <div className={styles.imagesSection}>
            <h2 className="page-section-heading" id="images">
              Images
              <span>
                &nbsp;
                <small>{episode?.images?.length}&nbsp;</small>
                <FontAwesomeIcon icon={faChevronRight} size="lg" />
              </span>
            </h2>
            {/* code to display images */}
            {/* <LightboxImages imagesProp={episode?.images} /> */}
          </div>

          {/* videos section */}
          <div className={styles.videosSection} id="videos">
            {/* code to display videos
            related to episode */}
          </div>
        </div>
      </main>
    </>
  );
}
