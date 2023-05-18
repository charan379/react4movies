import { useTheme } from "hooks";
import React from "react";
import { Helmet } from "react-helmet";

const Head = ({ title, description, image, url }) => {
  console.log(title);
  const { theme } = useTheme();
  return (
    <Helmet>
      {/* meta */}
      <title>{title ?? "R4M "} - React4Movies</title>
      <meta name="description" content={description} />
      <meta
        name="theme-color"
        content={theme === "light" ? "#e9f1fa" : "#15202b"}
      />

      {/* og tags */}
      <meta name="og:site_name" content="React4movies" />
      <meta name="og:locale" content="en_US" />
      <meta property="og:title" content={title ?? "R4M " + "- React4Movies"} />
      <meta
        name="og:description"
        content={description ?? "Full Stack MERN Application for movies"}
      />
      <meta property="og:type" content="website" />
      <meta
        property="og:image"
        content={
          image ?? "https://moviebunkers01.netlify.app/website-ss-256x256.jpg"
        }
      />
      <meta
        property="og:url"
        content={url ?? "https://moviebunkers01.netlify.app/"}
      />

      {/* twitter card */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta
        property="twitter:image"
        content={
          image ?? "https://moviebunkers01.netlify.app/website-ss-256x256.jpg"
        }
      />
      <meta
        property="twitter:url"
        content={url ?? "https://moviebunkers01.netlify.app/"}
      />
      <meta
        property="twitter:description"
        content={description ?? "Full Stack MERN Application for movies"}
      />
      <meta
        property="twitter:title"
        content={title ?? "R4M " + "- React4Movies"}
      />
    </Helmet>
  );
};

export { Head };
