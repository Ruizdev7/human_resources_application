import { createApi, fetchBaseQuery, retry } from "@reduxjs/toolkit/query/react";

export const rolesApi = createApi({
	reducerPath: "rolesApi",
	baseQuery: retry(
		fetchBaseQuery({
			baseUrl: `${import.meta.env.VITE_API_ADDRESS}`,
			prepareHeaders: (headers, { getState }) => {
				const roles = getState("rolesApi.current_user")
				headers.set('Access-Control-Allow-Origin', '*')
				return headers;
			},
		}),
		{
			maxRetries: 1,
		}
	),


	endpoints: (builder) => ({
		getRoles: builder.query({
			query: () => "/role",
			retry: 3,
		}),
		getRolesByID: builder.query({
			query: (ccn_role) => `/role/${ccn_role}`,
			retry: 3,
		}),
	}),
});

export const { useGetRolesQuery, useGetRolesByIDQuery } = rolesApi;