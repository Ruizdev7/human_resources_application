import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const AutoPerceivedGenderAPI = createApi({

    reducerPath: "AutoPerceivedGenderAPI",
    baseQuery: fetchBaseQuery({

        baseUrl: `${import.meta.env.VITE_API_ADDRESS}`,
        prepareHeaders: (headers, { getState }) => {
            const autoPerceivedGender = getState("autoPerceivedGenderAPI.current_user")
            headers.set('Access-Control-Allow-Origin', '*')
            return headers;
        },
    }),
    endpoints: (builder) => ({
        getAutoPerceivedGender: builder.query({
            query: (ccn_auto_perceived_gender) => `/auto_perceived_gender/${ccn_auto_perceived_gender}`,
            retry: 3,
        }),
    }),
});

export const { useGetAutoPerceivedGenderQuery } = AutoPerceivedGenderAPI;