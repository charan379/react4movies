"use client";

import styles from "./Header.module.css";
import React, { useState } from "react";
import Link from "next/link";
import appLogo from "@/assets/icons/appLogo.svg";
import userSvg from "@/assets/icons/user.svg";
import daySvg from "@/assets/icons/day.svg";
import nightSvg from "@/assets/icons/night.svg";
import Image from "next/image";
import { useSession, signOut } from "next-auth/react";
import { useTheme } from "@/redux/hooks/useTheme";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPowerOff } from "@fortawesome/free-solid-svg-icons";

export default function Header() {
  const { theme, toogleTheme } = useTheme();
  const { data: session } = useSession();
  const { user, auth } = session || { user: {}, auth: {} };

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
                src={theme === "light" ? daySvg : nightSvg}
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
                src={userSvg}
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
              {user?.userName ? (
                <Link href={"#"}>{user?.userName}</Link>
              ) : (
                <Link href={"/auth/login"}>Login</Link>
              )}

              <Link href="/">Link 1</Link>
              <Link href="/">Link 2</Link>

              {user?.userName ? (
                <button onClick={() => signOut()}>
                  Logout{" "}
                  <span >
                    <FontAwesomeIcon icon={faPowerOff} size="lg" />
                  </span>
                </button>
              ) : null}
            </div>
          </div>
        </ul>
      </nav>
    </>
  );
}
