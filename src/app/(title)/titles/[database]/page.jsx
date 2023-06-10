import TitlesList from "@/components/TitlesList";


export const revalidate = 3600; // revalidate every hour

// export async function generateMetadata({ params: { database } }) {
//   let data;
//   try {
//     data = await fetchWhoAmi({});
//     // console.log(data, " : at MetaData");
//   } catch (error) {
//     console.log(error);
//   }

//   return {
//     title: data?.userName,
//   };
// }

export default async function TitlesPage({ params: { database } }) {

  return (
    <>
      <main>
        <TitlesList database={database} />
      </main>
    </>
  );
}
