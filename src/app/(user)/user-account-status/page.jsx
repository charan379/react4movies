import UserAccountStatus from "@/components/UserAccountStatus";
import React from "react";

export async function generateMetadata({ searchParams }) {
  return {
    title: "Account Status | React4Movies",
    description: "Check your account or verification/activation status here.",
    url: `${process.env.NEXTAUTH_URL}`,
    openGraph: {
      title: "Account Status | React4Movies",
      description: "Check your account verification/activation status here.",
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
      title: "Account Status | React4Movies",
      description: "Check your account or verification/activation status here.",
      images: ["/images/website-ss-256x256.jpg"],
    },
  };
}

export default function UserVerificationStatusPage({ searchParams }) {
  const idType = searchParams?.userName
    ? "userName"
    : searchParams?.email
    ? "email"
    : "";
  const id = searchParams?.userName || searchParams?.email || "";
  return (
    <>
      <UserAccountStatus idType={idType} id={id} />
    </>
  );
}
