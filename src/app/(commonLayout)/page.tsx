"use client"
import Banner from "@/components/common/landing/banner";
import Cta from "@/components/common/landing/cta";
import { useGetCurrentUserQuery } from "@/redux/features/userSlice/userSlice";

export default function Home() {
  const { data } = useGetCurrentUserQuery();
  
  return (
    <main className="min-h-screen bg-background text-white">
      <Banner />
      <Cta />
    </main>
  );
}
