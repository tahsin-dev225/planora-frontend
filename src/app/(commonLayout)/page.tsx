"use client"
import Banner from "@/components/common/landing/banner";
import Cta from "@/components/common/landing/cta";
import UpcomingEvents from "@/components/common/landing/upcomingEvents";
import Testimonials from "@/components/common/landing/testimonials";
import { useGetCurrentUserQuery } from "@/redux/features/userSlice/userSlice";
import FeaturedEvents from "@/components/common/landing/featuredEvents";

export default function Home() {
  const { data } = useGetCurrentUserQuery();
  
  return (
    <main className="min-h-screen bg-background text-white pb-20">
      <Banner />
      <UpcomingEvents />
      <FeaturedEvents />
      <Testimonials />
      <Cta />
    </main>
  );
}
