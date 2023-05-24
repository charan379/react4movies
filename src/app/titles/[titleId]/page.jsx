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
      description: data?.tagline,
      url: "https://nextjs.org",
      siteName: "React4Movies",
      images: [
        {
          url: data?.poster_path,
          width: 800,
          height: 600,
        },
        {
          url: data?.poster_path,
          width: 1800,
          height: 1600,
          alt: "My custom alt",
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

  console.log(data);
  return <div>Title : {titleId}</div>;
}
