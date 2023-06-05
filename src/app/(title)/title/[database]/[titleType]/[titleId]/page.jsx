import { fetchTitle } from "@/lib/api/moviebunkers/methods/fetchTitle";
import { fetchTmdbTitle } from "@/lib/api/themoviedb/fetchTmdbTitle";
import { authOptions } from "@/lib/nextauth/auth";
import { getServerSession } from "next-auth";
import React from "react";

export async function generateMetadata({
  params: { database, titleType, titleId },
}) {
  const session = await getServerSession(authOptions);

  let data;

  try {
    switch (database) {
      case "tmdb":
        data = await fetchTmdbTitle({ tmdbId: titleId, titleType: titleType });
        break;
      case "mbdb":
        data = await fetchTitle({
          titleId: Buffer.from(titleId).toString("base64"),
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
      url: "https://nextjs.org",
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

  let data;

  try {
    switch (database) {
      case "tmdb":
        data = await fetchTmdbTitle({ tmdbId: titleId, titleType: titleType });
        break;

      case "mbdb":
        data = await fetchTitle({
          titleId: Buffer.from(titleId).toString("base64"),
          auth: session?.auth,
        });
        break;

      default:
        break;
    }
  } catch (error) {}

  return (
    <div>
      Title : {database} / {titleType} / {titleId}
      <img src={data?.poster_path} />
    </div>
  );
}
