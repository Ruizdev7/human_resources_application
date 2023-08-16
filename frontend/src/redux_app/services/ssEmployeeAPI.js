import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const SsEmployeeApi = createApi({

    reducerPath: "SsEmployeeApi",
    baseQuery: fetchBaseQuery({

        baseUrl: `${import.meta.env.VITE_API_ADDRESS}`,
        prepareHeaders: (headers, { getState }) => {
            const ss_employeeApi = getState("SsEmployeeApi.current_user")
            headers.set('Access-Control-Allow-Origin', '*')

            return headers;
        },
    }),
    keepUnusedDataFor: 120,
    refetchOnMountOrArgChange: true,
    refetchOnFocus: true,
    refetchOnReconnect: true,
    pollingInterval: 3000,
    tagTypes: ["SSEmployee"],
    endpoints: (builder) => ({
        getSsEmployee: builder.query({
            query: (ccn_employee) => `/ss_employee/employee/${ccn_employee}`,
            retry: 3,
            providesTags: ["SSEmployee"],
        }),
        getAllSsEmployee: builder.query({
            query: () => `/ss_employee`,
            retry: 3,
            providesTags: ["SSEmployee"],
        }),
    }),
});

export const { useGetSsEmployeeQuery, useGetAllSsEmployeeQuery } = SsEmployeeApi;