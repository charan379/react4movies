import styles from "./AppContainer.module.css";
import React from "react";
import Header from "../Header";
import Footer from "../Footer";
import TopLoadingBar from "../TopLoadingBar";
import SideBar from "../Sidebar";

export default function AppContainer({ children }) {
  return (
    <>
      {/*
                              # App container structure #
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

      <div className={styles.appContainer} data-role="app">
        {/* Top Loading progress bar */}
        <TopLoadingBar />
        {/* header at top */}
        <Header />

        {/* sidebar */}
        <SideBar />

        {/* main content */}
        <div className={styles.outlet} data-role="outlet">
          <div className={styles.contentWrapper}>
            {/* <Outlet /> */}
            {children}
          </div>
          {/* <QuickBall /> */}
        </div>

        <Footer />
      </div>
    </>
  );
}
