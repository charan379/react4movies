import {configureStore} from '@reduxjs/toolkit';
import thunk from "redux-thunk";
import { persistStore } from 'redux-persist';
import persistedReducer from "./reducers";

const store = configureStore({
    reducer: persistedReducer,
    middleware: [thunk],
    devTools: process.env.NODE_ENV !== 'production',
})


export const persistor = persistStore(store);

export default store;
