import { combineReducers } from "redux";
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import DiscoverReducer from "./DiscoverReducer";
import UserReducer from "./UserReducer";


const rootReducer = combineReducers({
  DiscoverReducer,
  UserReducer,
});

const persistConfig = {
  key: 'root',
  storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default persistedReducer;
