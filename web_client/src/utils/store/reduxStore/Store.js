/** 
 *	#########################################################
 *  										 									
 *      @author : charanteja379                                 			
 *      @email  : charanteja379@gmail.com                                  
 *  	@createedOn : 2023-01-18 00:01:44                               
 *      @lastModifiedOn : 2023-01-18 00:01:45
 *  	@desc   : [description]							
 *  										 								
 *  #########################################################
 */
 
 import {applyMiddleware , createStore} from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers'
import {composeWithDevTools} from 'redux-devtools-extension'

const store = createStore(
    rootReducer, composeWithDevTools(applyMiddleware(thunk))
)

export default store;