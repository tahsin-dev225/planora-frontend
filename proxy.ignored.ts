import { NextRequest, NextResponse } from "next/server";
import { useGetCurrentUserQuery } from "@/redux/features/userSlice/userSlice";
import { Roles } from "@/components/constraints/roles";

export const proxy = async (request: NextRequest) => {
  const pathName = request.nextUrl.pathname;

  const { data } = useGetCurrentUserQuery();

  if (!data) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  const role = data?.data?.role;

  // User
  if (role === Roles.user) {
    if (!pathName.startsWith("/dashboard")) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
  }

  // Admin
  if (role === Roles.admin) {
    if (!pathName.startsWith("/admin-dashboard")) {
      return NextResponse.redirect(new URL("/admin-dashboard", request.url));
    }
  }

  // Super Admin
  if (role === Roles.superAdmin) {
    if (!pathName.startsWith("/admin-dashboard")) {
      return NextResponse.redirect(new URL("/admin-dashboard", request.url));
    }
  }

  return NextResponse.next();
};

export const config = {
  matcher: [
    "/dashboard",
    "/dashboard/:path*",
    "/user-dashboard",
    "/user-dashboard/:path*",
    "/admin-dashboard",
    "/admin-dashboard/:path*",
  ],
};
