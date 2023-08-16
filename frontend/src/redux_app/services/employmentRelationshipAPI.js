import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const EmploymentRelationshipAPI = createApi({

    reducerPath: "EmploymentRelationshipAPI",
    baseQuery: fetchBaseQuery({

        baseUrl: `${import.meta.env.VITE_API_ADDRESS}`,
        prepareHeaders: (headers, { getState }) => {
            const EmploymentRelationship = getState("EmploymentRelationshipAPI.current_user")
            headers.set('Access-Control-Allow-Origin', '*')
            return headers;
        },
    }),
    keepUnusedDataFor: 120,
    refetchOnMountOrArgChange: true,
    refetchOnFocus: true,
    refetchOnReconnect: true,
    pollingInterval: 3000,
    tagTypes: ["EmployeeRelationship"],
    endpoints: (builder) => ({
        getEmploymentRelationship: builder.query({
            query: (ccn_employee) => `/employment_relationship/employee/${ccn_employee}`,
            retry: 3,
            providesTags: ["EmployeeRelationship"],
        }),
        getEmploymentRelationships: builder.query({
            query: () => `/employment_relationship`,
            retry: 3,
            providesTags: ["EmployeeRelationship"],
        }),
    }),
});

export const { useGetEmploymentRelationshipQuery, useGetEmploymentRelationshipsQuery } = EmploymentRelationshipAPI;