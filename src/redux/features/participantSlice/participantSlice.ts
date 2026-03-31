import { apiSlice } from "../apiSlice/apiSlice";



export const participantApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({

    //add participant
    addParticipant: builder.mutation<void, { eventId: string }>({
      query: (info) => ({
        url: "/participant/join-event",
        method: "POST",
        body: info,
      }),
      invalidatesTags: ["Participant"],
    }),

    // get my joined or participated events
    getMyJoinedEvents: builder.query<any, void>({
      query: () => ({
        url: "/participant/getMyParticipited-events",
        method: "GET",
      }),
      providesTags: ["Participant"],
    }),

    getMyPrivateFreeEvents: builder.query<any, void>({
      query: () => ({
        url: "/participant/getMyPrivateFreeEvent",
        method: "GET",
      }),
      providesTags: ["Participant"],
    }),

    getMyPrivatePaidEvents: builder.query<any, void>({
      query: () => ({
        url: "/participant/getMyPrivatePaidEvent",
        method: "GET",
      }),
      providesTags: ["Participant"],
    }),

    updateParticipantStatus: builder.mutation<any, { id: string; status: "APPROVED" | "REJECTED" }>({
      query: ({ id, status }) => ({
        url: `/participant/update-status/${id}`,
        method: "PATCH",
        body: { status },
      }),
      invalidatesTags: ["Participant"],
    }),

    makeNeedPayment: builder.mutation<any, { id: string; status: "NEED_PAYMENT" | "REJECTED" | "APPROVED" }>({
      query: ({ id, status }) => ({
        url: `/participant/makeNeedPayment/${id}`,
        method: "PATCH",
        body: { status },
      }),
      invalidatesTags: ["Participant"],
    }),

    getNeedPaymentParticipant: builder.query<any, void>({
      query: () => ({
        url: "/participant/get-need-payment-participants",
        method: "GET",
      }),
      providesTags: ["Participant"],
    }),

    payForNeedPay: builder.mutation<any, { id: string }>({
      query: ({ id }) => ({
        url: `/participant/payForEvent/${id}`,
        method: "POST",
        body: { id },
      }),
      invalidatesTags: ["Participant"],
    }),

  }),
});

export const {
  useAddParticipantMutation,
  useGetMyJoinedEventsQuery,
  useGetMyPrivateFreeEventsQuery,
  useGetMyPrivatePaidEventsQuery,
  useUpdateParticipantStatusMutation,
  useMakeNeedPaymentMutation,
  useGetNeedPaymentParticipantQuery,
  usePayForNeedPayMutation,
} = participantApi;
