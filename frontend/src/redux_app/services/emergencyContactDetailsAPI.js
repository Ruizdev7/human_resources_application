import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const EmergencyContactDetailsApi = createApi({

    reducerPath: "EmergencyContactDetailsApi",
    baseQuery: fetchBaseQuery({

        baseUrl: `${import.meta.env.VITE_API_ADDRESS}`,
        prepareHeaders: (headers, { getState }) => {
            const emergency_contact_details = getState("EmergencyContactDetailsApi.current_user")
            headers.set('Access-Control-Allow-Origin', '*')

            return headers;
        },
    }),
    keepUnusedDataFor: 120,
    refetchOnMountOrArgChange: true,
    refetchOnFocus: true,
    refetchOnReconnect: true,
    pollingInterval: 3000,
    tagTypes: ["EmergencyContactDetail"],
    endpoints: (builder) => ({
        getEmergencyContactDetails: builder.query({
            query: (ccn_employee) => `/emergency_contact_details/employee/${ccn_employee}`,
            retry: 3,
        }),
        getAllEmergencyContactDetails: builder.query({
            query: () => `/emergency_contact_details`,
            retry: 3,
            providesTags: ["EmergencyContactDetail"],
        }),
    }),
});

export const { useGetEmergencyContactDetailsQuery, useGetAllEmergencyContactDetailsQuery } = EmergencyContactDetailsApi;