/** 
 *	#########################################################
 *  										 									
 *      @author : charanteja379                                 			
 *      @email  : charanteja379@gmail.com                                  
 *  	@createedOn : 2023-01-17 23:58:52                               
 *      @lastModifiedOn : 2023-01-17 23:58:53
 *  	@desc   : [description]							
 *  										 								
 *  #########################################################
 */
 
 export const updateDiscoverQuery = (queryObject) =>{
    return {
        type : "UPDATE_DISCOVER_QUERY",
        payload : queryObject
    }
}