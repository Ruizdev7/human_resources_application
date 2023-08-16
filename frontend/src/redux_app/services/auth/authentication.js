import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const authIAPApi = createApi({

    reducerPath: "authIAPApi",
    baseQuery: fetchBaseQuery({

        baseUrl: `${import.meta.env.VITE_API_AUTH}`,
        prepareHeaders: (headers, { getState }) => {
            const auth_IAP = getState("authIAPApi.current_user")
            headers.set('Access-Control-Allow-Origin', '*')

            return headers;
        },
    }),
    keepUnusedDataFor: 120,
    refetchOnMountOrArgChange: true,
    refetchOnFocus: true,
    refetchOnReconnect: true,
    pollingInterval: 3000,
    tagTypes: ['authIAPApi'],
    endpoints: (builder) => ({
        loginUserIAP: builder.mutation({
            query: (body) => {
                return {
                    url: "login_employee/token",
                    method: "POST",
                    body,
                };
            },
            invalidatesTags: ['authIAPApi'],
        }),
        updateLaw1581: builder.mutation({
            query: (body) => {
                return {
                    url: `employee/informed_consent_law_1581/${body.ccn_employee}`,
                    method: "PUT",
                    body,
                };
            },
            invalidatesTags: ['authIAPApi'],
        }),
        addNewUser: builder.mutation({
            query: (body) => {
                return {
                    url: "create_new_user",
                    method: "POST",
                    body,
                };
            },
            invalidatesTags: ['authIAPApi'],
        }),
        addRole: builder.mutation({
            query: (body) => {
                return {
                    url: `role_assignment/${body.ccn_employee}`,
                    method: "PUT",
                    body,
                };
            },
            invalidatesTags: ['authIAPApi'],
        }),
        updateEmployeeCredentials: builder.mutation({
            query: (body) => {
                return {
                    url: `/employee/update_credentials/${body.ccn_employee}`,
                    method: "PUT",
                    body,
                };
            },
            invalidatesTags: ['authIAPApi'],
        }),
        updateIsActive: builder.mutation({
            query: (body) => {
                return {
                    url: `/employee/is_active_employee/${body.ccn_employee}`,
                    method: "PUT",
                    body,
                };
            },
            invalidatesTags: ['authIAPApi'],
        }),
        updatePassword: builder.mutation({
            query: (body) => {
                return {
                    url: `/employee/password/${body.ccn_employee}`,
                    method: "PUT",
                    body,
                };
            },
            invalidatesTags: ['authIAPApi'],
        }),


    }),
});

export const { useUpdateLaw1581Mutation, useLoginUserIAPMutation, useAddNewUserMutation, useAddRoleMutation, useUpdateEmployeeCredentialsMutation, useUpdateIsActiveMutation, useUpdatePasswordMutation } = authIAPApi;