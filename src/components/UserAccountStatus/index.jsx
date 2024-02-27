"use client";

import styles from "./UserAccountStatus.module.css";
import React, { Suspense, useState } from "react";
import BarsLoadingAnimation from "../BarsLoadingAnimation";
import FindUserForm from "../FindUserForm";
import UserStatusCard from "../UserStatusCard";
import Link from "next/link";

const VerificationForm = React.lazy(() => import("../UserVerificationForm"));

const UserAccountStatus = (props) => {
  //
  const [isLoading, setIsLoading] = useState(false);
  //
  const [error, setError] = useState(null);
  //
  const [userAccount, setUserAccount] = useState(null);
  //
  return (
    <div className={styles.userAccountStatus}>
      {/*  */}
      <div className={styles.topSection}>
        {/*  */}
        <FindUserForm
          id={props?.id}
          idType={props?.idType}
          setIsLoading={(bool) => setIsLoading(bool)}
          setError={(error) => setError(error)}
          setUserAccount={(userAccount) => setUserAccount(userAccount)}
        />
      </div>
      {/*  */}
      <div className={styles.loaderSection}>
        {isLoading && <BarsLoadingAnimation />}
      </div>
      {/*  */}
      {userAccount?.userName && !isLoading ? (
        <>
          {/* LEFT SECTION */}
          <div className={styles.leftSection}>
            <div className={styles.welcomeMessageSection}>
              {/* say hi */}
              <h2>{`Hi, ${userAccount?.userName}💞`}</h2>
              {/* Inactive */}
              {userAccount?.status === "Inactive" && (
                <p className={styles.inactiveMessage}>
                  {`Congratulations!💐Your account has been successfully created. Please
                        verify your email account for account activation. Once your account is activated🔓,
                        you'll be able to access all the features and benefits of our
                        website💻. Thank you for joining us🤗`}
                </p>
              )}
              {/* Active */}
              {userAccount?.status === "Active" && (
                <>
                <p className={styles.inactiveMessage}>
                  {`Congratulations!💐Your account has been successfully created and activated😊. Now, you will be able to access all the features and benefits of our website💻. Thank you for joining us and welcome aboard!🤗`}
                </p>
                <Link className={styles.loginLink} href="/">Click here to login !</Link>
                </>
              )}
            </div>
            {/*  */}
            <UserStatusCard
              status={userAccount?.status}
              userName={userAccount?.userName}
            />
            {/*  */}
            {userAccount?.status === "Inactive" && (
              <>
                <p className={styles.inactiveMessage}>
                  Your account seems to be Inactive / Not activated yet🔐.
                </p>
                <p className={styles.inactiveMessage}>
                  Incase facing any issues,Please follow up with our team🤖 for
                  account activation.
                </p>
              </>
            )}
          </div>
          {/* RIGHT SECTION  */}
          <div className={styles.rightSection}>
            {userAccount?.userName && (
              <Suspense fallback={<BarsLoadingAnimation />}>
                <VerificationForm
                  user={{ ...userAccount }}
                  setUserAccount={(data) => setUserAccount({ ...data })}
                />
              </Suspense>
            )}
          </div>
        </>
      ) : (
        <div className={styles.errorSection}>
          <p className={styles.noAccountMessage}>No user account found.</p>
          {error && <p className={styles.noAccountMessage}>{error}</p>}
        </div>
      )}
    </div>
  );
};

export default UserAccountStatus;
