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
          url: 'https://nextjs.org/og.png',
          width: 800,
          height: 600,
        },
        {
          url: 'https://nextjs.org/og-alt.png',
          width: 1800,
          height: 1600,
          alt: 'My custom alt',
        },
      ],
      locale: "en-US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: data?.title,
      description: data?.overview,
      images: ['https://nextjs.org/og.png'],
    },
  };
}

export default async function Title({ params: { titleId } }) {
  const { data } = await axios.get(
    `https://oxoziko43a.execute-api.ap-southeast-1.amazonaws.com/dev/tmdb/movie/${titleId}`
  );

  return <div>Title : {titleId}</div>;
}
