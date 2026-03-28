import { apiSlice } from "../apiSlice/apiSlice";


export const statsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getStats: builder.query<any, void>({
      query: () => "/stats/get-banner-stats",
      providesTags: ["Stats"],
    }),
    getDashboardStats: builder.query<any, void>({
      query: () => "/stats/getStats",
      providesTags: ["Stats"],
    }),
  }),
});

export const {
  useGetStatsQuery,
  useGetDashboardStatsQuery
} = statsApi;