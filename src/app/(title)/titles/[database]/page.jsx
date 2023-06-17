import TitlesList from "@/components/TitlesList";

export const revalidate = 3600; // revalidate every hour

export async function generateMetadata({ params: { database } }) {
  return {
    title: "R4M | " + database?.toString()?.toUpperCase(),
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
