import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const DemographicDataApi = createApi({

    reducerPath: "DemographicDataApi",
    baseQuery: fetchBaseQuery({

        baseUrl: `${import.meta.env.VITE_API_ADDRESS}`,
        prepareHeaders: (headers, { getState }) => {
            const demographic_data = getState("DemographicDataApi.current_user")
            headers.set('Access-Control-Allow-Origin', '*')

            return headers;
        },
    }),
    keepUnusedDataFor: 120,
    refetchOnMountOrArgChange: true,
    refetchOnFocus: true,
    refetchOnReconnect: true,
    pollingInterval: 3000,
    tagTypes: ["demographicData"],
    endpoints: (builder) => ({
        getDemographicData: builder.query({
            query: (ccn_demographic_data) => `/demographic_data/employee/${ccn_demographic_data}`,
            retry: 3,
        }),
        getAllDemographicData: builder.query({
            query: () => `/demographic_data`,
            retry: 3,
            providesTags: ["demographicData"],
        }),
    }),
});

export const { useGetDemographicDataQuery, useGetAllDemographicDataQuery } = DemographicDataApi;