"use client";

import { useProgressBar } from "@/redux/hooks/useProgressBar";
import { useTheme } from "@/redux/hooks/useTheme";
import { useSession, signIn } from "next-auth/react";
import Link from "next/link";
import React from "react";

export default function ReduxTest() {
  const { theme, toogleTheme } = useTheme();

  const { incProgress20, incProgress, completeProgress, resetProgress } =
    useProgressBar();

  const handleClick = (event) => {
    event.preventDefault();

    toogleTheme();
  };
  return (
    <div>
      <Link href={"/admin"}>AdminPage</Link>
      <button onClick={() => signIn()}>Sign In</button>
      <button onClick={(event) => handleClick(event)}>{theme}</button>

      <button onClick={() => incProgress20()}>Inc Pro 20</button>
      <button onClick={() => incProgress(10)}>Inc Pro Cust</button>
      <button onClick={() => completeProgress()}>Inc Pro Comp</button>
      <button onClick={() => resetProgress()}>Pro Reset</button>
      <div
        style={{
          width: "250px",
          height: "240px",
          backgroundColor: `${theme === "light" ? "red" : "green"}`,
        }}
      ></div>
    </div>
  );
}
