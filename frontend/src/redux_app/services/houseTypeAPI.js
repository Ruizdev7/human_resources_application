import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const HouseTypeAPI = createApi({

    reducerPath: "HouseTypeAPI",
    baseQuery: fetchBaseQuery({

        baseUrl: `${import.meta.env.VITE_API_ADDRESS}`,
        prepareHeaders: (headers, { getState }) => {
            const house_type = getState("HouseTypeAPI.current_user")
            headers.set('Access-Control-Allow-Origin', '*')
            return headers;
        },
    }),
    endpoints: (builder) => ({
        getHouseType: builder.query({
            query: (ccn_house_type) => `/house_type/${ccn_house_type}`,
            retry: 3,
        }),
    }),
});

export const { useGetHouseTypeQuery } = HouseTypeAPI;