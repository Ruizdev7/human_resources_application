import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const FamilyNucleusApi = createApi({

    reducerPath: "FamilyNucleusApi",
    baseQuery: fetchBaseQuery({

        baseUrl: `${import.meta.env.VITE_API_ADDRESS}`,
        prepareHeaders: (headers, { getState }) => {
            const family_nucleus = getState("FamilyNucleusApi.current_user")
            headers.set('Access-Control-Allow-Origin', '*')

            return headers;
        },
    }),
    keepUnusedDataFor: 120,
    refetchOnMountOrArgChange: true,
    refetchOnFocus: true,
    refetchOnReconnect: true,
    pollingInterval: 3000,
    tagTypes: ["FamilyNucleus"],
    endpoints: (builder) => ({
        getFamilyNucleus: builder.query({
            query: (ccn_employee) => `/cv_family_nucleus/employee/${ccn_employee}`,
            retry: 3,
            providesTags: ["FamilyNucleus"],
        }),
        getAllFamilyNucleus: builder.query({
            query: () => `/family_nucleus`,
            retry: 3,
            providesTags: ["FamilyNucleus"],
        }),
    }),
});

export const { useGetFamilyNucleusQuery, useGetAllFamilyNucleusQuery } = FamilyNucleusApi;