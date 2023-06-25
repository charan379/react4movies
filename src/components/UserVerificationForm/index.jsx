import { useEffect, useState } from "react";
import styles from "./VerificationForm.module.css";
import InfoCard from "../InfoCard";
import { resendOtp } from "@/lib/api/moviebunkers/methods/resendOtp";
import { verifyUser } from "@/lib/api/moviebunkers/methods/verifyUser";
import BarsLoadingAnimation from "../BarsLoadingAnimation";

const VerificationForm = (props) => {
  const [userAccount, setUserAccount] = useState({
    userName: props?.user?.userName,
    status: props?.user?.status,
    emailVerified: props?.user?.emailVerified,
    otpExpiration: props?.user?.otpExpiration,
  });
  const [verificationCode, setVerificationCode] = useState("");
  const [infoBoxProps, setInfoBoxProps] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  //
  const handleActivateAccount = async () => {
    try {
      setIsLoading(true);
      const data = await verifyUser({
        userName: userAccount?.userName,
        otp: verificationCode,
      });
      //
      setInfoBoxProps({
        ...infoBoxProps,
        show: true,
        type: "success",
        message: "Account successfully activated !",
      });
      //
      setUserAccount({ ...data?.user });
      //
      if (props?.setUserAccount) {
        props.setUserAccount({ ...data?.user });
      }
    } catch (error) {
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
      if (Date.now() < new Date(userAccount?.otpExpiration).getTime()) {
        setInfoBoxProps({
          ...infoBoxProps,
          show: true,
          type: "info",
          message:
            "An OTP already sent to your registered email address, Please check your spam/junk folder incase not received !",
        });
      } else {
        const data = await resendOtp({
          otpPurpose: "verification",
          userName: userAccount?.userName,
        });
        setInfoBoxProps({
          ...infoBoxProps,
          show: true,
          type: "success",
          message:
            data?.mailSentMessage ||
            "OTP successfully Sent to your registered email address.",
        });
        setUserAccount({
          ...userAccount,
          otpExpiration: data?.user?.otpExpiration,
        });
      }
    } catch (error) {
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
  const handleChange = (e) => {
    setVerificationCode(e.target.value);
  };
  //
  const initialze = () => {
    setUserAccount({ ...props?.user });
  };
  //
  useEffect(() => {
    //
    initialze();
    //
    return () => {};
  }, [props?.user?.emailVerified, props?.user?.userName]);
  //
  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <h1>Account Verification</h1>
      </div>
      {userAccount?.emailVerified === true ? (
        <div className={styles.verifiedContainer}>
          <span className={styles.tickMark}></span>
          <p style={{ fontSize: "1.2rem" }}>Email already verified</p>
        </div>
      ) : (
        <div className={styles.formContainer}>
          <label htmlFor="verification-code">
            Please enter verification code which is sent to you registered email
            address.
          </label>
          <input
            type="text"
            id="verification-code"
            placeholder="Enter verification code"
            value={verificationCode}
            onChange={handleChange}
            className={styles.inputField}
          />
          {/*  */}
          {isLoading && <BarsLoadingAnimation />}
          {/*  */}
          {!isLoading && (
            <div className={styles.buttonContainer}>
              <button
                onClick={handleActivateAccount}
                className={styles.activateButton}
              >
                Activate Account
              </button>
              <button onClick={handleResendOTP} className={styles.resendButton}>
                Resend OTP
              </button>
            </div>
          )}
        </div>
      )}
      {/*  */}
      <InfoCard
        type={infoBoxProps?.type}
        open={infoBoxProps?.show}
        close={() => setInfoBoxProps({ ...infoBoxProps, show: false })}
        message={infoBoxProps?.message}
      />
    </div>
  );
};

export default VerificationForm;
