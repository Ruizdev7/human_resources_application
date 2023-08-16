import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const WorkShiftAPI = createApi({

    reducerPath: "WorkShiftAPI",
    baseQuery: fetchBaseQuery({

        baseUrl: `${import.meta.env.VITE_API_ADDRESS}`,
        prepareHeaders: (headers, { getState }) => {
            const work_shift = getState("WorkShiftAPI.current_user")
            headers.set('Access-Control-Allow-Origin', '*')
            return headers;
        },
    }),
    endpoints: (builder) => ({
        getWorkShift: builder.query({
            query: (ccn_work_shift) => `/work_shift/${ccn_work_shift}`,
            retry: 3,
        }),
    }),
});

export const { useGetWorkShiftQuery } = WorkShiftAPI;