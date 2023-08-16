import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const PerformanceEvaluationAPI = createApi({

    reducerPath: "PerformanceEvaluationAPI",
    baseQuery: fetchBaseQuery({

        baseUrl: `${import.meta.env.VITE_API_ADDRESS}`,
        prepareHeaders: (headers, { getState }) => {
            const performance_evaluation = getState("PerformanceEvaluationAPI.current_user")
            headers.set('Access-Control-Allow-Origin', '*')
            return headers;
        },
    }),
    keepUnusedDataFor: 120,
    refetchOnMountOrArgChange: true,
    refetchOnFocus: true,
    refetchOnReconnect: true,
    pollingInterval: 3000,
    tagTypes: ["performance_evaluations"],

    endpoints: (builder) => ({
        getPerformanceEvaluation: builder.query({
            query: (ccn_performance_evaluation) => `/performance_evaluation/employee/${ccn_performance_evaluation}`,
            retry: 3,
            providesTags: ["performance_evaluations"]
        }),
        getDashboardMetrics: builder.query({
            query: () => `/performance_evaluation/metrics_for_dashboard`,
            retry: 3,
            providesTags: ["performance_evaluations"]
        }),
        getPerformanceEvaluationTables: builder.query({
            query: () => `performance_evaluation/metrics_for_tables_dashboard`,
            retry: 3,
            providesTags: ["performance_evaluations"]
        }),
        getPerformanceEvaluationLast: builder.query({
            query: (body) => `performance_evaluation/metrics_for_dashboard/${body.ccn_employee_one}/${body.ccn_employee_two}/${body.ccn_employee_three}/${body.ccn_employee_four}/${body.ccn_employee_five}`,
            retry: 3,
            providesTags: ["performance_evaluations"]
        }),
        getAdministrativeDetail: builder.query({
            query: (ccn_performance_evaluation) => `performance_evaluation_detail/${ccn_performance_evaluation}`,
            retry: 3,
            providesTags: ["performance_evaluations"]
        }),
    }),

});

export const { useGetPerformanceEvaluationQuery, useGetPerformanceEvaluationLastQuery, useGetDashboardMetricsQuery, useGetPerformanceEvaluationTablesQuery, useGetAdministrativeDetailQuery } = PerformanceEvaluationAPI;