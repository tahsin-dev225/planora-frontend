import { apiSlice } from "../apiSlice/apiSlice";

interface IReview {
  rating: number;
  eventId: string;
  comment: string;
}

export const reviewApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({

    addReview: builder.mutation<any, IReview>({
      query: (data: IReview) => ({
        url: "/review/create-review",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Review"],
    }),

    getMyReviews: builder.query<any, void>({
      query: () => ({
        url: `/review/my-reviews`,
      }),
      providesTags: ["Review"],
    }),

    deleteReview: builder.mutation<any, string>({
      query: (id: string) => ({
        url: `/review/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Review"],
    }),

  }),
});


export const {
  useAddReviewMutation,
  useGetMyReviewsQuery,
  useDeleteReviewMutation
} = reviewApi;