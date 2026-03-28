import { apiSlice } from "../apiSlice/apiSlice";

// import express from "express";
// import { authRouter } from "../module/auth/auth.route";
// import { eventRouter } from "../module/event/event.route";
// import { participantRouter } from "../module/participant/participant.route";
// import { reviewRouter } from "../module/review/review.route";
// import { statsRouter } from "../module/stats/stats.route";

// const router = express.Router();

// router.use("/auth", authRouter)
// router.use("/event", eventRouter)
// router.use("/participant", participantRouter)
// router.use("/review", reviewRouter)
// // router.use("/payment", paymentRouter)

// router.use("/stats", statsRouter)

// export const IndexRoutes = router;



// import { Router } from "express";
// import { eventController } from "./event.controller";
// import { multerUpload } from "../../../config/multer.config";
// import { validateRequest } from "../../midlewere/validateRequest";
// import { eventValidation } from "./event.validation";
// import { checkAuth } from "../../midlewere/checkAuth";
// import { Role } from "../../../generated/prisma/enums";
// import { parseBody } from "../../midlewere/parseBody.middlewere";

// const router = Router();

// router.post("/create-event",
//   checkAuth(Role.ADMIN, Role.SUPER_ADMIN, Role.USER),
//   multerUpload.single("banner"),
//   eventController.createEvent)

// router.get("/", eventController.getAllEventsController)

// router.get("/get-single-event/:id",
//   checkAuth(Role.ADMIN, Role.SUPER_ADMIN, Role.USER),
//   eventController.getSingleEventController)

// router.get("/my-event",
//   checkAuth(Role.USER, Role.ADMIN, Role.SUPER_ADMIN),
//   eventController.getMyEvents)

// router.patch("/updateUserEvent/:id",
//   checkAuth(Role.USER, Role.ADMIN, Role.SUPER_ADMIN),
//   eventController.updateEventController)

// router.delete("/:id",
//   checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
//   eventController.deleteEventController)

// router.patch("/updateAdminEvent/:id",
//   // checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
//   eventController.updateAdminEvent)

// export const eventRouter = router;


export const EventtApi = apiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    addEvent: builder.mutation({
      query: (info) => {
        return {
          url: "/event/create-event",
          method: "POST",
          body: info,
        };
      },
      invalidatesTags: ["Event"],
    }),
    getPaginatedEvents: builder.query({
      query: ({ page, search }) => {
        return {
          url: `/events/paginated?page=${page}&search=${encodeURIComponent(
            search || ""
          )}`,
          credentials: "include",
        };
      },
      providesTags: ["Event"],
    }),

    getAllEvents: builder.query<any, void>({
      query: () => {
        return {
          url: `/events`,
        };
      },
      providesTags: ["Event"],
    }),
    getEvent: builder.query({
      query: (query) => {
        return {
          url: `/event/${query}`,
        };
      },
      providesTags: ["Event"],
    }),
    updateEvent: builder.mutation({
      query: (info) => {
        return {
          url: `/event/${info?.id}`,
          method: "PATCH",
          body: info?.updatedData,
        };
      },
      invalidatesTags: ["Event"],
    }),
    deleteEvent: builder.mutation({
      query: (info) => {
        return {
          url: `/event/${info}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["Event"],
    }),

    // searchProductsByName: builder.query({
    //   query: (name) => {
    //     return {
    //       url: `/products/search?name=${encodeURIComponent(name)}`,
    //     };
    //   },
    //   providesTags: ["Product"],
    // }),

    getFilteredEvents: builder.query({
      query: (filters) => {
        // Clean filters: remove null, undefined, or empty string
        const cleanFilters = Object.fromEntries(
          Object.entries(filters).filter(
            ([_, value]) =>
              value !== null && value !== undefined && value !== ""
          )
        );

        // return `/products/filter?${queryParams}`;
        return {
          url: "/event/filteredEvents",
          params: cleanFilters,
        };
      },
      providesTags: ["Event"],
    }),
  }),
});

export const {
  useAddEventMutation,
  useGetPaginatedEventsQuery,
  useGetAllEventsQuery,
  useGetEventQuery,
  useUpdateEventMutation,
  useDeleteEventMutation,
  useGetFilteredEventsQuery,
} = EventtApi;
