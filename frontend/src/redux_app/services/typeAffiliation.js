import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const TypeAffiliationAPI = createApi({

    reducerPath: "TypeAffiliationAPI",
    baseQuery: fetchBaseQuery({

        baseUrl: `${import.meta.env.VITE_API_ADDRESS}`,
        prepareHeaders: (headers, { getState }) => {
            const type_affiliation = getState("TypeAffiliationAPI.current_user")
            headers.set('Access-Control-Allow-Origin', '*')
            return headers;
        },
    }),
    endpoints: (builder) => ({
        getTypeAffiliation: builder.query({
            query: (ccn_type_affiliation) => `/type_affiliation/${ccn_type_affiliation}`,
            retry: 3,
        }),
    }),
});

export const { useGetTypeAffiliationQuery } = TypeAffiliationAPI;