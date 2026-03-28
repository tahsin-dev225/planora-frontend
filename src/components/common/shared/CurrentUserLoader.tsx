"use client";

import { useGetCurrentUserQuery } from "@/redux/features/userSlice/userSlice";
import React from "react";


export default function CurrentUserLoader({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isLoading } = useGetCurrentUserQuery();

  if (isLoading) return <div className='flex items-center justify-center h-screen'>
      <div className="animate-spin rounded-full h-20 w-20 border-t-2 border-b-2 border-red-600"></div>
    </div>;

  return <>{children}</>;
}