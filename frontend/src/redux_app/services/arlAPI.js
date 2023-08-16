import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const ARLAPI = createApi({

    reducerPath: "ARLAPI",
    baseQuery: fetchBaseQuery({

        baseUrl: `${import.meta.env.VITE_API_ADDRESS}`,
        prepareHeaders: (headers, { getState }) => {
            const arl = getState("ARLAPI.current_user")
            headers.set('Access-Control-Allow-Origin', '*')
            return headers;
        },
    }),
    endpoints: (builder) => ({
        getArl: builder.query({
            query: (ccn_arl) => `/arl/${ccn_arl}`,
            retry: 3,
        }),
    }),
});

export const { useGetArlQuery } = ARLAPI;