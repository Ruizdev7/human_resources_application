import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const TypeIdAPI = createApi({

    reducerPath: "TypeIdAPI",
    baseQuery: fetchBaseQuery({

        baseUrl: `${import.meta.env.VITE_API_ADDRESS}`,
        prepareHeaders: (headers, { getState }) => {
            const type_id = getState("TypeIdAPI.current_user")
            headers.set('Access-Control-Allow-Origin', '*')
            return headers;
        },
    }),
    endpoints: (builder) => ({
        getTypeId: builder.query({
            query: (ccn_type_id) => `/type_id/${ccn_type_id}`,
            retry: 3,
        }),
    }),
});

export const { useGetTypeIdQuery } = TypeIdAPI;