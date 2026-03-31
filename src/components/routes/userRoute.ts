import { Route } from "@/types";


export const UserRoute: Route[] = [
  {
    title: "User Dashboard",
    items: [
      {
        title: "Dashboard",
        url: "/dashboard",
      },
      {
        title: "Add Events",
        url: "/dashboard/add-events",
      },
      {
        title: "My Events",
        url: "/dashboard/manage-my-events",
      },
      {
        title: "My Joined Events",
        url: "/dashboard/joined-events",
      },
      {
        title: "Pending Requests",
        url: "/dashboard/pending-request",
      },
      {
        title: "Need Payment",
        url: "/dashboard/need-payment",
      },
    ],
  },
]