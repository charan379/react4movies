"use client";

import styles from "./AppContainer.module.css";
import React from "react";
import Header from "../Header";
import Footer from "../Footer";
import { useTheme } from "@/redux/hooks/useTheme";
import TopLoadingBar from "../TopLoadingBar";

export default function AppContainer({ children }) {
  const { theme } = useTheme();

  return (
    <div className={`${styles.appContainer} ${styles?.[theme]}`}>
      {/* Top Loading progress bar */}
      <TopLoadingBar />
      {/* header at top */}
      <Header />

      {/* sidebar */}
      {/* <SideBar /> */}

      {/* main content */}
      <div className={styles.outlet}>
        <div className={styles.contentWrapper}>
          {/* <Outlet /> */}
          {children}
        </div>
        {/* <QuickBall /> */}
      </div>

      <Footer />
    </div>
  );
}
