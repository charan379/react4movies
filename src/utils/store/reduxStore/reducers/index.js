import { combineReducers } from "redux";
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import UserReducer from "./UserReducer";
import TmdbSearchReducer from "./TmdbSearchReducer";
import CollectionSearchReducer from "./CollectionSearchReducer"
import TitleReducer from "./TitleReducer"
import TmdbTitleReducer from "./TmdbTitleReducer"

const rootReducer = combineReducers({
  UserReducer,
  TmdbSearchReducer,
  CollectionSearchReducer,
  TitleReducer,
  TmdbTitleReducer,
});

const persistConfig = {
  key: 'root',
  storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default persistedReducer;
