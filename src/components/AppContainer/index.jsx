import styles from "./AppContainer.module.css";
import React from "react";
import Header from "../Header";
import Footer from "../Footer";
import TopLoadingBar from "../TopLoadingBar";

export default function AppContainer({ children }) {
  return (
    <div className={styles.appContainer}>
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
