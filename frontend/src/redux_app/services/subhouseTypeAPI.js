import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const SubhouseTypeAPI = createApi({

    reducerPath: "SubhouseTypeAPI",
    baseQuery: fetchBaseQuery({

        baseUrl: `${import.meta.env.VITE_API_ADDRESS}`,
        prepareHeaders: (headers, { getState }) => {
            const subhouse_type = getState("SubhouseTypeAPI.current_user")
            headers.set('Access-Control-Allow-Origin', '*')
            return headers;
        },
    }),
    endpoints: (builder) => ({
        getSubhouseType: builder.query({
            query: (ccn_subhouse_type) => `/subhouse_type/${ccn_subhouse_type}`,
            retry: 3,
        }),
    }),
});

export const { useGetSubhouseTypeQuery } = SubhouseTypeAPI;