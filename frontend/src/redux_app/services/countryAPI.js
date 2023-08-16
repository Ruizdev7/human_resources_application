import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const CountriesAPI = createApi({

    reducerPath: "CountriesAPI",
    baseQuery: fetchBaseQuery({

        baseUrl: `${import.meta.env.VITE_API_ADDRESS}`,
        prepareHeaders: (headers, { getState }) => {
            const countries = getState("CountriesAPI.current_user")
            headers.set('Access-Control-Allow-Origin', '*')
            return headers;
        },
    }),
    endpoints: (builder) => ({
        getCountries: builder.query({
            query: () => "/country",
            retry: 3,
        }),
    }),
});

export const { useGetCountriesQuery } = CountriesAPI;