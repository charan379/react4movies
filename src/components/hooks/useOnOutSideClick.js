/** 
 *	#########################################################
 *  										 									
 *      @author : charanteja379                                 			
 *      @email  : charanteja379@gmail.com                                  
 *  	@createedOn : 2023-01-07 19:27:59                               
 *      @lastModifiedOn : 2023-01-07 19:28:02
 *  	@desc   : [description]							
 *  										 								
 *  #########################################################
 */
 

import { useEffect } from "react";

function useOnOutSideClick(ref, handlerFunc) {
    useEffect(
        () => {
            const listner = (event) => {
                // Do nothing if clicking ref's element or descendent elements
                if (!ref.current ||ref.current.contains(event.target)) {
                    // console.log(event.target)
                    // console.log(ref.current)
                    return;
                }
                // console.log(event.target)
                // console.log(ref.current)
                handlerFunc();
            }
                
            document.addEventListener("mousedown", listner);
            document.addEventListener("touchstart", listner)

            return () => {
                document.addEventListener("mousedown", listner);
                document.addEventListener("touchstart", listner)
            }
        }, [ref,handlerFunc]
    )
}

export default useOnOutSideClick;