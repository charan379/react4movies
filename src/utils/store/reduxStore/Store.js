import { applyMiddleware, createStore } from "redux";
import {configureStore} from '@reduxjs/toolkit';
import thunk from "redux-thunk";
import { persistStore } from 'redux-persist';
import { composeWithDevTools } from "redux-devtools-extension";
import persistedReducer from "./reducers";

const store = configureStore({
    reducer: persistedReducer,
    middleware: [thunk],
    devTools: process.env.NODE_ENV !== 'production',
})

// const store2 = createStore(
//     persistedReducer,
//   composeWithDevTools(applyMiddleware(thunk))
// );


export const persistor = persistStore(store);

export default store;
