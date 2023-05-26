"use client";

import styles from "./Header.module.css";
import React, { useState } from "react";
import Link from "next/link";
import appLogo from "@/assets/icons/appLogo.svg";
import user from "@/assets/icons/user.svg";
import day from "@/assets/icons/day.svg";
import night from "@/assets/icons/night.svg";
import Image from "next/image";
import { useTheme } from "@/redux/hooks/useTheme";

export default function Header() {
  const { theme, toogleTheme } = useTheme();
  const auth = {
    userName: "admin",
  };

  const [showDrop, setShowDrop] = useState(false);

  return (
    <>
      <nav className={styles.navbar}>
        <div className={styles.navTitle}>
          <Image
            className={styles.navImg}
            src={appLogo}
            alt="app logo"
            priority={true}
            height={40}
            width={40}
          />
        </div>

        <ul className={styles.navItems}>
          <li className={styles.navItem}>
            <span
              style={{ display: "inline-block", height: "auto" }}
              data-tooltip={`Toggle ${
                theme === "light" ? "dark" : "light"
              } theme`}
              data-flow="left"
            >
              <Image
                style={{ cursor: "pointer" }}
                className={styles.navImg}
                src={theme === "light" ? day : night}
                alt={`toggle ${theme} theme`}
                priority={true}
                height={40}
                width={40}
                onClick={() => toogleTheme()}
              ></Image>
            </span>
          </li>
          <div className={styles.navbarDropdown}>
            <li className={styles.navItem}>
              <Image
                className={styles.navImg}
                src={user}
                alt="User controls"
                priority={true}
                height={40}
                width={40}
                onClick={() => setShowDrop(!showDrop)}
              ></Image>
            </li>
            <div
              className={`${styles.navbarDropdownContent} ${
                showDrop ? styles.show : ""
              }`}
            >
              {auth?.userName ? (
                <Link href={"#"}>{auth.userName}</Link>
              ) : (
                <Link href={"/login"}>Login</Link>
              )}

              <Link href="/">Link 1</Link>
              <Link href="/">Link 2</Link>

              {auth?.userName ? <Link href={"#"}>Logout</Link> : null}
            </div>
          </div>
        </ul>
      </nav>
    </>
  );
}
