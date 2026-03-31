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

    addEvent: builder.mutation<any, FormData>({
      query: (formData) => ({
        url: "/event/create-event",
        method: "POST",
        body: formData,
        // Do NOT set formData:true here — the native FormData object
        // already tells fetch to NOT JSON.stringify the body.
        // formData:true can corrupt the multipart boundary,
        // causing multer to fail and Cloudinary to receive an empty stream.
      }),
      invalidatesTags: ["Event"],
    }),

    getAllEvents: builder.query<any,
      {
        page?: number;
        limit?: number;
        search?: string;
        type?: "PUBLIC" | "PRIVATE" | "";
        isPaid?: boolean | "";
      }
    >({
      query: (filters = {}) => {
        const params = new URLSearchParams();

        if (filters.page) params.set("page", String(filters.page));
        if (filters.limit) params.set("limit", String(filters.limit));
        if (filters.search) params.set("search", filters.search);
        if (filters.type) params.set("type", filters.type);
        if (filters.isPaid !== undefined && filters.isPaid !== "")
          params.set("isPaid", String(filters.isPaid));

        const qs = params.toString();
        return { url: qs ? `/event?${qs}` : `/event` };
      },
      providesTags: ["Event"],
    }),

    getUpcomingEvents: builder.query<any, void>({
      query: () => {
        return {
          url: `/event/upcoming-events`,
        };
      },
      providesTags: ["Event"],
    }),

    getMyEvents: builder.query<any, void>({
      query: () => {
        return {
          url: `/event/my-event`,
        };
      },
      providesTags: ["Event"],
    }),

    getEventById: builder.query<any, string>({
      query: (id) => {
        return {
          url: `/event/get-single-event/${id}`,
        };
      },
      providesTags: ["Event"],
    }),
    getEventForFeatured: builder.query<any, string>({
      query: (page: string) => {
        return {
          url: `/event/all-events/featured?page=${page || "1"}`,
        };
      },
      providesTags: ["Event"],
    }),

    getFeaturedEvents: builder.query<any, void>({
      query: () => {
        return {
          url: `/event/featured-events`,
        };
      },
      providesTags: ["Event"],
    }),

    makeFeaturedEvent: builder.mutation({
      query: (id: string) => {
        return {
          url: `/event/makeFeatured/${id}`,
          method: "PATCH",
        };
      },
      invalidatesTags: ["Event"],
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

  }),
});

export const {
  useAddEventMutation,
  useGetAllEventsQuery,
  useGetUpcomingEventsQuery,
  useGetMyEventsQuery,
  useGetEventByIdQuery,
  useUpdateEventMutation,
  useDeleteEventMutation,
  useGetFeaturedEventsQuery,
  useMakeFeaturedEventMutation,
  useGetEventForFeaturedQuery
} = EventtApi;

