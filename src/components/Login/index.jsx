"use client";

import styles from "./Login.module.css";
import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import { useToastify } from "@/lib/hooks/useToastify";
import BarsLoadingAnimation from "../BarsLoadingAnimation";
//
// font awesome library
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
//

export default function Login() {
  // Import hooks and components
  const { status: authStatus } = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const [userName, setUsername] = useState(""); 
  const [password, setPassword] = useState("");
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
              autoComplete="off"
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
              autoComplete="off"
            ></input>
            {password && (
              <span
                className={styles.eyeIcon}
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <FontAwesomeIcon icon={faEye} size="lg" />
                ) : (
                  <FontAwesomeIcon icon={faEyeSlash} size="lg" />
                )}
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
            {!isLoading && authStatus !== "authenticated" && (
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

          {authStatus === "authenticated" ? <div className={styles.successMessage}>
            Successully Logged In,
            <br />
            Redirecting to requested page, if not redirected 
            <Link className={styles.loginLink} href={searchParams.get("callbackUrl") ?? "/"}>
              Click Here
            </Link>
          </div>
            : ""}
          <br />
        </form>
        {/* Links */}
        <div className={styles.links}>
          {/* Link For new user registration */}
          <Link
            href={"/signup"}
            className={styles.link}
            style={{
              float: "left",
              backgroundColor: "#228B22",
              color: "#FFFFFF",
            }}
          >
            <span>New User ?</span>
          </Link>

          {/* Link for trouble logingin */}
          <Link
            href={"/password-reset"}
            className={styles.link}
            style={{
              float: "right",
              backgroundColor: "crimson",
              color: "#FFFFFF",
            }}
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
