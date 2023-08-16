import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const DepartmentAPI = createApi({

    reducerPath: "DepartmentAPI",
    baseQuery: fetchBaseQuery({

        baseUrl: `${import.meta.env.VITE_API_ADDRESS}`,
        prepareHeaders: (headers, { getState }) => {
            const department = getState("DepartmentAPI.current_user")
            headers.set('Access-Control-Allow-Origin', '*')
            return headers;
        },
    }),
    endpoints: (builder) => ({
        getDepartment: builder.query({
            query: (ccn_department) => `/department/${ccn_department}`,
            retry: 3,
        }),
    }),
});

export const { useGetDepartmentQuery } = DepartmentAPI;