import { combineReducers } from "redux";
import DiscoverReducer from "./DiscoverReducer";
import UserReducer from "./UserReducer";

const rootReducer = combineReducers({
  DiscoverReducer,
  UserReducer,
});

export default rootReducer;
