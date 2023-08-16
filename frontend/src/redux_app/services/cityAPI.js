import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const CitiesAPI = createApi({

    reducerPath: "CitiesAPI",
    baseQuery: fetchBaseQuery({

        baseUrl: `${import.meta.env.VITE_API_ADDRESS}`,
        prepareHeaders: (headers, { getState }) => {
            const cities = getState("CitiesAPI.current_user")
            headers.set('Access-Control-Allow-Origin', '*')
            return headers;
        },
    }),
    endpoints: (builder) => ({
        getCities: builder.query({
            query: (ccn_city) => `/city/${ccn_city}`,
            retry: 3,
        }),
    }),
});

export const { useGetCitiesQuery } = CitiesAPI;