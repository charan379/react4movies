import Login from "@/components/Login";
import React from "react";

export async function generateMetadata({ params: { titleId } }) {
  return {
    title: "Login",
    description: "Login into react4movies",
    openGraph: {
      title: "Login",
      description: "Login into react4movies",
      url: "https://nextjs.org",
      siteName: "React4Movies",
      locale: "en-US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: "Login",
      description: "Login into react4movies",
    },
  };
}

export default function LoginPage() {
  return (
    <>
      <main>
        <Login />
      </main>
    </>
  );
}
