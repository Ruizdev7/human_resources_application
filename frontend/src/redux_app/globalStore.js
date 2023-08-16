import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import { combineReducers, configureStore } from '@reduxjs/toolkit'
import thunk from 'redux-thunk';


import authReducer from "./role_base_access_control/authSlice";

const rootReducer = combineReducers({
    authState: authReducer,
})

const persistConfig = {
    key: 'root',
    storage,
    whitelist: [
        "authState",
    ]
};


const persistedReducer = persistReducer(persistConfig, rootReducer);

const globalStore = configureStore({
    reducer: persistedReducer,
    middleware: [thunk]
});

export default globalStore;