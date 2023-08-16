import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const RaceAPI = createApi({

    reducerPath: "RaceAPI",
    baseQuery: fetchBaseQuery({

        baseUrl: `${import.meta.env.VITE_API_ADDRESS}`,
        prepareHeaders: (headers, { getState }) => {
            const race = getState("RaceAPI.current_user")
            headers.set('Access-Control-Allow-Origin', '*')
            return headers;
        },
    }),
    endpoints: (builder) => ({
        getRace: builder.query({
            query: (ccn_race) => `/race/${ccn_race}`,
            retry: 3,
        }),
    }),
});

export const { useGetRaceQuery } = RaceAPI;