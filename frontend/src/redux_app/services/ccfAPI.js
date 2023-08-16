import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const CCFAPI = createApi({

    reducerPath: "CCFAPI",
    baseQuery: fetchBaseQuery({

        baseUrl: `${import.meta.env.VITE_API_ADDRESS}`,
        prepareHeaders: (headers, { getState }) => {
            const ccf = getState("CCFAPI.current_user")
            headers.set('Access-Control-Allow-Origin', '*')
            return headers;
        },
    }),
    endpoints: (builder) => ({
        getCcf: builder.query({
            query: (ccn_ccf) => `/ccf/${ccn_ccf}`,
            retry: 3,
        }),
    }),
});

export const { useGetCcfQuery } = CCFAPI;