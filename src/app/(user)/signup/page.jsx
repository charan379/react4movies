import SignUpForm from "@/components/SignUpForm";
import React from "react";

export async function generateMetadata({ params }) {
  return {
    title: "Sign Up | React4Movies",
    description: "Sign Up into react4movies",
    openGraph: {
      title: "Sign Up | React4Movies",
      description: "Sign Up into react4movies",
      url: process.env.NEXTAUTH_URL,
      siteName: "React4Movies",
      locale: "en-US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: "Sign Up | React4Movies",
      description: "Sign Up into react4movies",
    },
  };
}

export default function SignUp() {
  return (
    <>
      <main>
        <SignUpForm />
      </main>
    </>
  );
}
