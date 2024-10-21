import { configureStore } from "@reduxjs/toolkit";
import {
	persistReducer,
	persistStore,
	FLUSH,
	REHYDRATE,
	PAUSE,
	PERSIST,
	PURGE,
	REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

import rootReducer from "./reducer";

// Configuration for redux-persist
const persistConfig = {
	key: "root", // key is required
	version: 1,
	storage, // storage is required
};

// Create a persisted reducer using redux-persist
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure the Redux store with @reduxjs/toolkit
export const store = configureStore({
	reducer: persistedReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: {
				// Ignore certain actions during serialization check
				ignoredActions: [
					FLUSH,
					REHYDRATE,
					PAUSE,
					PERSIST,
					PURGE,
					REGISTER,
				],
			},
		}),
});

// Create a persistor to persist the Redux store
export const persistor = persistStore(store);
