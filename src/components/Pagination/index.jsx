"use client";

import styles from "./Pagination.module.css";
import React, { useMemo, useState } from "react";
// font awesome library
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
library.add(fas, far, fab);
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { scrollToTop } from "@/lib/utils/scrollToTop";

export function Pagination({ total_pages, currentPage, setPageNo }) {
  const pageNumberLimit = 4;
  const [minPageLimit, setMinPageLimit] = useState(
    currentPage > pageNumberLimit ? currentPage - 2 : 1
  );
  const [maxPageLimit, setMaxPageLimit] = useState(
    currentPage > pageNumberLimit ? currentPage + 2 : pageNumberLimit
  );
  const pages = useMemo(() => {
    const pagesArray = [];
    for (let i = 1; i <= total_pages; i++) {
      pagesArray.push(i);
    }
    return pagesArray;
  }, [total_pages]);

  const handlePageClick = (event) => {
    event.preventDefault();
    scrollToTop();
    switch (event.target.dataset.pageType) {
      case "normal":
        return setPageNo(event.target.dataset.page);
      case "first":
        return (
          <>
            {setPageNo(event.target.dataset.page)}
            {setMaxPageLimit(pageNumberLimit)}
            {setMinPageLimit(0)}
          </>
        );
      case "last":
        return (
          <>
            {setPageNo(event.target.dataset.page)}
            {setMaxPageLimit(event.target.dataset.page)}
            {setMinPageLimit(event.target.dataset.page - pageNumberLimit)}
          </>
        );
      default:
        return null;
    }
  };

  const handlePrevPage = (event) => {
    event.preventDefault();
    if (maxPageLimit - 1 === total_pages) {
      setMaxPageLimit(total_pages);
      setMinPageLimit(total_pages - pageNumberLimit);
      setPageNo(currentPage - 1);
    } else if (maxPageLimit <= pageNumberLimit) {
      setPageNo(currentPage - 1);
    } else {
      setMinPageLimit(minPageLimit - 1);
      setMaxPageLimit(maxPageLimit - 1);
      setPageNo(currentPage - 1);
    }
    scrollToTop();
  };

  const handleNextPage = (event) => {
    event.preventDefault();
    if (currentPage + 1 <= total_pages) {
      if (minPageLimit + 1 >= total_pages - pageNumberLimit) {
        setMaxPageLimit(maxPageLimit + 1);
        setMinPageLimit(total_pages - pageNumberLimit);
      } else {
        setMaxPageLimit(currentPage + pageNumberLimit);
        setMinPageLimit(currentPage);
      }

      setPageNo(currentPage + 1);
    }
    scrollToTop();
  };

  const handlePrevPageGroupClick = (event) => {
    event.preventDefault();
    if (minPageLimit - pageNumberLimit > 1) {
      setMinPageLimit(minPageLimit - pageNumberLimit);
      setMaxPageLimit(maxPageLimit - pageNumberLimit);
      setPageNo(minPageLimit);
    } else {
      setMinPageLimit(0);
      setMaxPageLimit(pageNumberLimit);
      setPageNo(1);
    }
    scrollToTop();
  };

  const handleNextPageGroupClick = (event) => {
    event.preventDefault();
    if (maxPageLimit + pageNumberLimit <= total_pages) {
      setMaxPageLimit(maxPageLimit + pageNumberLimit);
      setMinPageLimit(minPageLimit + pageNumberLimit);
      setPageNo(maxPageLimit + pageNumberLimit);
    } else {
      setMinPageLimit(total_pages - pageNumberLimit);
      setMaxPageLimit(total_pages);
      setPageNo(total_pages);
    }
    scrollToTop();
  };
  return (
    <>
      <div className={styles.pagination}>
        <div className={styles.pages}>
          {/* First Page */}
          {total_pages > 1 ? (
            <button
              data-page={1}
              data-page-type="first"
              className={`${styles.page} ${styles.navigate} ${
                currentPage === 1 ? styles.active : ""
              }`}
              tabIndex="0"
              onClick={handlePageClick}
              data-tooltip={`First page`}
              data-flow="up"
            >
              <FontAwesomeIcon icon={["fas", "fast-backward"]} />
            </button>
          ) : (
            <button
              className={`${styles.page} ${styles.navigate} ${styles.disabled}`}
              disabled={true}
              data-tooltip={`First page`}
              data-flow="up"
              tabIndex="0"
            >
              <FontAwesomeIcon icon={["fas", "fast-backward"]} />
            </button>
          )}

          {/* navigate to previous page */}
          {currentPage > 1 ? (
            <button
              className={`${styles.page} ${styles.navigate}`}
              onClick={handlePrevPage}
              data-tooltip={`Previous page`}
              data-flow="up"
              tabIndex="0"
            >
              <FontAwesomeIcon icon={["fas", "angle-left"]} />
            </button>
          ) : (
            <button
              className={`${styles.page} ${styles.navigate} ${styles.disabled}`}
              disabled={true}
              data-tooltip={`Previous page`}
              data-flow="up"
              tabIndex="0"
            >
              <FontAwesomeIcon icon={["fas", "angle-left"]} />
            </button>
          )}

          {/* prev pages group */}
          {minPageLimit > 1 ? (
            <button
              className={styles.page}
              onClick={handlePrevPageGroupClick}
              data-tooltip={`Previous pages group`}
              data-flow="up"
              tabIndex="0"
            >
              <FontAwesomeIcon icon={["fas", "angle-double-left"]} />
            </button>
          ) : (
            <button
              className={`${styles.page} ${styles.navigate} ${styles.disabled}`}
              disabled={true}
              data-tooltip={`Previous pages group`}
              data-flow="up"
              tabIndex="0"
            >
              <FontAwesomeIcon icon={["fas", "angle-double-left"]} />
            </button>
          )}

          {/* page numbers */}
          {pages.map((page) => {
            if (page <= maxPageLimit && page >= minPageLimit) {
              return (
                <button
                  className={`${styles.page} ${
                    currentPage === page
                      ? `${styles.active} ${styles.disabled}`
                      : ""
                  } `}
                  key={page}
                  data-page={page}
                  data-page-type="normal"
                  tabIndex="0"
                  onClick={handlePageClick}
                  disabled={currentPage === page}
                  data-tooltip={currentPage === page ? "Current Page" : ""}
                  data-flow="up"
                >
                  {page}
                </button>
              );
            } else {
              return null;
            }
          })}

          {/* next pages group */}
          {pages.length > maxPageLimit ? (
            <button
              className={styles.page}
              onClick={handleNextPageGroupClick}
              data-tooltip={`Next pages group`}
              data-flow="up"
              tabIndex="0"
            >
              <FontAwesomeIcon icon={["fas", "angle-double-right"]} />
            </button>
          ) : (
            <button
              className={`${styles.page} ${styles.navigate} ${styles.disabled}`}
              disabled={true}
              data-tooltip={`Next pages group`}
              data-flow="up"
              tabIndex="0"
            >
              <FontAwesomeIcon icon={["fas", "angle-double-right"]} />
            </button>
          )}

          {/* Next Page */}
          {currentPage < total_pages ? (
            <button
              className={`${styles.page} ${styles.navigate}`}
              onClick={handleNextPage}
              data-tooltip={`Next page`}
              data-flow="up"
              tabIndex="0"
            >
              <FontAwesomeIcon icon={["fas", "angle-right"]} />
            </button>
          ) : (
            <button
              className={`${styles.page} ${styles.navigate} ${styles.disabled}`}
              disabled={true}
              data-tooltip={`Next page`}
              data-flow="up"
              tabIndex="0"
            >
              <FontAwesomeIcon icon={["fas", "angle-right"]} />
            </button>
          )}

          {/* last page */}
          {total_pages > 1 ? (
            <button
              data-page={total_pages}
              data-page-type="last"
              className={`${styles.page} ${styles.navigate} ${
                currentPage === total_pages ? styles.active : ""
              }`}
              onClick={handlePageClick}
              data-tooltip={`Last page`}
              data-flow="up"
              tabIndex="0"
            >
              <FontAwesomeIcon icon={["fas", "fast-forward"]} />
            </button>
          ) : (
            <button
              className={`${styles.page} ${styles.navigate} ${styles.disabled}`}
              disabled={true}
              data-tooltip={`Last page`}
              data-flow="up"
              tabIndex="0"
            >
              <FontAwesomeIcon icon={["fas", "fast-forward"]} />
            </button>
          )}
        </div>
      </div>
    </>
  );
}
