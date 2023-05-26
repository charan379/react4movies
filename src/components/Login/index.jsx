"use client";

import { AppConfig } from "@/app.config";
import styles from "./Login.module.css";

import { useTheme } from "@/redux/hooks/useTheme";
import React, { useState } from "react";
import Link from "next/link";

export default function Login() {
  // Import hooks and components
  const [userName, setUsername] = useState(AppConfig.GUEST_USERNAME); // set the initial value of the username to the guest username from the AppConfig
  const [password, setPassword] = useState(AppConfig.GUEST_PASSWORD); // set the initial value of the password to the guest password from the AppConfig
  const [errors, setErrors] = useState(""); // set the initial value of the error message to an empty string
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async () => {
    // Prevent default form submission
    event.preventDefault();
  };
  return (
    <>
      <div className={styles.loginModal}>
        {/* Login form */}
        <h2> LOGIN </h2>
        <form onSubmit={handleSubmit}>
          {/* Username input */}
          <div className={styles.inputBox}>
            <input
              type="text"
              value={userName}
              onChange={(e) => setUsername(e.target.value)}
              required={true}
              autoComplete="false"
            ></input>
            <label>Username</label>
          </div>
          {/* Password input */}
          <div className={styles.inputBox}>
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required={true}
              autoComplete="false"
            ></input>
            {password && (
              <span
                className={styles.eyeIcon}
                onClick={() => setShowPassword(!showPassword)}
              >
                <i
                  className={`${
                    showPassword ? "fas fa-eye fa-lg" : "fas fa-eye-slash fa-lg"
                  }`}
                ></i>
              </span>
            )}
            <label>Password</label>
          </div>
          {/* Error message */}
          <div className="error-message" style={{ margin: "0px" }}>
            {errors ? errors : null}
          </div>
          <div className={styles.container}>
            {/* Login button */}
            {userName !== AppConfig.GUEST_USERNAME && (
              <button
                className={styles.loginButton}
                style={{ float: "left" }}
                type="submit"
              >
                <span>Login</span>
              </button>
            )}
            {/* Login as Guest button */}
            {userName === AppConfig.GUEST_USERNAME && (
              <button
                className={styles.loginButton}
                style={{ float: "left" }}
                onClick={handleSubmit}
              >
                <span>Login as Guest</span>
              </button>
            )}
          </div>
          <br />
        </form>
        {/* Links */}
        <div className={styles.links}>
          {/* Link For new user registration */}
          <Link
            href={"#"}
            className={styles.link}
            style={{
              float: "left",
              backgroundColor: "#228B22",
              color: "#FFFFFF",
            }}
            onClick={() => alert("Not Implemented")}
          >
            <span>New User ?</span>
          </Link>

          {/* Link for trouble logingin */}
          <Link
            href={"#"}
            className={styles.link}
            style={{
              float: "right",
              backgroundColor: "crimson",
              color: "#FFFFFF",
            }}
            onClick={() => alert("Not Implemented")}
          >
            <span>Cannot Login ?</span>
          </Link>
        </div>
      </div>
    </>
  );
}
