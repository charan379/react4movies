/**
 *	#########################################################
 *
 *      @author : charanteja379
 *      @email  : charanteja379@gmail.com
 *  	@createedOn : 2023-01-17 13:39:06
 *      @lastModifiedOn : 2023-01-17 23:56:33
 *  	@desc   : [description]
 *
 *  #########################################################
 */

import React, { useContext } from "react";
import { ThemeContext } from "../../utils/store/contextAPI/themeToggler/ThemeContext";
import MoviesList from "./MoviesList";

const Discover = () => {
  const { theme } = useContext(ThemeContext);
  return (
    <>
      <div className="row">
        <div className={`col-md-12 collection-wrapper ${theme}`}>
          <div id="results">
            <MoviesList />
          </div>
        </div>
      </div>
    </>
  );
};

export default Discover;
