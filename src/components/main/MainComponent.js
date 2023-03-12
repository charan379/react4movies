import React from "react";
import Header from "./Header";
import SideBar from "./SideBar";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import useTheme from "../../utils/hooks/useTheme";
import QuickBall from "./QuickBall";

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
          <QuickBall />
        </div>

        <Footer />
      </div>
    </>
  );
};

export default MainComponent;
