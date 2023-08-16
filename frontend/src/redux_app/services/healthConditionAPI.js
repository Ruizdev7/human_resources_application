import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const HealthConditionApi = createApi({

    reducerPath: "HealthConditionApi",
    baseQuery: fetchBaseQuery({

        baseUrl: `${import.meta.env.VITE_API_ADDRESS}`,
        prepareHeaders: (headers, { getState }) => {
            const health_condition = getState("HealthConditionApi.current_user")
            headers.set('Access-Control-Allow-Origin', '*')

            return headers;
        },
    }),
    keepUnusedDataFor: 120,
    refetchOnMountOrArgChange: true,
    refetchOnFocus: true,
    refetchOnReconnect: true,
    pollingInterval: 3000,
    tagTypes: ["HealthCondition"],
    endpoints: (builder) => ({
        getHealthCondition: builder.query({
            query: (ccn_employee) => `/health_condition/employee/${ccn_employee}`,
            retry: 3,
            providesTags: ["HealthCondition"],
        }),
        getAllHealthCondition: builder.query({
            query: () => `/health_condition`,
            retry: 3,
            providesTags: ["HealthCondition"],
        }),
    }),
});

export const { useGetHealthConditionQuery, useGetAllHealthConditionQuery } = HealthConditionApi;