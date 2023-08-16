import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const RHAPI = createApi({

    reducerPath: "RHAPI",
    baseQuery: fetchBaseQuery({

        baseUrl: `${import.meta.env.VITE_API_ADDRESS}`,
        prepareHeaders: (headers, { getState }) => {
            const rh = getState("RHAPI.current_user")
            headers.set('Access-Control-Allow-Origin', '*')
            return headers;
        },
    }),
    endpoints: (builder) => ({
        getRH: builder.query({
            query: (ccn_rh) => `/rh/${ccn_rh}`,
            retry: 3,
        }),
    }),
});

export const { useGetRHQuery } = RHAPI;