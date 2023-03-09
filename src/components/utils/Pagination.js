import React, { useEffect, useMemo, useRef, useState } from "react";
import useTheme from "../../utils/hooks/useTheme";

const Pagination = ({total_pages, currentPage,resetOn, setPageNo}) => {

  const isMounted = useRef(false);

  const { theme } = useTheme();
  const pageNumberLimit = 4;
  const [minPageLimit, setMinPageLimit] = useState(currentPage > pageNumberLimit ? currentPage - 2 : 1);
  const [maxPageLimit, setMaxPageLimit] = useState(currentPage > pageNumberLimit ? currentPage + 2 : pageNumberLimit);
  const pages = useMemo(() => {
    const pagesArray = [];
    for (let i = 1; i <= total_pages; i++) {
      pagesArray.push(i);
    }
    return pagesArray;
  }, [total_pages]);


  useEffect(() => {
    if (isMounted.current) {
      setMinPageLimit(0);
      setMaxPageLimit(pageNumberLimit);
      setPageNo(1);
    } else {
      isMounted.current = true;
    }
  }, [resetOn]);

  const handlePageClick = (event) => {
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
  };

  const handleNextPage = () => {
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
  };

  const handlePrevPageGroupClick = () => {
    if (minPageLimit - pageNumberLimit > 1) {
      setMinPageLimit(minPageLimit - pageNumberLimit);
      setMaxPageLimit(maxPageLimit - pageNumberLimit);
      setPageNo(minPageLimit);
    } else {
      setMinPageLimit(0);
      setMaxPageLimit(pageNumberLimit);
      setPageNo(1);
    }
  };

  const handleNextPageGroupClick = () => {
    if (maxPageLimit + pageNumberLimit <= total_pages) {
      setMaxPageLimit(maxPageLimit + pageNumberLimit);
      setMinPageLimit(minPageLimit + pageNumberLimit);
      setPageNo(maxPageLimit + pageNumberLimit);
    } else {
      setMinPageLimit(total_pages - pageNumberLimit);
      setMaxPageLimit(total_pages);
      setPageNo(total_pages);
    }
  };
  return (
    <>
      <div className="pagination">
        <div className={`pages ${theme}`}>
          {/* First Page */}
          {total_pages > 1 ? (
            <div
              data-page={1}
              data-page-type="first"
              className={`page navigate ${currentPage === 1 ? "active" : ""
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
          {currentPage > 1 ? (
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
            if (page <= maxPageLimit && page >= minPageLimit) {
              return (
                <div
                  key={page}
                  data-page={page}
                  data-page-type="normal"
                  className={`page ${currentPage === page ? "active" : ""
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
          {currentPage < total_pages ? (
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
          {total_pages > 1 ? (
            <div
              data-page={total_pages}
              data-page-type="last"
              className={`page navigate ${currentPage === total_pages
                  ? "active"
                  : ""
                }`}
              onClick={handlePageClick}
              title="Last Page"
            >
              <i data-page={total_pages} data-page-type="last" className="fas fa-fast-forward"></i>
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
