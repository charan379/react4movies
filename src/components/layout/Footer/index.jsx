"use client";

import styles from "./Footer.module.css";
import React from "react";
import Link from "next/link";
import tmdbLogo from "@/assets/icons/tmdbLogo.svg";
import Image from "next/image";
import { useTheme } from "@/redux/hooks/useTheme";

export const Footer = () => {
  const { theme } = useTheme();
  return (
    <>
      <div className={`${styles.footer} ${styles?.[theme]}`}>
        <Link href="#" tabIndex="-1">
          <span>
            {" "}
            <b>
              <u>M</u>
            </b>
            ovie
            <b>
              <u>B</u>
            </b>
            unkers
            <sup
              style={{
                fontSize: ".675em",
                fontFamily:
                  'SFMono-Regular,Menlo,Monaco,Consolas,"Liberation Mono","Courier New",monospace',
                fontWeight: "bold",
              }}
            >
              v<code style={{ color: "#d63384" }}>2.0</code>
            </sup>
          </span>
        </Link>
        <Link href="#" tabIndex="-1">
          <Image src={tmdbLogo} alt="tmdb logo" />
        </Link>
      </div>
    </>
  );
};
