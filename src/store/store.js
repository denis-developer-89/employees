import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./reducers";
// import {logger} from 'redux-logger';
import thunk from "redux-thunk";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "state",
  storage:storage,
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
