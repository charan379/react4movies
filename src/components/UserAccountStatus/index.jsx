"use client";

import styles from "./UserAccountStatus.module.css";
import React, { useState } from "react";

const UserAccountStatus = () => {
  const [searchText, setSearchText] = useState("");
  const [searchOption, setSearchOption] = useState("username");
  const [userAccount, setUserAccount] = useState(null);

  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
  };

  const handleSearchOptionChange = (event) => {
    setSearchOption(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    // Call your API here to fetch the user account based on the search query and option
    // Example code:
    const fetchUserAccount = async () => {
      try {
        // const response = await fetch(`API_URL?${searchOption}=${searchText}`);
        // const data = await response.json();
        setUserAccount({
          status: "Inactive",
          username: "John Doe",
        });
      } catch (error) {
        console.error("Error fetching user account:", error);
      }
    };

    fetchUserAccount();
  };

  return (
    <div className={styles.userAccountStatus}>
      <form className={styles.searchForm} onSubmit={handleSearchSubmit}>
        <label className={styles.searchLabel}>
          Search by:
          <select
            className={styles.searchOption}
            value={searchOption}
            onChange={handleSearchOptionChange}
          >
            <option value="username">Username</option>
            <option value="email">Email</option>
          </select>
        </label>
        <input
          className={styles.searchInput}
          type="text"
          placeholder={`Search user account by ${searchOption}...`}
          value={searchText}
          onChange={handleSearchChange}
        />
        <button className={styles.searchButton} type="submit">
          Search
        </button>
      </form>

      {userAccount ? (
        <div
          className={`${styles.userCard}`}
          data-status={userAccount?.status.toString().toLowerCase()}
        >
          <h2 className={styles.status}>{userAccount.status}</h2>
          <h3 className={styles.username}>{userAccount.username}</h3>
        </div>
      ) : (
        <p className={styles.noAccountMessage}>No user account found.</p>
      )}
    </div>
  );
};

export default UserAccountStatus;
