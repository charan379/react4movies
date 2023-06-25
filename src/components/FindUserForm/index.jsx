import styles from "./FindUserForm.module.css";
//
import React, { useEffect, useState } from "react";
import { fetchUserAccountStatus } from "@/lib/api/moviebunkers/methods/fetchUserAccountStatus";
import axios from "axios";

const FindUserForm = ({
  id,
  idType,
  setIsLoading,
  setError,
  setUserAccount,
}) => {
  //
  const [searchText, setSearchText] = useState(id || "");
  //
  const [searchOption, setSearchOption] = useState(idType || "userName");
  //
  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
  };

  //
  const handleSearchOptionChange = (event) => {
    setSearchOption(event.target.value);
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
  //
  useEffect(() => {
    const source = axios.CancelToken.source();
    //
    fetchUserAccount(idType, id, source);
    //
    return () => {
      source.cancel();
    };
  }, []);
  //
  return (
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
  );
};

export default FindUserForm;
