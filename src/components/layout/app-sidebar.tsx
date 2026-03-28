import * as React from "react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { Route } from "@/types";
import { AdminRoute } from "../routes/adminRoutes";
import { UserRoute } from "../routes/userRoute";
import Image from "next/image";

export function AppSidebar({
  user,
  ...props
}: {
  user: { role: string } & React.ComponentProps<typeof Sidebar>;
}) {
  let routes: Route[] = [];

  switch (user?.role) {
    case "ADMIN":
      routes = AdminRoute;
      break;
    case "USER":
      routes = UserRoute;
      break;
    case "SUPER_ADMIN":
      routes = AdminRoute;
      break;

    default:
      routes = [];
      break;
  }

  return (
    <Sidebar {...props}>
      <SidebarContent>
        <div className="flex-shrink-0  rounded-lg flex items-center">
            <Link href="/" className="text-2xl font-bold text-white tracking-widest flex items-center uppercase">
              <Image className='w-40' src="/img/logo2.png" alt="Logo" width={400} height={200} />
            </Link>
          </div>
        {/* We create a SidebarGroup for each parent. */}
        {routes.map((item) => (
          <SidebarGroup key={item.title}>
            <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {item.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <Link href={item.url}>{item.title}</Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
                {user?.role === "SUPER_ADMIN" && <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <Link href="/manage-users">Manage Users</Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
