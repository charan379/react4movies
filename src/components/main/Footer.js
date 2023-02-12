/**
 *	#########################################################
 *
 *      @author : charanteja379
 *      @email  : charanteja379@gmail.com
 *  	  @createedOn : 2023-01-07 19:18:52
 *      @lastModifiedOn : 2023-01-20 21:53:01
 *  	  @desc   : [description]
 *
 *  #########################################################
 */

import React, {  useContext } from "react";
import { ThemeContext } from "../../utils/store/contextAPI/themeToggler/ThemeContext";
import { Link } from "react-router-dom";

const Footer = () => {
  const { theme } = useContext(ThemeContext);
  return (
    <>
      <div className={`footer ${theme}`}>
        <Link to="#"><b><u>M</u></b>ovie<b><u>B</u></b>unkers-v</Link><code>2.0</code>
      </div>
    </>
  );
};

export default Footer;
