"use client";

import styles from "./UserAccountStatus.module.css";
import React, { Suspense, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { fetchUserAccountStatus } from "@/lib/api/moviebunkers/methods/fetchUserAccountStatus";
import BarsLoadingAnimation from "../BarsLoadingAnimation";
import axios from "axios";

const VerificationForm = React.lazy(() => import("../UserVerificationForm"));

const UserAccountStatus = (props) => {
  //
  const [isLoading, setIsLoading] = useState(false);
  //
  const [error, setError] = useState(null);
  //
  const router = useRouter();
  //
  const [searchText, setSearchText] = useState(props.id || "");
  //
  const [searchOption, setSearchOption] = useState(props?.idType || "userName");
  //
  const [userAccount, setUserAccount] = useState(null);
  //
  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
    //  chanage query according to value
    router.push(
      `/user-account-status?${searchOption}=${event.target.value}`,
      undefined,
      {
        shallow: true,
      }
    );
  };
  //
  const handleSearchOptionChange = (event) => {
    setSearchOption(event.target.value);
    //  chanage query according to value
    router.push(
      `/user-account-status?${event.target.value}=${searchText}`,
      undefined,
      {
        shallow: true,
      }
    );
  };
  //
  const fetchUserAccount = async (idType, id, source = { token: null }) => {
    try {
      const data = await fetchUserAccountStatus({
        idType,
        id,
        source,
      });
      setUserAccount({ ...data });
    } catch (error) {
      setError(error?.message);
      // console.error("Error fetching user account:", error?.message);
    } finally {
      setIsLoading(false);
    }
  };
  //
  const handleSearchSubmit = (event) => {
    event.preventDefault();
    setUserAccount(null);
    setError(null);
    setIsLoading(true);
    // Call your API here to fetch the user account based on the search query and option    //
    fetchUserAccount(searchOption, searchText);
  };

  useEffect(() => {
    const source = axios.CancelToken.source();
    //
    fetchUserAccount(props?.idType, props?.id, source);
    //
    return () => {
      source.cancel();
    };
  }, []);

  //
  return (
    <div className={styles.userAccountStatus}>
      {/*  */}
      <div className={styles.topSection}>
        {/*  */}
        <form className={styles.searchForm} onSubmit={handleSearchSubmit}>
          <label className={styles.searchLabel}>
            Search by:
            <select
              className={styles.searchOption}
              value={searchOption}
              onChange={handleSearchOptionChange}
            >
              <option value="userName">Username</option>
              <option value="email">Email</option>
            </select>
          </label>
          <input
            className={styles.searchInput}
            type={searchOption === "userName" ? "text" : "email"}
            placeholder={`Search user account by ${searchOption}...`}
            value={searchText}
            onChange={handleSearchChange}
          />
          <button className={styles.searchButton} type="submit">
            Search 🚀
          </button>
        </form>
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
                  {/* {`Congratulations!💐Your account has been successfully created. Please
                        await activation from our team. Once your account is activated🔓,
                        you'll be able to access all the features and benefits of our
                        website💻. Thank you for joining us🤗`} */}
                  {`Congratulations!💐Your account has been successfully created. Please
                        verify your email account for account activation. Once your account is activated🔓,
                        you'll be able to access all the features and benefits of our
                        website💻. Thank you for joining us🤗`}
                </p>
              )}
              {/* Active */}
              {userAccount?.status === "Active" && (
                <p className={styles.inactiveMessage}>
                  {`Congratulations!💐Your account has been successfully created and activated😊. Now, you will be able to access all the features and benefits of our website💻. Thank you for joining us and welcome aboard!🤗`}
                </p>
              )}
            </div>
            {/*  */}
            <div
              className={`${styles.userCard}`}
              data-status={userAccount?.status.toString().toLowerCase()}
            >
              <h2 className={styles.status}>{userAccount.status}</h2>
              <h3 className={styles.username}>{userAccount.userName}</h3>
            </div>

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
