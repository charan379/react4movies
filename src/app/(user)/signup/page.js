import SignUpForm from "@/components/SignUpForm";
import React from "react";

export async function generateMetadata({ params }) {
  return {
    title: "Sign Up | React4Movies",
    description: "Sign Up into react4movies",
    url: `${process.env.NEXTAUTH_URL}/signup`,
    openGraph: {
      title: "Sign Up | React4Movies",
      description: "Sign Up into react4movies",
      url: `${process.env.NEXTAUTH_URL}/signup`,
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
      title: "Sign Up | React4Movies",
      description: "Sign Up into react4movies",
      images: ["/images/website-ss-256x256.jpg"],
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
