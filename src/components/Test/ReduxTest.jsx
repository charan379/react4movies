"use client";
import { useTheme } from "@/redux/hooks/useTheme";
import React from "react";
export default function ReduxTest() {
  const { theme, toogleTheme } = useTheme();

  const handleClick = (event) => {
    event.preventDefault();

    toogleTheme();
  };
  return (
    <div>
      <button onClick={(event) => handleClick(event)}>{theme}</button>

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
