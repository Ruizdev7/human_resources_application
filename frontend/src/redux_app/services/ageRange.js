import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const AgeRangeAPI = createApi({

    reducerPath: "AgeRangeAPI",
    baseQuery: fetchBaseQuery({

        baseUrl: `${import.meta.env.VITE_API_ADDRESS}`,
        prepareHeaders: (headers, { getState }) => {
            const age_range = getState("AgeRangeAPI.current_user")
            headers.set('Access-Control-Allow-Origin', '*')
            return headers;
        },
    }),
    endpoints: (builder) => ({
        getAgeRange: builder.query({
            query: (ccn_age_range) => `/age_range/${ccn_age_range}`,
            retry: 3,
        }),
    }),
});

export const { useGetAgeRangeQuery } = AgeRangeAPI;