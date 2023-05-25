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
          url: data?.poster_path,
          width: 750,
          height: 500,
        },
      ],
      locale: "en-US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: data?.title,
      description: data?.overview,
      images: [data?.poster_path],
    },
  };
}

export default async function Title({ params: { titleId } }) {
  const { data } = await axios.get(
    `https://oxoziko43a.execute-api.ap-southeast-1.amazonaws.com/dev/tmdb/movie/${titleId}`
  );

  return (
    <div>
      Title : {titleId}
      <img src={data?.poster_path} />
    </div>
  );
}
