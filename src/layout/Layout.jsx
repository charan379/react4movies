import React from "react";
import { Header } from "./header";
import { Outlet } from "react-router-dom";
import { SideBar } from "./sidebar";
import { useTheme } from "hooks";
import { QuickBall } from "features/quick-ball";
import { TopLoadingBar } from "features/top-loading-bar";
import { Footer } from "./footer";


const Layout = () => {
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

export { Layout };
