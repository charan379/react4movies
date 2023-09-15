import TitlesList from "@/components/TitlesList";

export const revalidate = 3600; // revalidate every hour

export async function generateMetadata({ params: { database } }) {
  return {
    title: "R4M | " + database?.toString()?.toUpperCase(),
    description:
      "Discover a world of movies at your fingertips on React4Movies. Easily filter by genre, language, and release year, and explore where each movie can be streamed. Watch trailers, curate your favorites,and personalize your movie experience with favorites and preferences. Begin your cinematic exploration now and keep track of your movie journey effortlessly.",
    url: process.env.NEXTAUTH_URL,
    siteName: "React4Movies",
    openGraph: {
      title: "R4M | " + database?.toString()?.toUpperCase(),
      description:
        "Discover a world of movies at your fingertips on React4Movies. Easily filter by genre, language, and release year, and explore where each movie can be streamed. Watch trailers, curate your favorites,and personalize your movie experience with favorites and preferences. Begin your cinematic exploration now and keep track of your movie journey effortlessly.",
      url: process.env.NEXTAUTH_URL,
      siteName: "React4Movies",
      locale: "en-US",
      type: "website",
      images: [
        {
          url: "/images/website-ss-256x256.jpg",
          width: 185,
          height: 278,
        },
        {
          url: "/images/website-ss-256x256.jpg",
          width: 342,
          height: 513,
        },
        {
          url: "/images/website-ss.jpg",
          width: 500,
          height: 750,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "R4M | " + database?.toString()?.toUpperCase(),
      description:
        "Discover a world of movies at your fingertips on React4Movies. Easily filter by genre, language, and release year, and explore where each movie can be streamed. Watch trailers, curate your favorites,and personalize your movie experience with favorites and preferences. Begin your cinematic exploration now and keep track of your movie journey effortlessly.",
      images: ["/images/website-ss-256x256.jpg"],
    },
  };
}

export default async function TitlesPage({ params: { database } }) {
  return (
    <>
      <main>
        <TitlesList database={database || "tmdb"} />
      </main>
    </>
  );
}
