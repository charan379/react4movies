import styles from "./TitlePage.module.css";
//
import { fetchTitle } from "@/lib/api/moviebunkers/methods/fetchTitle";
import { fetchTmdbTitle } from "@/lib/api/themoviedb/fetchTmdbTitle";
import { authOptions } from "@/lib/nextauth/auth";
import { getServerSession } from "next-auth";
import React from "react";
import TitleActions from "@/components/TitleActions";
import { TitleDetails } from "@/components/TitleDetails";
import { TitlePoster } from "@/components/TitlePoster";
import { LevelOne } from "@/constants/AuthRoles";
//
import dynamic from "next/dynamic";
import BarsLoadingAnimation from "@/components/BarsLoadingAnimation";

const Links = dynamic(() => import("@/components/Links"), {
  loading: () => <BarsLoadingAnimation />,
  ssr: false, // Disable server-side rendering for this component
});

export async function generateMetadata({
  params: { database, titleType, titleId },
}) {
  const session = await getServerSession(authOptions);

  const extractedId = titleId?.split("-")[0];

  let data;

  try {
    switch (database) {
      case "tmdb":
        data = await fetchTmdbTitle({
          tmdbId: extractedId,
          titleType: titleType,
        });
        break;
      case "mbdb":
        data = await fetchTitle({
          titleId: Buffer.from(extractedId).toString("base64"),
          auth: session?.auth,
        });
        break;

      default:
        break;
    }
  } catch (error) {}

  return {
    title: data?.title,
    description: data?.overview,
    openGraph: {
      title: data?.title,
      description: data?.overview,
      url: process.env.NEXTAUTH_URL,
      siteName: "React4Movies",
      images: [
        {
          url: data?.poster_path
            ?.toString()
            ?.replace(/(w\d+|original)/g, "w92"),
          width: 92,
          height: 138,
        },
        {
          url: data?.poster_path
            ?.toString()
            ?.replace(/(w\d+|original)/g, "w154"),
          width: 154,
          height: 231,
        },
        {
          url: data?.poster_path
            ?.toString()
            ?.replace(/(w\d+|original)/g, "w185"),
          width: 185,
          height: 278,
        },
        {
          url: data?.poster_path
            ?.toString()
            ?.replace(/(w\d+|original)/g, "w342"),
          width: 342,
          height: 513,
        },
        {
          url: data?.poster_path
            ?.toString()
            ?.replace(/(w\d+|original)/g, "w500"),
          width: 500,
          height: 750,
        },
      ],
      locale: "en-US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: data?.title,
      description: data?.overview,
      images: [
        data?.poster_path?.toString()?.replace(/(w\d+|original)/g, "w342"),
      ],
    },
  };
}

export default async function TitlePage({
  params: { database, titleType, titleId },
}) {
  const session = await getServerSession(authOptions);

  const extractedId = titleId?.split("-")[0];

  let data;

  try {
    switch (database) {
      case "tmdb":
        data = await fetchTmdbTitle({
          tmdbId: extractedId,
          titleType: titleType,
        });
        break;

      case "mbdb":
        data = await fetchTitle({
          titleId: Buffer.from(extractedId).toString("base64"),
          auth: session?.auth,
        });
        break;

      default:
        break;
    }
  } catch (error) {}

  return (
    <>
      {/* <div>
        Title : {database} / {titleType} / {titleId}
        <img src={data?.poster_path} />
      </div> */}
      <main>
        <div id={"title-page"} className={styles.titlePage}>
          {/* title page */}
          <div className={styles.titleTitleSection}>
            {/* title name */}
            {/* Render the title title and year */}
            {data?.title}
            <small>&nbsp;({data?.year})</small>
          </div>

          <div className={styles.titlePosterSection}>
            {/* title poster */}
            {/* Render the title poster */}
            <TitlePoster
              url={data?.poster_path}
              alt={data?.title}
              tagline={data?.tagline}
            />
            {/* component for displaying title action buttons */}
            <TitleActions
              database={database}
              title={data}
              user={session?.user}
              auth={session?.auth}
            />
          </div>

          <div className={styles.titleDetailsSection}>
            {/* title details */}
            {/* Render the title details */}
            <TitleDetails title={data} />
          </div>

          {/* links */}
          {database === "mbdb" && LevelOne.includes(session?.user?.role) && (
            <div className={styles.titleLinksSection}>
              <h2 className="page-section-heading" id="links">
                Links
                <span>
                  &nbsp;
                  {/* <i className="fas fa-chevron-right fa-lg"></i> */}
                </span>
              </h2>
              <Links auth={session?.auth} parentId={data?._id} limit={0} />
            </div>
          )}
        </div>
      </main>
    </>
  );
}
