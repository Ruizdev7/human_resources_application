import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const DiseasesAPI = createApi({

    reducerPath: "DiseasesAPI",
    baseQuery: fetchBaseQuery({

        baseUrl: `${import.meta.env.VITE_API_ADDRESS}`,
        prepareHeaders: (headers, { getState }) => {
            const diseases = getState("DiseasesAPI.current_user")
            headers.set('Access-Control-Allow-Origin', '*')
            return headers;
        },
    }),
    endpoints: (builder) => ({
        getDiseases: builder.query({
            query: (ccn_diseases) => `/diseases/${ccn_diseases}`,
            retry: 3,
        }),
    }),
});

export const { useGetDiseasesQuery } = DiseasesAPI;