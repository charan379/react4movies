import { fetchWhoAmi } from "@/lib/api/moviebunkers/methods/fetchWhoAmi";
import { authOptions } from "@/lib/nextauth/auth";
import { getServerSession } from "next-auth";

export const revalidate = 3600; // revalidate every hour

export async function generateMetadata({ params }) {
  let data;
  try {
    data = await fetchWhoAmi({});
    console.log(data, " : at MetaData");
  } catch (error) {
    console.log(error);
  }

  return {
    title: data?.userName,
  };
}

export default async function TitlesPage({ params: { database } }) {
  const session = await getServerSession(authOptions);

  try {
    const data = await fetchWhoAmi({});
    console.log(data, " : at Page");
  } catch (error) {
    console.log(error);
  }

  return (
    <>
      <main>
        <p>{database}</p>
      </main>
    </>
  );
}
