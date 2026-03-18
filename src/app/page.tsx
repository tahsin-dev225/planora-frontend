import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/ui/common/shared/navbar";
import Banner from "@/components/ui/common/landing/banner";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50">
      <Navbar />
      <Banner />
    </main>
  );
}
