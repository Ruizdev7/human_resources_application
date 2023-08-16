import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const EPSAPI = createApi({

    reducerPath: "EPSAPI",
    baseQuery: fetchBaseQuery({

        baseUrl: `${import.meta.env.VITE_API_ADDRESS}`,
        prepareHeaders: (headers, { getState }) => {
            const eps = getState("EPSAPI.current_user")
            headers.set('Access-Control-Allow-Origin', '*')
            return headers;
        },
    }),
    endpoints: (builder) => ({
        getEps: builder.query({
            query: (ccn_eps) => `/eps/${ccn_eps}`,
            retry: 3,
        }),
    }),
});

export const { useGetEpsQuery } = EPSAPI;