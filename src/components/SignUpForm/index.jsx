"use client";

import styles from "./SignUpForm.module.css"; // Import the CSS file for styling
import signupValidations from "@/lib/utils/validations/signUp";
import React, { useState } from "react";
import { createUser } from "@/lib/api/moviebunkers/methods/createUser";
import BarsLoadingAnimation from "../BarsLoadingAnimation";
import { useToastify } from "@/lib/hooks/useToastify";
import InfoCard from "../InfoCard";
//
// font awesome library
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const SignUpForm = () => {
  //
  const [isLoading, setIsLoading] = useState(false);
  //
  const [infoBoxProps, setInfoBoxProps] = useState({});
  //
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  //
  const [showPassword, setShowPassword] = useState(false);
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
    userName: "Please enter a valid username",
    userNameLen: "Username must contain Min 5 , Max 26 characters",
    userNameSpl:
      "No special characters are allowed other then underscores and periods",
    userNameStarting: "Username can only start with alphabets or underscore",
    email: "Please enter a valid email",
    password: "Please enter a valid/strong password",
    passwordLen: "Password must contain Min 8 , Max 26 characters",
    passwordStrong:
      "Password must be a combination of atleast 1 speacial character, 1 Uppercase, 1 Lowercase and a number",
    confirmPassword: "Passwords doesn't match",
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
      //  Open Modal
      setInfoBoxProps({
        show: true,
        type: "error",
        message: `${error?.message ?? "Somthing went wrong"}`,
        show: true,
      });
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
      //
      setTimeout(() => {
        //  Open Modal
        setInfoBoxProps({
          show: true,
          type: "success",
          message:
            "Congratulations!💐Your account has been successfully created. Please verify your account to get started.",
          link: `/user-account-status?userName=${signUpResult?.user?.userName}`,
          linkText: "Verify Your Account",
          show: true,
        });
      }, 100);
      //
    } else {
      //
      return;
      //
    }
  };
  //
  const handleChange = (e) => {
    const name = e?.target?.name?.trim();
    const value = e?.target?.value;
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
        if (!signupValidations.validUsername(value)) {
          // genric message
          errors = { ...errors, userName: messages.userName };
          // length
          if (value?.length < 5 || value?.length > 26) {
            errors = {
              ...errors,
              userName: `${messages.userNameLen}`,
            };
          }
          // starting char
          if (!/^[a-zA-Z_]/.test(value)) {
            errors = {
              ...errors,
              userName: `${messages.userNameStarting}`,
            };
          }
          // other special chars
          if (!/^[a-zA-Z0-9._]+$/.test(value)) {
            errors = {
              ...errors,
              userName: `${messages.userNameSpl}`,
            };
          }
          setValidForm(false);
        } else {
          errors = { ...errors, userName: false };
        }
        break;
      //
      case "email":
        if (!signupValidations.validEmail(value)) {
          errors = { ...errors, email: messages.email };
          setValidForm(false);
        } else {
          errors = { ...errors, email: false };
        }
        break;
      //
      case "password":
        if (!signupValidations.validPassword(value)) {
          errors = { ...errors, password: messages.passwordStrong };
          // length
          if (value?.length < 8 || value?.length > 26) {
            errors = {
              ...errors,
              password: `${messages.passwordLen}`,
            };
          }
          setValidForm(false);
        } else {
          errors = { ...errors, password: false };
        }
        break;
      //
      case "confirmPassword":
        if (value !== formData.password) {
          errors = { ...errors, confirmPassword: messages.confirmPassword };
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
            data-error={formErrors.userName ? true : false}
          >
            {formErrors.userName}
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
            data-error={formErrors.email ? true : false}
          >
            {formErrors.email}
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
            data-error={formErrors.password ? true : false}
          >
            {formErrors.password}
          </span>
        )}
        <div className={styles.inputBox}>
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            name="password"
            value={password}
            onChange={handleChange}
            autoComplete="off"
          />
          {formData?.password && (
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
          <label htmlFor="password">Password</label>
        </div>
        {/*  */}
        {formErrors.confirmPassword && (
          <span
            style={{ marginBottom: "10px" }}
            className={"error-message"}
            data-error={formErrors.confirmPassword ? true : false}
          >
            {formErrors.confirmPassword}
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
      <InfoCard
        type={infoBoxProps?.type}
        message={infoBoxProps?.message}
        link={infoBoxProps?.link}
        open={infoBoxProps?.show}
        linkText={infoBoxProps?.linkText}
        close={() => setInfoBoxProps({ show: false })}
      />
      {/* Toast container */}
      <ToastContainer {...toastContainerOptions} />
    </>
  );
};

export default SignUpForm;
