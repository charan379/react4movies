"use client";

import { useEffect, useState } from "react";
import styles from "./PasswordResetForm.module.css";
import InfoCard from "../InfoCard";
import { resendOtp } from "@/lib/api/moviebunkers/methods/resendOtp";
import BarsLoadingAnimation from "../BarsLoadingAnimation";
import { resetUserPassword } from "@/lib/api/moviebunkers/methods/resetUserPassword";
// font awesome library
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import signupValidations from "@/lib/utils/validations/signUp";
//
const PasswordRestForm = () => {
  //
  const [formData, setFormData] = useState({
    userName: "",
    newPassword: "",
    confirmNewPassword: "",
    otp: "",
  });
  //
  const [errorMessage, setErrorMessage] = useState("");
  //
  const [validForm, setValidForm] = useState(true);
  //
  const [requiredOk, setRequiredOk] = useState(true);
  //
  const [formErrors, setFormErrors] = useState({
    userName: false,
    newPassword: false,
    confirmNewPassword: false,
    otp: false,
  });
  //
  const messages = {
    userName: "Please enter a valid username",
    userNameLen: "Username must contain Min 5 , Max 26 characters",
    userNameSpl:
      "No special characters are allowed other then underscores and periods",
    userNameStarting: "Username can only start with alphabets or underscore",
    password: "Please enter a valid/strong password",
    passwordLen: "Password must contain Min 8 , Max 26 characters",
    passwordStrong:
      "Password must be a combination of atleast 1 speacial character, 1 Uppercase, 1 Lowercase and a number",
    confirmPassword: "Passwords doesn't match",
    invalidForm: "Please enter all required details",
  };
  //
  const [infoBoxProps, setInfoBoxProps] = useState({});
  //
  const [isLoading, setIsLoading] = useState(false);
  //
  const [showPassword, setShowPassword] = useState(false);
  //
  const handlePasswordReset = async () => {
    try {
      //
      setIsLoading(true);
      // Perform form validation
      if (
        !formData.userName ||
        !formData.newPassword ||
        !formData.confirmNewPassword ||
        !formData.otp
      ) {
        //
        setRequiredOk(false);
        //
        return;
        //
      }
      //
      const data = await resetUserPassword({
        userName: formData?.userName,
        otp: formData?.otp,
        newPassword: formData?.newPassword,
      });
      //
      setInfoBoxProps({
        ...infoBoxProps,
        show: true,
        type: "success",
        message: "Password successfully changed !",
      });
      //
    } catch (error) {
      setErrorMessage(error?.message ?? "Somthing went wrong");
      setInfoBoxProps({
        ...infoBoxProps,
        show: true,
        type: "info",
        message: `${error?.message} !`,
      });
    } finally {
      setIsLoading(false);
    }
  };
  //
  const handleResendOTP = async () => {
    try {
      setIsLoading(true);
      {
        const data = await resendOtp({
          otpPurpose: "password",
          userName: formData?.userName,
        });
        setInfoBoxProps({
          ...infoBoxProps,
          show: true,
          type: "success",
          message:
            data?.mailSentMessage ||
            "OTP successfully Sent to your registered email address.",
        });
        setFormData({
          ...formData,
          otpExpiration: data?.user?.otpExpiration,
        });
      }
    } catch (error) {
      let message;
      if (error?.message?.trim() === "OTP Already Sent") {
        message =
          "An OTP already sent to your registered email address, Please check your spam/junk folder incase not received !";
      } else {
        message = error?.message ?? "Somthing went wrong";
      }
      setInfoBoxProps({
        ...infoBoxProps,
        show: true,
        type: "info",
        message: `${message} !`,
      });
    } finally {
      setIsLoading(false);
    }
  };
  //
  const handleChange = (e) => {
    e.preventDefault();
    const name = e?.target?.id?.trim();
    const value = e?.target?.value?.trim();
    validateForm(name, value);
    setFormData({ ...formData, [name]: value });
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
      case "newPassword":
        if (!signupValidations.validPassword(value)) {
          errors = { ...errors, newPassword: messages.passwordStrong };
          // length
          if (value?.length < 8 || value?.length > 26) {
            errors = {
              ...errors,
              newPassword: `${messages.passwordLen}`,
            };
          }
          setValidForm(false);
        } else {
          errors = { ...errors, newPassword: false };
        }
        break;
      //
      case "confirmNewPassword":
        if (value !== formData.newPassword) {
          errors = { ...errors, confirmNewPassword: messages.confirmPassword };
          setValidForm(false);
        } else {
          errors = { ...errors, confirmNewPassword: false };
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
      <div className={styles.container}>
        <div className={styles.title}>
          <h1>Password Reset</h1>
        </div>
        <div className={styles.formContainer}>
          {/* userName */}
          {formErrors?.userName && (
            <div className="error-message" data-error={true}>
              {formErrors.userName}
            </div>
          )}
          <div className={styles.inputBox}>
            <input
              type="text"
              id="userName"
              value={formData?.userName}
              onChange={handleChange}
              className={styles.inputField}
            />
            <label htmlFor="userName">Username</label>
          </div>
          {/* New Password */}
          {formErrors?.newPassword && (
            <div className="error-message" data-error={true}>
              {formErrors.newPassword}
            </div>
          )}
          <div className={styles.inputBox}>
            <input
              type={showPassword ? "text" : "password"}
              id="newPassword"
              value={formData?.newPassword}
              onChange={handleChange}
              className={styles.inputField}
            />
            <label htmlFor="newPassword">New Password</label>
            {formData?.newPassword && (
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
          </div>
          {/* Confirm new password */}
          {formErrors?.confirmNewPassword && (
            <div className="error-message" data-error={true}>
              {formErrors.confirmNewPassword}
            </div>
          )}
          <div className={styles.inputBox}>
            <input
              type="password"
              id="confirmNewPassword"
              value={formData?.confirmNewPassword}
              onChange={handleChange}
              className={styles.inputField}
            />
            <label htmlFor="confirmNewPassword">Confirm Password</label>
          </div>
          {/* OTP */}
          {formErrors?.otp && (
            <div className="error-message" data-error={true}>
              {formErrors.otp}
            </div>
          )}
          <div className={styles.inputBox}>
            <input
              type="text"
              id="otp"
              value={formData?.otp}
              onChange={handleChange}
              className={styles.inputField}
            />
            <label htmlFor="otp">Verification code</label>
          </div>
          {/*  */}
          {!requiredOk && (
            <div className="error-message" data-error={!requiredOk}>
              {messages.invalidForm}
            </div>
          )}
          {/*  */}
          {errorMessage && (
            <div className="error-message" data-error={true}>
              {errorMessage}
            </div>
          )}
          {/*  */}
          {isLoading && <BarsLoadingAnimation />}
          {/*  */}
          {!isLoading && (
            <div className={styles.buttonContainer}>
              <button
                onClick={handlePasswordReset}
                className={styles.resetButton}
                disabled={!validForm}
              >
                Reset Password
              </button>
              <button
                onClick={handleResendOTP}
                className={styles.resendButton}
                disabled={formData?.userName?.length > 4 ? false : true}
              >
                Send OTP
              </button>
            </div>
          )}
        </div>
      </div>
      {/*  */}
      <InfoCard
        type={infoBoxProps?.type}
        open={infoBoxProps?.show}
        close={() => setInfoBoxProps({ ...infoBoxProps, show: false })}
        message={infoBoxProps?.message}
      />
    </>
  );
};

export default PasswordRestForm;
