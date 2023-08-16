import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const AFPAPI = createApi({

    reducerPath: "AFPAPI",
    baseQuery: fetchBaseQuery({

        baseUrl: `${import.meta.env.VITE_API_ADDRESS}`,
        prepareHeaders: (headers, { getState }) => {
            const afp = getState("AFPAPI.current_user")
            headers.set('Access-Control-Allow-Origin', '*')
            return headers;
        },
    }),
    endpoints: (builder) => ({
        getAfp: builder.query({
            query: (ccn_afp) => `/afp/${ccn_afp}`,
            retry: 3,
        }),
    }),
});

export const { useGetAfpQuery } = AFPAPI;