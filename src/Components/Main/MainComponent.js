import React from 'react'
import Collection from '../movies/Collection';

import Header from './Header'

const MainComponent = () => {
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
      {/* header at top */}
      <Header />
      {/* main content */}
      <div className='container'>
       <Collection />
      </div>
    </>
  )
}

export default MainComponent;