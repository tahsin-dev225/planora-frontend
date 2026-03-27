import { apiSlice } from "../apiSlice/apiSlice";

export const userApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({

    // 👉 current user
    getCurrentUser: builder.query<any, void>({
      query: () => ({
        url: "/auth/me",
        method: "GET",
      }),
      providesTags: ["User"],
    }),

    // 👉 optional: get all users (admin)
    getAllUsers: builder.query({
      query: ({ page = 1, limit = 10 }) => ({
        url: `/users?page=${page}&limit=${limit}`,
      }),
      providesTags: ["User"],
    }),

  }),
});

export const {
  useGetCurrentUserQuery,
  useGetAllUsersQuery,
} = userApi;