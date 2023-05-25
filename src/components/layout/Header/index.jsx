import styles from "./Header.module.css";
import React from "react";
import Link from "next/link";
import appLogo from "@/assets/icons/appLogo.svg";
import user from "@/assets/icons/user.svg";
import day from "@/assets/icons/day.svg";
import night from "@/assets/icons/night.svg";
import Image from "next/image";

export default function Header() {
  const theme = "dark";
  const auth = {
    userName: "admin",
  };
  return (
    <>
      <nav className={`${styles.navbar} ${styles?.[theme]}`}>
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
          {/* <ToogleTheme className={styles.navItem}> */}
          <li className={styles.navItem}>
            <span
              style={{ display: "inline-block", height: "auto" }}
              data-tooltip={`Toggle ${
                theme === "light" ? "dark" : "light"
              } theme`}
              data-flow="left"
            >
              <Image
                className={styles.navImg}
                src={theme === "light" ? day : night}
                alt={`toggle ${theme} theme`}
                priority={true}
                height={40}
                width={40}
              ></Image>
            </span>
          </li>
          {/* </ToogleTheme> */}
          <div className={styles.navbarDropdown}>
            <li className={styles.navItem}>
              <Link href={"#"} title="User" tabIndex="0">
                <Image
                  className={styles.navImg}
                  src={user}
                  alt="User controls"
                  priority={true}
                  height={40}
                  width={40}
                ></Image>
              </Link>
            </li>
            <div className={`${styles.navbarDropdownContent}`}>
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
