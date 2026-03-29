"use client"
import Banner from "@/components/common/landing/banner";
import Cta from "@/components/common/landing/cta";
import UpcomingEvents from "@/components/common/landing/upcomingEvents";
import { useGetCurrentUserQuery } from "@/redux/features/userSlice/userSlice";

export default function Home() {
  const { data } = useGetCurrentUserQuery();
  
  return (
    <main className="min-h-screen bg-background text-white">
      <Banner />
      <UpcomingEvents />
      <Cta />
    </main>
  );
}
