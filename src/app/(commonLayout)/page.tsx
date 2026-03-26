import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/common/shared/navbar";
import Banner from "@/components/common/landing/banner";

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <Banner />
    </main>
  );
}
