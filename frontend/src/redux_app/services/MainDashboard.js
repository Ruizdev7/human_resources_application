import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const MainDashboardAPI = createApi({

    reducerPath: "MainDashboardAPI",
    baseQuery: fetchBaseQuery({

        baseUrl: `${import.meta.env.VITE_API_ADDRESS}`,
        prepareHeaders: (headers, { getState }) => {
            const main_dashboard = getState("MainDashboardAPI.current_user")
            headers.set('Access-Control-Allow-Origin', '*')
            return headers;
        },
    }),

    keepUnusedDataFor: 120,
    refetchOnMountOrArgChange: true,
    refetchOnFocus: true,
    refetchOnReconnect: true,
    pollingInterval: 3000,
    tagTypes: ["main_dashboard"],

    endpoints: (builder) => ({
        getMainDashboard: builder.query({
            query: () => `metrics_for_main_data`,
            retry: 3,
            providesTags: ["main_dashboard"]
        }),
    }),

});

export const { useGetMainDashboardQuery } = MainDashboardAPI;