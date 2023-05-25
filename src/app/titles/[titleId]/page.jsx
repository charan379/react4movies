import ReduxTest from "@/components/layout/Test/ReduxTest";
import { store } from "@/redux/store";
import axios from "axios";
import React from "react";

export async function generateMetadata({ params: { titleId } }) {
  const { data } = await axios.get(
    `https://oxoziko43a.execute-api.ap-southeast-1.amazonaws.com/dev/tmdb/movie/${titleId}`
  );

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

export default async function Title({ params: { titleId } }) {
  const test = store;
  console.log(test.getState().theme);

  const { data } = await axios.get(
    `https://oxoziko43a.execute-api.ap-southeast-1.amazonaws.com/dev/tmdb/movie/${titleId}`
  );

  return (
    <div style={{ margin: "100px" }}>
      <button>SSR: {test.getState().theme?.mode}</button>
      <ReduxTest />
      Title : {titleId}
      <img src={data?.poster_path} />
    </div>
  );
}
