import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const MaritalStatusAPI = createApi({

    reducerPath: "MaritalStatusAPI",
    baseQuery: fetchBaseQuery({

        baseUrl: `${import.meta.env.VITE_API_ADDRESS}`,
        prepareHeaders: (headers, { getState }) => {
            const marital_status = getState("MaritalStatusAPI.current_user")
            headers.set('Access-Control-Allow-Origin', '*')
            return headers;
        },
    }),
    endpoints: (builder) => ({
        getMaritalStatus: builder.query({
            query: (ccn_marital_status) => `/marital_status/${ccn_marital_status}`,
            retry: 3,
        }),
    }),
});

export const { useGetMaritalStatusQuery } = MaritalStatusAPI;