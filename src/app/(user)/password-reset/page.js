import PasswordRestForm from "@/components/PasswordResetForm";
import React from "react";

export async function generateMetadata() {
  return {
    title: "Password Reset | React4Movies",
    description: "Reset your forgotten password from here.",
    url: `${process.env.NEXTAUTH_URL}`,
    openGraph: {
      title: "Password Reset | React4Movies",
      description: "Reset your forgotten password from here.",
      url: `${process.env.NEXTAUTH_URL}`,
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
      title: "Password Reset | React4Movies",
      description: "Reset your forgotten password from here.",
      images: ["/images/website-ss-256x256.jpg"],
    },
  };
}

export default function PasswordResetPage() {
  return (
    <>
      <PasswordRestForm />
    </>
  );
}
