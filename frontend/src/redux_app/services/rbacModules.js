import { createApi, fetchBaseQuery, retry } from "@reduxjs/toolkit/query/react";

export const RBACModulesApi = createApi({
	reducerPath: "rbacModulesApi",

	baseQuery: retry(
		fetchBaseQuery({
			baseUrl: `${import.meta.env.VITE_API_ADDRESS}`,
		}),

		{
			maxRetries: 1,
		}
	),
	keepUnusedDataFor: 120,
	refetchOnMountOrArgChange: true,
	refetchOnFocus: true,
	refetchOnReconnect: true,
	pollingInterval: 3000,
	prepareHeaders: (headers, { getState }) => {
		headers.set("Access-Control-Allow-Origin", "*");

		if (token) {
			headers.set("authorization", `Bearer ${token}`);
		}

		return headers;
	},
	endpoints: (builder) => ({
		getRBACModules: builder.query({
			query: () => "/rbac_modules",

			retry: 3,
		}),
	}),
});

export const { useGetRBACModulesQuery } = RBACModulesApi;

export const rbacModulesApiReducer = RBACModulesApi.reducer;

export default RBACModulesApi;
