import UpdateAllTitles from "@/components/UpdateAllTitles";
import { authOptions } from "@/lib/nextauth/auth";
import { getServerSession } from "next-auth";

export async function generateMetadata({ params }) {
  return {
    title: "Update All Titles",
  };
}

export default async function UpdateTitlesPage({ params }) {
  const session = await getServerSession(authOptions);
  return (
    <>
      <main>
        <UpdateAllTitles auth={session?.auth} />
      </main>
    </>
  );
}
