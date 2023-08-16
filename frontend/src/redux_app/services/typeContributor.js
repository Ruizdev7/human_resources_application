import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const TypeContributorAPI = createApi({

    reducerPath: "TypeContributorAPI",
    baseQuery: fetchBaseQuery({

        baseUrl: `${import.meta.env.VITE_API_ADDRESS}`,
        prepareHeaders: (headers, { getState }) => {
            const type_contributor = getState("TypeContributorAPI.current_user")
            headers.set('Access-Control-Allow-Origin', '*')
            return headers;
        },
    }),
    endpoints: (builder) => ({
        getTypeContributor: builder.query({
            query: (ccn_type_contributor) => `/type_contributor/${ccn_type_contributor}`,
            retry: 3,
        }),
    }),
});

export const { useGetTypeContributorQuery } = TypeContributorAPI;