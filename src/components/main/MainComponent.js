import React from "react";
import Header from "./Header";
import SideBar from "./SideBar";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import useTheme from "../../utils/hooks/useTheme";

const MainComponent = () => {
  // current theme
  const { theme } = useTheme();
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
