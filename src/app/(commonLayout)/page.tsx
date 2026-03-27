"use client"
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/common/shared/navbar";
import Banner from "@/components/common/landing/banner";
import { useGetCurrentUserQuery } from "@/redux/features/userSlice/userSlice";

export default function Home() {
  const { data } = useGetCurrentUserQuery();
  
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <Banner />
    </main>
  );
}
