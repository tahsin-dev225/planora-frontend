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

    // get my participants
    getMyParticipants: builder.query<any, void>({
      query: () => ({
        url: "/participant/my-participants",
        method: "GET",
      }),
      providesTags: ["Participant"],
    }),


  }),
});

export const {
  useAddParticipantMutation,
  useGetMyParticipantsQuery
} = participantApi;
