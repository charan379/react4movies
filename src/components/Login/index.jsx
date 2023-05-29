"use client";

import styles from "./Login.module.css";
import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useToastify } from "@/lib/hooks/useToastify";
import BarsLoadingAnimation from "../BarsLoadingAnimation";

export default function Login() {
  // Import hooks and components
  const [isLoading, setIsLoading] = useState(false);
  const [userName, setUsername] = useState(""); // set the initial value of the username to the guest username from the AppConfig
  const [password, setPassword] = useState(""); // set the initial value of the password to the guest password from the AppConfig
  const [errors, setErrors] = useState(""); // set the initial value of the error message to an empty string
  const [showPassword, setShowPassword] = useState(false);
  //
  const { ToastContainer, toastContainerOptions, toast } = useToastify(); // get the ToastContainer, options and toast function from the ToastifyProvider
  //
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleSubmit = async (event) => {
    // Prevent default form submission
    event.preventDefault();
    setErrors("");
    setIsLoading(true);

    try {
      const response = await signIn("credentials", {
        username: userName,
        password: password,
        redirect: false,
      });

      if (response?.status !== 200 || response?.error) {
        setErrors(response?.error);
        toast.error(response?.error ?? "Somthing went wrong", {
          autoClose: 3500,
          position: "top-right",
          closeButton: true,
          closeOnClick: true,
        });
        return;
      }

      if (response?.status === 200) {
        if (!!searchParams.has("callbackUrl")) {
          const callbackUrl = new URL(searchParams.get("callbackUrl"));
          router.push(`${callbackUrl.pathname}`, {
            query: {
              ...Object.fromEntries(callbackUrl.searchParams.entries()),
            },
          });
          return;
        } else {
          if (response?.status === 200) router.back();
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
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
              autocomplete="off"
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
              autocomplete="off"
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
          <div
            className="error-message"
            data-error={!!errors}
            style={{ margin: "0px" }}
          >
            {errors ? errors : null}
          </div>

          <div className={styles.container}>
            {/* Login button */}
            {!isLoading && (
              <button
                className={styles.loginButton}
                style={{ float: "left" }}
                type="submit"
              >
                <span>Login</span>
              </button>
            )}

            {isLoading && <BarsLoadingAnimation />}
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
      {/* Toast container */}
      <ToastContainer {...toastContainerOptions} />
    </>
  );
}
