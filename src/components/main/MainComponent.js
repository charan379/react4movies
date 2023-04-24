import React from "react";
import Header from "./Header";
import SideBar from "./SideBar";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import useTheme from "../../utils/hooks/useTheme";
import QuickBall from "./QuickBall";
import TopLoadingBar from "../utils/TopLoadingBar";

const MainComponent = () => {
  // current theme
  const { theme } = useTheme();
  return (
    <>
      {/*
                              # main component structure #
    ###########################################################################################
    #                           Top Loading/Progress Bar                                      # 
    ###########################################################################################
    #             #                                                                           #
    #             #                        Header                                             #       
    #             #                                                                           #
    #             # ###########################################################################                                                                          
    #  Side Bar   #                                                                           #      
    #             #                                                                           #
    #             #                    Content (OutLet)                                       #
    #             #                                                                           #
    #             #                                                             # # # # # # # #
    #             #                                                             #  Quick Ball #
    #             #############################################################################  
    #             #                      Footer                                               #    
    ############################################################################################
    
    */}

      <div className={`main-component ${theme}`}>
        {/* Top Loading progress bar */}
        <TopLoadingBar />
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
