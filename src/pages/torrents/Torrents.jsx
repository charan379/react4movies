import React from "react";
import { Link, useSearchParams } from "react-router-dom";
import { TorrentList } from "./TorrentList";
import { Pagination } from "components/common";
import { useTheme } from "hooks";

const Torrents = () => {
  const { theme } = useTheme();
  const [searchParams, setSearchParams] = useSearchParams();

  const handleSearch = (event) => {
    event.preventDefault();
    searchParams.set(
      event.target.name,
      event.target.value || event.target.dataset.name || ""
    );
    console.log(searchParams.get(event.target.name));
    setSearchParams(searchParams);
    setPageNo(1);
  };

  const setPageNo = (pageNo) => {
    searchParams.set("pageNo", pageNo);
    setSearchParams(searchParams);
  };
  return (
    <>
      <div>
        <input
          type={"text"}
          placeholder={"Search"}
          name="query"
          value={searchParams?.get("query") ?? ""}
          onChange={(event) => handleSearch(event)}
        ></input>

        <div className={`torrent-container ${theme}`}>
          <div className={`providers ${theme}`}>
            <Link
              className={`provider ${"1337x" === searchParams.get("provider")}`}
              name="provider"
              data-name="1337x"
              onClick={(event) => handleSearch(event)}
            >
              1337x
            </Link>
            <Link
              className={`provider ${"rarbg" === searchParams.get("provider")}`}
              name="provider"
              data-name="rarbg"
              onClick={(event) => handleSearch(event)}
            >
              RARBG
            </Link>
            <Link
              className={`provider ${"piratebay" === searchParams.get("provider")
                }`}
              name="provider"
              data-name="piratebay"
              onClick={(event) => handleSearch(event)}
            >
              Pirate Bay
            </Link>
          </div>

          {/* Torrent List */}
          <TorrentList
            query={searchParams.get("query")}
            pageNo={searchParams.get("pageNo")}
            provider={searchParams.get("provider")}
          />
        </div>

        <Pagination
          total_pages={10}
          currentPage={parseInt(searchParams.get("pageNo")) || 1}
          setPageNo={setPageNo}
        />
      </div>
    </>
  );
}

export { Torrents };
