/** 
 *	#########################################################
 *  										 									
 *      @author : charanteja379                                 			
 *      @email  : charanteja379@gmail.com                                  
 *  	@createedOn : 2023-01-18 00:02:02                               
 *      @lastModifiedOn : 2023-01-18 00:02:02
 *  	@desc   : [description]							
 *  										 								
 *  #########################################################
 */
 
 import {combineReducers} from 'redux';
import DiscoverReducer from './DiscoverReducer';

const rootReducer = combineReducers({
    DiscoverReducer,
})

export default rootReducer;