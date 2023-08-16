import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const SchoolingLevelAPI = createApi({

    reducerPath: "SchoolingLevelAPI",
    baseQuery: fetchBaseQuery({

        baseUrl: `${import.meta.env.VITE_API_ADDRESS}`,
        prepareHeaders: (headers, { getState }) => {
            const schooling_level = getState("SchoolingLevelAPI.current_user")
            headers.set('Access-Control-Allow-Origin', '*')
            return headers;
        },
    }),
    endpoints: (builder) => ({
        getSchoolingLevel: builder.query({
            query: (ccn_schooling_level) => `/schooling_level/${ccn_schooling_level}`,
            retry: 3,
        }),
    }),
});

export const { useGetSchoolingLevelQuery } = SchoolingLevelAPI;