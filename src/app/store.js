import { configureStore } from "@reduxjs/toolkit";
import apiSlice from "./api/apiSlice.";
import { setupListeners } from "@reduxjs/toolkit/dist/query";

const store = configureStore({
	reducer: {
		[apiSlice.reducerPath]: apiSlice.reducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(apiSlice.middleware),
	devTools: import.meta.env.VITE_NODE_ENV !== "production",
});

setupListeners(store.dispatch);

export default store;
