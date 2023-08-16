import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const SociodemographicDataAPI = createApi({

    reducerPath: "SociodemographicDataAPI",
    baseQuery: fetchBaseQuery({

        baseUrl: `${import.meta.env.VITE_API_ADDRESS}`,
        prepareHeaders: (headers, { getState }) => {
            const sociodemographic_data = getState("SociodemographicDataAPI.current_user")
            headers.set('Access-Control-Allow-Origin', '*')
            return headers;
        },
    }),
    keepUnusedDataFor: 120,
    refetchOnMountOrArgChange: true,
    refetchOnFocus: true,
    refetchOnReconnect: true,
    pollingInterval: 3000,
    tagTypes: ["SociodemographicData"],
    endpoints: (builder) => ({
        getSociodemographicData: builder.query({
            query: (ccn_employee) => `/sociodemographic_data/employee/${ccn_employee}`,
            retry: 3,
            providesTags: ["SociodemographicData"],
        }),
        getAllSociodemographicData: builder.query({
            query: () => `/sociodemographic_data`,
            retry: 3,
            providesTags: ["SociodemographicData"],
        }),
    }),
});

export const { useGetSociodemographicDataQuery, useGetAllSociodemographicDataQuery } = SociodemographicDataAPI;