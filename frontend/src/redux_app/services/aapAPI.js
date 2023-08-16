import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const AAPAPI = createApi({

    reducerPath: "AAPAPI",
    baseQuery: fetchBaseQuery({

        baseUrl: `${import.meta.env.VITE_API_ADDRESS}`,
        prepareHeaders: (headers, { getState }) => {
            const aap = getState("AAPAPI.current_user")
            headers.set('Access-Control-Allow-Origin', '*')
            return headers;
        },
    }),
    endpoints: (builder) => ({
        getAap: builder.query({
            query: (ccn_aap) => `/aap/${ccn_aap}`,
            retry: 3,
        }),
    }),
});

export const { useGetAapQuery } = AAPAPI;