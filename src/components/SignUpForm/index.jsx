"use client";

import signupValidations from "@/lib/utils/validations/signUp";
import styles from "./SignUpForm.module.css"; // Import the CSS file for styling
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { createUser } from "@/lib/api/moviebunkers/methods/createUser";
import BarsLoadingAnimation from "../BarsLoadingAnimation";
import { useToastify } from "@/lib/hooks/useToastify";

const SignUpForm = () => {
  //
  const router = useRouter();
  //
  const [isLoading, setIsLoading] = useState(false);
  //
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  //
  const [errorMessage, setErrorMessage] = useState("");
  //
  const [formErrors, setFormErrors] = useState({
    userName: false,
    email: false,
    password: false,
    confirmPassword: false,
  });
  //
  const messages = {
    userName: "Please enter a valid username !",
    email: "Please enter a valid email !",
    password: "Please enter a valid/strong password !",
    confirmPassword: "Passwords doesn't match !",
    invalidForm: "Please enter all required details",
  };
  //
  const [validForm, setValidForm] = useState(true);
  //
  const [requiredOk, setRequiredOk] = useState(true);
  //
  const { userName, email, password, confirmPassword } = formData;
  //
  const { toast, toastContainerOptions, ToastContainer } = useToastify();
  //
  const signup = async (user) => {
    // Show a loading toast message while signing up api rurring
    const toastId = toast.loading("Signing Up...");
    try {
      setIsLoading(true);
      const data = await createUser({ user });
      // Update the toast message to indicate that the user has successfully signed up
      toast.update(toastId, {
        render: `Account created successfully`,
        type: "success",
        isLoading: false,
        autoClose: 3000,
        closeButton: true,
        closeOnClick: true,
      });
      //
      return data;
      //
    } catch (error) {
      // Update the toast message to indicate error message
      toast.update(toastId, {
        render: error?.message ?? "Somthing went wrong",
        type: "error",
        isLoading: false,
        autoClose: 3000,
        closeButton: true,
        closeOnClick: true,
      });
      //
      setErrorMessage(error?.message ?? "Somthing went wrong");
      //
    } finally {
      //
      setIsLoading(false);
      //
    }
  };
  //
  const handleSubmit = async (event) => {
    //
    event.preventDefault();
    // Perform form validation
    if (
      !formData.userName ||
      !formData.email ||
      !formData.email ||
      !formData.confirmPassword
    ) {
      //
      setRequiredOk(false);
      //
      return;
      //
    }
    //
    // submit form to api
    const signUpResult = await signup(formData);

    if (signUpResult?.user?.userName) {
      // display toast about Redirecting
      toast.info("Redirecting to verification page...", {
        autoClose: 3500,
        position: "top-right",
        closeButton: true,
        closeOnClick: true,
      });
      //
      setTimeout(() => {
        //  Navigate to account status page after sign up
        router.push(
          `/user-account-status?userName=${signUpResult?.user?.userName}`,
          undefined
        );
      }, 500);
      //
    } else {
      //
      return;
      //
    }
  };
  //
  const handleChange = (e) => {
    const { name, value } = e.target;
    validateForm(name, value);
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  //
  const validateForm = (name, value) => {
    //
    if (errorMessage) {
      setErrorMessage("");
    }
    //
    setRequiredOk(true);
    //
    let errors;
    //
    switch (name) {
      case "userName":
        if (!signupValidations.validUsername(value, 20, 5)) {
          errors = { ...errors, userName: true };
          setValidForm(false);
        } else {
          errors = { ...errors, userName: false };
        }
        break;
      //
      case "email":
        if (!signupValidations.validEmail(value)) {
          errors = { ...errors, email: true };
          setValidForm(false);
        } else {
          errors = { ...errors, email: false };
        }
        break;
      //
      case "password":
        if (!signupValidations.validPassword(value)) {
          errors = { ...errors, password: true };
          setValidForm(false);
        } else {
          errors = { ...errors, password: false };
        }
        break;
      //
      case "confirmPassword":
        if (value !== formData.password) {
          errors = { ...errors, confirmPassword: true };
          setValidForm(false);
        } else {
          errors = { ...errors, confirmPassword: false };
        }
        break;
      //
      default:
        break;
    }

    setFormErrors({ ...formErrors, ...errors });

    if (
      Object.values({ ...formErrors, ...errors }).every(
        (error) => error === false
      )
    ) {
      setValidForm(true);
    } else {
      setValidForm(false);
    }
  };
  //
  return (
    <>
      <form className={styles.signupForm} onSubmit={handleSubmit}>
        {/*  */}
        <h2>Sign Up / Register</h2>
        {/*  */}
        {formErrors.userName && (
          <span
            style={{ marginBottom: "10px" }}
            className={"error-message"}
            data-error={formErrors.userName}
          >
            {messages.userName}
          </span>
        )}
        <div className={styles.inputBox}>
          <input
            type="text"
            id="userName"
            name="userName"
            value={userName}
            onChange={handleChange}
            autoComplete="off"
          />
          <label htmlFor="userName">Username</label>
        </div>
        {/*  */}
        {formErrors.email && (
          <span
            style={{ marginBottom: "10px" }}
            className={"error-message"}
            data-error={formErrors.email}
          >
            {messages.email}
          </span>
        )}
        <div className={styles.inputBox}>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={handleChange}
            autoComplete="off"
          />
          <label htmlFor="email">Email</label>
        </div>
        {/*  */}
        {formErrors.password && (
          <span
            style={{ marginBottom: "10px" }}
            className={"error-message"}
            data-error={formErrors.password}
          >
            {messages.password}
          </span>
        )}
        <div className={styles.inputBox}>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={handleChange}
            autoComplete="off"
          />
          <label htmlFor="password">Password</label>
        </div>
        {/*  */}
        {formErrors.confirmPassword && (
          <span
            style={{ marginBottom: "10px" }}
            className={"error-message"}
            data-error={formErrors.confirmPassword}
          >
            {messages.confirmPassword}
          </span>
        )}
        <div className={styles.inputBox}>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={confirmPassword}
            onChange={handleChange}
            autoComplete="off"
          />
          <label htmlFor="confirmPassword">Confirm Password</label>
        </div>
        {/*  */}
        {!requiredOk && (
          <span className={"error-message"} data-error={!requiredOk}>
            {messages.invalidForm}
          </span>
        )}
        {/*  */}
        {errorMessage && (
          <span className={"error-message"} data-error={true}>
            {errorMessage}
          </span>
        )}
        {/*  */}
        {isLoading ? (
          <>
            <BarsLoadingAnimation />
          </>
        ) : (
          <>
            <button
              className={styles.submitButton}
              disabled={!validForm}
              type="submit"
            >
              Sign Up
            </button>
          </>
        )}
        {/*  */}
      </form>
      {/*  */}
      {/* Toast container */}
      <ToastContainer {...toastContainerOptions} />
    </>
  );
};

export default SignUpForm;
