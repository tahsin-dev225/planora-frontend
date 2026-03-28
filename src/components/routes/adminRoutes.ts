import { Route } from "@/types";


export const AdminRoute: Route[] = [
  {
    title: "Admin Dashboard",
    items: [
      {
        title: "Add Events",
        url: "/admin-dashboard/add-events",
      },
      {
        title: "Manage my Events",
        url: "/admin-dashboard/manage-my-events",
      },
      {
        title: "Manage my participants",
        url: "/admin-dashboard/manage-my-participants",
      },
      {
        title: "Manage ",
        url: "/admin-dashboard/manage",
      },
    ],
  },
]