import { createApi, fetchBaseQuery, retry } from "@reduxjs/toolkit/query/react";

export const RBACApi = createApi({
	reducerPath: "rbacApi",
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
	tagTypes: ["RBAC"],
	prepareHeaders: (headers, { getState }) => {
		headers.set("Access-Control-Allow-Origin", "*");

		if (token) {
			headers.set("authorization", `Bearer ${token}`);
		}
		headers.set("Access-Control-Allow-Origin", "*");

		return headers;
	},
	endpoints: (builder) => ({
		getRBAC: builder.query({
			query: () => "/rbac",
			retry: 3,
		}),

		getRBACByRole: builder.query({
			query: (ccn_role) => `/rbac/role/${ccn_role}`,
			retry: 3,
			providesTags: ["RBAC"],
		}),

		updatePermissions: builder.mutation({
			query: (body) => ({
				url: `/rbac/${body.ccn_rbac_module}/${body.ccn_role}`,
				method: "put",
				body: body,
			}),
			invalidatesTags: ["RBAC"],
		})
	}),
});

export const { useGetRBACQuery, useGetRBACByRoleQuery, useUpdatePermissionsMutation } = RBACApi;
export const rbacApiReducer = RBACApi.reducer;
export default RBACApi;
