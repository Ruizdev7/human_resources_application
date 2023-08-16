import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const TypeRelationshipAPI = createApi({

    reducerPath: "TypeRelationshipAPI",
    baseQuery: fetchBaseQuery({

        baseUrl: `${import.meta.env.VITE_API_ADDRESS}`,
        prepareHeaders: (headers, { getState }) => {
            const type_relationship = getState("TypeRelationshipAPI.current_user")
            headers.set('Access-Control-Allow-Origin', '*')
            return headers;
        },
    }),
    endpoints: (builder) => ({
        getTypeRelationship: builder.query({
            query: (ccn_type_relationship) => `/type_relationship/${ccn_type_relationship}`,
            retry: 3,
        }),
    }),
});

export const { useGetTypeRelationshipQuery } = TypeRelationshipAPI;