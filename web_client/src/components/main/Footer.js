/**
 *	#########################################################
 *
 *      @author : charanteja379
 *      @email  : charanteja379@gmail.com
 *  	@createedOn : 2023-01-07 19:18:52
 *      @lastModifiedOn : 2023-01-17 15:37:47
 *  	@desc   : [description]
 *
 *  #########################################################
 */

import React, { useCallback, useContext, useRef, useState } from "react";
import useOnOutSideClick from "../../utils/hooks/useOnOutSideClick";
import user from "../../static/icons/user.svg";
import day from "../../static/icons/day.svg";
import night from "../../static/icons/night.svg";
import { ThemeContext } from "../../utils/store/contextAPI/themeToggler/ThemeContext";
import ToogleTheme from "../../utils/store/contextAPI/themeToggler/ToogleTheme";

const Footer = () => {
  const { theme } = useContext(ThemeContext);

  //  is dropdown open State
  const [isDropdwonOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef();
  useOnOutSideClick(
    dropdownRef,
    useCallback(() => {
      setDropdownOpen(false);
    }, [])
  );
  return (
    <>
      <footer>
        <p style={{textAlign:"center"}}>MovieBunkers</p>
      </footer>
    </>
  );
};

export default Footer;
