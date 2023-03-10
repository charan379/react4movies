/**
 *	#########################################################
 *
 *      @author : charanteja379
 *      @email  : charanteja379@gmail.com
 *  	  @createedOn : 2023-01-07 19:28:45
 *      @lastModifiedOn : 2023-02-07 15:32:12
 *  	  @desc   : [description]
 *
 *  #########################################################
 */

import React, { useContext } from "react";
import { ThemeContext } from "../../utils/store/contextAPI/themeToggler/ThemeContext";

import Header from "./Header";
import SideBar from "./SideBar";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";

const MainComponent = () => {
  // current theme
  const { theme } = useContext(ThemeContext);
  return (
    <>
      {/*                         Author @Charan379
                              # main component structure #
    ###########################################################################################
    #             #                                                                           #
    #             #                        Header                                             #       
    #             #                                                                           #
    #             # ###########################################################################                                                                          
    #  Side Bar   #                                                                           #      
    #             #                                                                           #
    #             #                    Content (OutLet)                                       #
    #             #                                                                           #
    #             #                                                                           #
    #             #                                                                           #
    #             #############################################################################  
    #             #                                                                           #
    #             #                      Footer                                               #    
    #             #                                                                           #  
    ############################################################################################
    
    */}

      <div className={`main-component ${theme}`}>
        {/* header at top */}
        <Header />

        {/* sidebar */}
        <SideBar />

        {/* main content */}
        <div className={`main-container ${theme}`}>
          <div className={`content-wrapper ${theme}`}>
            <Outlet />
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
};

export default MainComponent;
