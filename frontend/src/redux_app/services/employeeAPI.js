import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const EmployeeApi = createApi({

    reducerPath: "employeeApi",
    baseQuery: fetchBaseQuery({

        baseUrl: `${import.meta.env.VITE_API_ADDRESS}`,
        prepareHeaders: (headers, { getState }) => {
            const informedConsentLaw1581 = getState("employeeApi.current_user")
            headers.set('Access-Control-Allow-Origin', '*')

            return headers;
        },
    }),
    tagTypes: ['employeeApi'],
    endpoints: (builder) => ({
        getEmployees: builder.query({
            query: () => "/employee",
            retry: 3,
        }),
        getEmployee: builder.query({
            query: (ccn_employee) => `/employee/${ccn_employee}`,
            retry: 3,
        }),
        updatePasswordEmployee: builder.mutation({
            query: (body) => {
                return {
                    url: `/employee/password/${body.ccn_employee}`,
                    method: "PUT",
                    body,
                };
            },
            invalidatesTags: ['employeeApi'],
        }),
    }),
});

export const { useGetEmployeesQuery, useGetEmployeeQuery, useUpdatePasswordEmployeeMutation } = EmployeeApi;