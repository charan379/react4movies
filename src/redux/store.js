import { combineReducers, configureStore } from '@reduxjs/toolkit';
import createWebStorage from 'redux-persist/lib/storage/createWebStorage';
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist';

import cartReducer from './features/cart/cartSlice';
import themeReducer from './features/theme/themeSlice';
import progressBarReducer from './features/progressbar/progressBarSlice';

const createNoopStorage = () => {
    return {
        getItem(_key) {
            return Promise.resolve(null);
        },
        setItem(_key, value) {
            return Promise.resolve(value);
        },
        removeItem(_key) {
            return Promise.resolve();
        },
    };
};

const storage =
    typeof window !== 'undefined'
        ? createWebStorage('local')
        : createNoopStorage();

const persistConfig = {
    key: 'root',
    storage,
};

const rootReducer = combineReducers({
    cart: cartReducer,
    theme: themeReducer,
    progressbar: progressBarReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});

export const persistor = persistStore(store);