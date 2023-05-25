"use client";

import { useProgressBar } from "@/redux/hooks/useProgressBar";
import { useTheme } from "@/redux/hooks/useTheme";
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
