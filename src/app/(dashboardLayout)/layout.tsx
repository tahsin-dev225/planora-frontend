"use client"
import { AppSidebar } from "@/components/layout/app-sidebar";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { useGetCurrentUserQuery } from "@/redux/features/userSlice/userSlice";

export default function DashboardLayout({
  admin,
  user
}: {
  children: React.ReactNode;
  admin: React.ReactNode;
  user: React.ReactNode;
}) {
  const { data } = useGetCurrentUserQuery();
  console.log(data)

  return (
    <SidebarProvider>
      <AppSidebar user={data?.data} />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator
            orientation="vertical"
            className="mr-2 data-[orientation=vertical]:h-4"
          />
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4">
          {data?.data?.role === "ADMIN" && admin}
          {data?.data?.role === "USER" && user}
          {data?.data?.role === "SUPER_ADMIN" && admin}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
