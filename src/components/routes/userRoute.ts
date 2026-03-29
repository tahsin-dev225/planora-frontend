import { Route } from "@/types";


export const UserRoute: Route[] = [
  {
    title: "User Dashboard",
    items: [
      {
        title: "Add Events",
        url: "/dashboard/add-events",
      },
      {
        title: "Manage my Events",
        url: "/dashboard/manage-my-events",
      },
      {
        title: "My Joined Events",
        url: "/dashboard/joined-events",
      }
    ],
  },
]