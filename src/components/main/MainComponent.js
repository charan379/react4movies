/**
 *	#########################################################
 *
 *      @author : charanteja379
 *      @email  : charanteja379@gmail.com
 *  	  @createedOn : 2023-01-07 19:28:45
 *      @lastModifiedOn : 2023-01-10 22:35:39
 *  	  @desc   : [description]
 *
 *  #########################################################
 */

import React, { useContext } from "react";
import Collection from "../movies/Collection";
import { ThemeContext } from "../store/contextAPI/themeToggler/ThemeContext";

import Header from "./Header";
import SideBar from "./SideBar";

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
        <div className={`container ${theme}`}>
          <Collection />
        </div>
      </div>
    </>
  );
};

export default MainComponent;
