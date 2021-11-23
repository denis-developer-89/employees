import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./reducers";
// import {logger} from 'redux-logger';
import thunk from "redux-thunk";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";

const persistConfig = {
  key: "state",
  storage,
};
const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => {
    return [...getDefaultMiddleware({ serializableCheck: false }), thunk];
  },
  devTools: process.env.NODE_ENV !== "production",
});

export default store;
