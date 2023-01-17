/** 
 *	#########################################################
 *  										 									
 *      @author : charanteja379                                 			
 *      @email  : charanteja379@gmail.com                                  
 *  	@createedOn : 2023-01-17 23:56:14                               
 *      @lastModifiedOn : 2023-01-17 23:58:36
 *  	@desc   : [description]							
 *  										 								
 *  #########################################################
 */
 
 const initialState = {
    queryString : "",
    titleType : "",
    year : ""
}


const DiscoverReducer = (state = initialState, action) => {
    const {type, payload} = action;
    switch(type) {
        case "UPDATE_DISCOVER_QUERY" : {
            return {...state, ...payload}
        }
        default :
            return state;
    }
}

export default DiscoverReducer;