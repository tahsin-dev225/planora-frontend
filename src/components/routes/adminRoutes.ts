import { Route } from "@/types";


export const AdminRoute: Route[] = [
  {
    title: "Admin Dashboard",
    items: [
      {
        title: "Dashboard",
        url: "/admin-dashboard",
      },
      {
        title: "Add Events",
        url: "/admin-dashboard/add-events",
      },
      {
        title: "My Events",
        url: "/admin-dashboard/manage-my-events",
      },
      {
        title: "Update Featured Events",
        url: "/admin-dashboard/update-featured",
      },
      {
        title: "My Joined Events",
        url: "/admin-dashboard/joined-events",
      },
      {
        title: "Pending Requests",
        url: "/admin-dashboard/pending-request",
      },
      {
        title: "Need Payment",
        url: "/admin-dashboard/need-payment",
      },
    ],
  },
]