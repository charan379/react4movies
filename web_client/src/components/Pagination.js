/**
 *	#########################################################
 *
 *      @author : charanteja379
 *      @email  : charanteja379@gmail.com
 *  	@createedOn : 2023-01-18 22:08:29
 *      @lastModifiedOn : 2023-01-19 17:23:49
 *  	@desc   : [description]
 *
 *  #########################################################
 */

import React, { useContext, useEffect, useMemo, useState } from "react";
import { ThemeContext } from "../utils/store/contextAPI/themeToggler/ThemeContext";

const Pagination = (props) => {
  const {theme} = useContext(ThemeContext);
  const pageNumberLimit = 4;
  const [minPageLimit, setMinPageLimit] = useState(0);
  const [maxPageLimit, setMaxPageLimit] = useState(pageNumberLimit);
  const pages = useMemo(() => {
    const pagesArray = [];
    for (let i = 1; i <= props.data.total_pages; i++) {
      pagesArray.push(i);
    }
    return pagesArray;
  }, [props.data.total_pages]);

  useEffect(() => {
    setMinPageLimit(0);
    setMaxPageLimit(pageNumberLimit);
  }, [props.query]);

  const handlePageClick = (event) => {
    console.log(event.target.dataset.pageType)
    switch (event.target.dataset.pageType) {
      case "normal":
        return props.setPageNo(event.target.dataset.page);
      case "first":
        return (
          <>
            {props.setPageNo(event.target.dataset.page)}
            {setMaxPageLimit(pageNumberLimit)}
            {setMinPageLimit(0)}
          </>
        );
      case "last":
        return (
          <>
            {props.setPageNo(event.target.dataset.page)}
            {setMaxPageLimit(event.target.dataset.page)}
            {setMinPageLimit(
              event.target.dataset.page - pageNumberLimit
            )}
          </>
        );
      default:
        return null;
    }
  };

  const handlePrevPage = () => {
    if (maxPageLimit - 1 === props.data.total_pages) {
      setMaxPageLimit(props.data.total_pages);
      setMinPageLimit(props.data.total_pages - pageNumberLimit);
      props.setPageNo(props.data.currentPage - 1);
    } else if (maxPageLimit <= pageNumberLimit) {
      props.setPageNo(props.data.currentPage - 1);
    } else {
      setMinPageLimit(minPageLimit - 1);
      setMaxPageLimit(maxPageLimit - 1);
      props.setPageNo(props.data.currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (props.data.currentPage + 1 <= props.data.total_pages) {
      if (minPageLimit + 1 >= props.data.total_pages - pageNumberLimit) {
        setMaxPageLimit(maxPageLimit + 1);
        setMinPageLimit(props.data.total_pages - pageNumberLimit);
      } else {
        setMaxPageLimit(props.data.currentPage + pageNumberLimit);
        setMinPageLimit(props.data.currentPage);
      }

      props.setPageNo(props.data.currentPage + 1);
    }
  };

  const handlePrevPageGroupClick = () => {
    if (minPageLimit - pageNumberLimit > 1) {
      setMinPageLimit(minPageLimit - pageNumberLimit);
      setMaxPageLimit(maxPageLimit - pageNumberLimit);
      props.setPageNo(minPageLimit);
    } else {
      setMinPageLimit(0);
      setMaxPageLimit(pageNumberLimit);
      props.setPageNo(1);
    }
  };

  const handleNextPageGroupClick = () => {
    if (maxPageLimit + pageNumberLimit <= props.data.total_pages) {
      setMaxPageLimit(maxPageLimit + pageNumberLimit);
      setMinPageLimit(minPageLimit + pageNumberLimit);
      props.setPageNo(maxPageLimit + pageNumberLimit);
    } else {
      setMinPageLimit(props.data.total_pages - pageNumberLimit);
      setMaxPageLimit(props.data.total_pages);
      props.setPageNo(props.data.total_pages);
    }
  };
  return (
    <>
      <div className="pagination">
        <div className={`pages ${theme}`}>
          {/* First Page */}
          {props.data.total_pages > 1 ? (
            <div
              data-page={1}
              data-page-type="first"
              className={`page navigate ${
                props.data.currentPage === 1 ? "active" : ""
              }`}
              onClick={handlePageClick}
              title="First Page"
            >
              <i data-page={1} data-page-type="first" className="fas fa-fast-backward"></i>
            </div>
          ) : (
            <div
              className="page navigate disabled"
              disabled={true}
              title="Not Available"
            >
              <i className="fas fa-fast-backward"></i>
            </div>
          )}

          {/* navigate to previous page */}
          {props.data.currentPage > 1 ? (
            <div
              className="page navigate"
              onClick={handlePrevPage}
              title="Previous Page"
            >
              <i className="fas fa-angle-left"></i>
            </div>
          ) : (
            <div
              className="page navigate disabled"
              disabled={true}
              title="Previous page not available"
            >
              <i className="fas fa-angle-left"></i>
            </div>
          )}

          {/* prev pages group */}
          {minPageLimit > 1 ? (
            <div
              className="page"
              onClick={handlePrevPageGroupClick}
              title="Previous Pages Set"
            >
              <i className="fas fa-angle-double-left"></i>
            </div>
          ) : (
            <div
              className="page navigate disabled"
              disabled={true}
              title="Previous pages set not available"
            >
              <i className="fas fa-angle-double-left"></i>
            </div>
          )}

          {/* page numbers */}
          {pages.map((page) => {
            // if (page <= maxPageLimit && page >= minPageLimit && (page !== 1 &&page !== Number(props.data.total_pages))
            if (page <= maxPageLimit && page >= minPageLimit) {
              return (
                <div
                  key={page}
                  data-page={page}
                  data-page-type="normal"
                  className={`page ${
                    props.data.currentPage === page ? "active" : ""
                  }`}
                  onClick={handlePageClick}
                >
                  {page}
                </div>
              );
            } else {
              return null;
            }
          })}

          {/* next pages group */}
          {pages.length > maxPageLimit ? (
            <div
              className="page"
              onClick={handleNextPageGroupClick}
              title="Next Pages Set"
            >
              <i className="fas fa-angle-double-right"></i>
            </div>
          ) : (
            <div
              className="page navigate disabled"
              disabled={true}
              title="Next pages set not available"
            >
              <i className="fas fa-angle-double-right"></i>
            </div>
          )}

          {/* Next Page */}
          {props.data.currentPage < props.data.total_pages ? (
            <div
              className="page navigate"
              onClick={handleNextPage}
              title="Next Page"
            >
              <i className="fas fa-angle-right"></i>
            </div>
          ) : (
            <div
              className="page navigate disabled"
              disabled={true}
              title="Next Page Not Available"
            >
              <i className="fas fa-angle-right"></i>
            </div>
          )}

          {/* last page */}
          {props.data.total_pages > 1 ? (
            <div
              data-page={props.data.total_pages}
              data-page-type="last"
              className={`page navigate ${
                props.data.currentPage === props.data.total_pages
                  ? "active"
                  : ""
              }`}
              onClick={handlePageClick}
              title="Last Page"
            >
              <i data-page={props.data.total_pages} data-page-type="last" className="fas fa-fast-forward"></i>
            </div>
          ) : (
            <div
              className="page navigate disabled"
              disabled={true}
              title="Not Available"
            >
              <i className="fas fa-fast-forward"></i>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Pagination;
