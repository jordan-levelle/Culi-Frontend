import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
	baseUrl: import.meta.env.VITE_BASE_URL,
	credentials: "include",
});

const apiSlice = createApi({
	baseQuery,
	tagTypes: ["User"],
	endpoints: (builder) => ({}),
});

export default apiSlice;
