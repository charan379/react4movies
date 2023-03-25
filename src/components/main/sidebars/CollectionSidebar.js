import axios from "axios";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import ReactSlider from "react-slider";
import { Config } from "../../../utils/Config";
import useCollectionSearch from "../../../utils/hooks/useCollectionSearch";
import useTheme from "../../../utils/hooks/useTheme";
import ReactSelector from "./ReactSelector";
import iso from "../../../utils/iso369-1.json";
import scrollToTop from "../../../utils/scrollToTop";

const CollectionSidebar = () => {
  const { theme } = useTheme();

  const { collectionQuery, setCollectionQuery } = useCollectionSearch();

  const handleChange = (event) => {
    setCollectionQuery({
      ...collectionQuery,
      [event.target.dataset.id]: event.target.value,
      pageNo: 1,
    });
    scrollToTop();
  };

  const handleAgeChange = (ageLimit) => {
    setCollectionQuery({
      ...collectionQuery,
      "age.gte": ageLimit[0],
      "age.lte": ageLimit[1],
      pageNo: 1,
    });
    scrollToTop();
  };

  const handleFilterToggle = (event) => {
    setCollectionQuery({
      ...collectionQuery,
      [event.target.dataset.id]: event.target.dataset.toggle,
      pageNo: 1,
    });
    scrollToTop();
  };

  const handleSelectChange = (selectedOption, event) => {
    setCollectionQuery({
      ...collectionQuery,
      [event.name]: selectedOption.value,
      pageNo: 1,
    });
    scrollToTop();
  };

  const allLanguages = [{ value: "", label: "All" }];
  const allGenres = [{ value: "", label: "All" }];

  useEffect(() => {
    const source = axios.CancelToken.source();
    axios
      .get(`${Config.MOVIEBUNKERS_API}/titles/available-languages`, {
        cancelToken: source.token,
      })
      .then((res) => {
        if (res?.data && res?.data?.length) {
          res.data.forEach((element) => {
            allLanguages.push({
              value: element?.ISO_639_1_code,
              label: element?.english_name,
            });
          });
        }
      })
      .catch((err) => {});

    return () => {
      source.cancel();
    };
  }, [allLanguages]);

  useEffect(() => {
    const source = axios.CancelToken.source();
    axios
      .get(`${Config.MOVIEBUNKERS_API}/titles/available-genres`, {
        cancelToken: source.token,
      })
      .then((res) => {
        if (res?.data && res?.data?.length) {
          res.data.forEach((element) => {
            allGenres.push({ value: element, label: element });
          });
        }
      })
      .catch((err) => {});

    return () => {
      source.cancel();
    };
  }, [allGenres]);

  return (
    <form className="sidebar-form">
      {/* title */}
      <li className={`menu-item ${theme}`}>
        <i className="fa fa-search icon"></i>
        <input
          data-form="collectionQueryForm"
          data-id="search"
          name="search"
          type="text"
          value={collectionQuery.search}
          placeholder="Search..."
          onChange={handleChange}
        />
      </li>

      {/* genre react-select */}
      <li className="menu-item-header">
        <span className="nonlink-menu-item-info">Genre</span>
      </li>
      <li className={`menu-item ${theme}`}>
        <i className="fas fa-th icon"></i>
        <label className={`sidebar-select ${theme}`} htmlFor="genre">
          <ReactSelector
            name={"genre"}
            handleSelectChange={handleSelectChange}
            selectedOption={{
              value: collectionQuery.genre,
              label: collectionQuery.genre ? collectionQuery.genre : "All",
            }}
            options={allGenres}
          />
        </label>
      </li>

      {/* language react-select */}
      <li className="menu-item-header">
        <span className="nonlink-menu-item-info">Language</span>
      </li>
      <li className={`menu-item ${theme}`}>
        <i className="fas fa-language icon"></i>
        <label className={`sidebar-select ${theme}`} htmlFor="language">
          <ReactSelector
            name={"language"}
            handleSelectChange={handleSelectChange}
            selectedOption={{
              value: collectionQuery.language,
              label: collectionQuery.language
                ? iso.map((lang) => {
                    if (lang["639_1_code"] === collectionQuery.language) {
                      return lang["english_name"];
                    }
                  })
                : "All",
            }}
            options={allLanguages}
          />
        </label>
      </li>

      {/* Sort By*/}
      <li className="menu-item-header">
        <span className="nonlink-menu-item-info">Sort By</span>
      </li>
      <li className={`menu-item ${theme}`}>
        <i className={`fas fa-sort-alpha-down icon`} />
        <label className={`sidebar-select ${theme}`} htmlFor="sort_by">
          <select
            data-form="collectionQueryForm"
            data-id="sort_by"
            name="sort_by"
            required="required"
            onChange={handleChange}
            value={collectionQuery.sort_by}
            tabIndex="-1"
          >
            <option value="year.desc">Year Desc</option>
            <option value="year.asc">Year Asc</option>
            <option value="createdAt.desc">Added Desc</option>
            <option value="createdAt.asc">Added Asc</option>
          </select>
        </label>
      </li>

      {/* per page limit , results per-page*/}
      <li className="menu-item-header">
        <span className="nonlink-menu-item-info">Results per page</span>
      </li>
      <li className={`menu-item ${theme}`}>
        <i className={`icon text`}>{collectionQuery.limit}</i>
        <label className={`sidebar-select ${theme}`} htmlFor="limit">
          <select
            data-form="collectionQueryForm"
            data-id="limit"
            name="limit"
            required="required"
            onChange={handleChange}
            value={collectionQuery.limit}
            tabIndex="-1"
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={15}>15</option>
            <option value={20}>20</option>
            <option value={25}>25</option>
            <option value={30}>30</option>
          </select>
        </label>
      </li>

      {/* age slider */}
      <li className="menu-item-header">
        <span className="nonlink-menu-item-info">Age filter</span>
      </li>
      <li className={`menu-item ${theme}`}>
        <i className="fas fa-users icon"></i>
        <ReactSlider
          data-form="collectionQueryForm"
          data-id="age"
          className={`horizontal-slider ${theme}`}
          thumbClassName="range-slider-thumb"
          trackClassName={`range-slider-track`}
          defaultValue={[
            collectionQuery?.["age.gte"] ?? 0,
            collectionQuery?.["age.lte"] ?? 26,
          ]}
          max={26}
          min={0}
          minDistance={5}
          renderThumb={(props, state) => <div {...props}>{state.valueNow}</div>}
          onChange={handleAgeChange}
        />
      </li>

      {/* Filter By*/}
      <li className="menu-item-header">
        <span className="nonlink-menu-item-info">Filter By</span>
      </li>
      <li className={`menu-item ${theme}`}>
        <i className={`fas fa-filter icon closed`} />

        {collectionQuery?.movie == 1 && (
          <Link
            className={`fas fa-film icon menu-item`}
            data-id="movie"
            data-name="movie"
            data-value={1}
            data-toggle={0}
            title="filters with movies"
            aria-hidden="false"
            onClick={handleFilterToggle}
          />
        )}

        {collectionQuery?.movie == 0 && (
          <Link
            className={`fas fa-film icon menu-item`}
            data-id="movie"
            data-name="movie"
            data-value={0}
            data-toggle={1}
            title="filters without movies"
            aria-hidden="false"
            onClick={handleFilterToggle}
          />
        )}

        {collectionQuery?.tv == 1 && (
          <Link
            className={`fas fa-tv icon menu-item`}
            data-id="tv"
            data-name="tv"
            data-value={1}
            data-toggle={0}
            title="filters with tv shows"
            aria-hidden="false"
            onClick={handleFilterToggle}
          />
        )}

        {collectionQuery?.tv == 0 && (
          <Link
            className={`fas fa-tv icon menu-item`}
            data-id="tv"
            data-name="tv"
            data-value={0}
            data-toggle={1}
            title="filters without tv shows"
            aria-hidden="false"
            onClick={handleFilterToggle}
          />
        )}

        {collectionQuery?.seen == 1 && (
          <Link
            className={`fas fa-eye icon menu-item`}
            data-id="seen"
            data-name="seen"
            data-value={1}
            data-toggle={-1}
            title="filters seen titles"
            aria-hidden="false"
            onClick={handleFilterToggle}
          />
        )}

        {collectionQuery?.seen == -1 && (
          <Link
            className={`fas fa-eye-slash icon menu-item`}
            data-id="seen"
            data-name="seen"
            data-value={-1}
            data-toggle={0}
            title="filters unseen titles"
            aria-hidden="false"
            onClick={handleFilterToggle}
          />
        )}

        {collectionQuery?.seen == 0 && (
          <Link
            className={`far fa-eye icon menu-item`}
            data-id="seen"
            data-name="seen"
            data-value={0}
            data-toggle={1}
            title="filter disabled"
            aria-hidden="false"
            onClick={handleFilterToggle}
          />
        )}

        {collectionQuery?.favourite == 1 && (
          <Link
            className={`fas fa-heart icon menu-item`}
            data-id="favourite"
            data-name="favourite"
            data-value={1}
            data-toggle={0}
            title="filters favourite titles"
            aria-hidden="false"
            onClick={handleFilterToggle}
          />
        )}

        {collectionQuery?.favourite == 0 && (
          <Link
            className={`far fa-heart icon menu-item`}
            data-id="favourite"
            data-name="favourite"
            data-value={0}
            data-toggle={1}
            title="filter disabled"
            aria-hidden="false"
            onClick={handleFilterToggle}
          />
        )}

        {collectionQuery?.starred == 1 && (
          <Link
            className={`fas fa-star icon menu-item`}
            data-id="starred"
            data-name="starred"
            data-value={1}
            data-toggle={0}
            title="filters starred titles"
            aria-hidden="false"
            onClick={handleFilterToggle}
          />
        )}

        {collectionQuery?.starred == 0 && (
          <Link
            className={`far fa-star icon menu-item`}
            data-id="starred"
            data-name="starred"
            data-value={0}
            data-toggle={1}
            title="filter disabled"
            aria-hidden="false"
            onClick={handleFilterToggle}
          />
        )}
      </li>
    </form>
  );
};

export default CollectionSidebar;
