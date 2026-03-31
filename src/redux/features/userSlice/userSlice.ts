import { apiSlice } from "../apiSlice/apiSlice";

// router.post("/logout",

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

    getAllUsers: builder.query({
      query: (page: string) => ({
        url: `/auth/all-users?page=${page}`,
      }),
      providesTags: ["User"],
    }),

    // 👉 logout
    logout: builder.mutation<void, void>({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
      invalidatesTags: ["User"],
    }),

    makeAdmin: builder.mutation<void, { id: string }>({
      query: ({ id }) => ({
        url: `/auth/make-admin/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: ["User"],
    }),

    deleteUser: builder.mutation<void, { id: string }>({
      query: ({ id }) => ({
        url: `/auth/delete-user/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["User"],
    }),

  }),
});

export const {
  useGetCurrentUserQuery,
  useGetAllUsersQuery,
  useLogoutMutation,
  useMakeAdminMutation,
  useDeleteUserMutation,
} = userApi;