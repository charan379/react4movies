

import React, { useContext } from 'react'
import Collection from '../movies/Collection';
import { ThemeContext } from '../store/contextAPI/themeToggler/ThemeContext';

import Header from './Header'

const MainComponent = () => {

  // current theme
  const {theme} = useContext(ThemeContext)
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
      {/* main content */}
      <div className={`container ${theme}`}>
       <Collection />
      </div>
    </div>
    </>
  )
}

export default MainComponent;