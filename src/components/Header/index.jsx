"use client";

import styles from "./Header.module.css";
import React, { useCallback, useRef, useState } from "react";
import Link from "next/link";
import appLogo from "@/assets/icons/appLogo.svg";
import userSvg from "@/assets/icons/user.svg";
import daySvg from "@/assets/icons/day.svg";
import nightSvg from "@/assets/icons/night.svg";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { useTheme } from "@/redux/hooks/useTheme";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPowerOff } from "@fortawesome/free-solid-svg-icons";
import { useOnOutSideClick } from "@/lib/hooks/useOnOutSideClick";
import Logout from "../Logout";

export default function Header() {
  const { theme, toogleTheme } = useTheme();
  const { data: session } = useSession();
  const { user } = session || { user: {}, auth: {} };

  const dropdownRef = useRef();

  const [showDrop, setShowDrop] = useState(false);

  const [openLogout, setOpenLogout] = useState(false);

  // close dropdown on outside click
  useOnOutSideClick(
    dropdownRef,
    useCallback(() => {
      setShowDrop(false);
    }, [])
  );
  return (
    <>
      <nav className={styles.navbar} data-role="header">
        <div className={styles.navTitle}>
          <Link href={"/"}>
            <Image
              className={styles.navImg}
              src={appLogo}
              alt="app logo"
              priority={true}
              height={40}
              width={40}
            />
          </Link>
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
          <div ref={dropdownRef} className={styles.navbarDropdown}>
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
                <>
                  <Link href={"/login"}>Login</Link>
                  <Link href={"/signup"}>Register</Link>
                  <Link href={"/password-reset"}>Forgot Password</Link>
                </>
              )}

              <Link
                href={
                  user?.userName
                    ? `/user-account-status?userName=${user?.userName}`
                    : `/user-account-status`
                }
              >
                Check Account Status
              </Link>
              {/* <Link href="/">Link 2</Link> */}

              {user?.userName ? (
                <button onClick={() => setOpenLogout(true)}>
                  Logout{" "}
                  <span>
                    <FontAwesomeIcon icon={faPowerOff} size="lg" />
                  </span>
                </button>
              ) : null}
            </div>
          </div>
        </ul>
      </nav>

      {openLogout ? (
        <Logout open={openLogout} close={() => setOpenLogout(false)} />
      ) : null}
    </>
  );
}
