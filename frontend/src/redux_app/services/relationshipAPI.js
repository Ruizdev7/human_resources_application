import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const RelationshipAPI = createApi({

    reducerPath: "RelationshipAPI",
    baseQuery: fetchBaseQuery({

        baseUrl: `${import.meta.env.VITE_API_ADDRESS}`,
        prepareHeaders: (headers, { getState }) => {
            const relationship = getState("RelationshipAPI.current_user")
            headers.set('Access-Control-Allow-Origin', '*')
            return headers;
        },
    }),
    endpoints: (builder) => ({
        getRelationship: builder.query({
            query: (ccn_relationship) => `/relationship/${ccn_relationship}`,
            retry: 3,
        }),
    }),
});

export const { useGetRelationshipQuery } = RelationshipAPI;