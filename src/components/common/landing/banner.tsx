"use client"
import React from 'react';
import { Dancing_Script } from 'next/font/google';
import { useGetStatsQuery } from '@/redux/features/statsSlice/statSlice';
import Image from 'next/image';
import Link from 'next/link';

const dancingScript = Dancing_Script({ subsets: ['latin'] });

const StatCard = ({ number, label }: { number: string; label: string }) => (
  <div className="relative overflow-hidden rounded-2xl bg-[#1a1a1a]/80 backdrop-blur-md border border-white/5 p-8 text-center shadow-2xl transition-transform hover:-translate-y-1">
    <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-red-600/70 to-transparent"></div>
    <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-32 h-32 bg-red-600/20 rounded-full blur-3xl pointer-events-none"></div>
    <h3 className="relative z-10 text-4xl md:text-5xl font-bold text-white mb-3">{number}</h3>
    <p className="relative z-10 text-sm md:text-sm text-gray-400 font-medium px-4">{label}</p>
  </div>
);

const Banner = () => {


  const {data } = useGetStatsQuery();
  return (
    <>
      <div className="relative w-full pt-20 sm:pt-40 pb-56 lg:pt-40 lg:pb-64 flex items-center overflow-hidden bg-slate-950 min-h-[100vh]">
        {/* Background Gradients & Subtle Grid */}
        <div className="absolute inset-0 z-0">
          <Image 
            src="/img/banner.png" 
            alt="Event Management Background" 
            fill 
            className="object-cover opacity-20 grayscale-[20%]" 
            priority
          />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]"></div>
          {/* Radial gradient for vignette effect */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(225,29,72,0.15),transparent_50%)]"></div>
          {/* Bottom gradient to blend into the next section */}
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent"></div>
          {/* Top gradient for Navbar */}
          <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-black/80 to-transparent"></div>
        </div>

        <div className="relative z-10 max-w-7xl xl:max-w-[1300px] 2xl:max-w-[1500px] 3xl:max-w-[1800px] mx-auto px-4 md:px-10 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center mt-8 md:mt-1">
          
          {/* Left Column - Text Content */}
          <div className="text-left mt-8 md:mt-0 xl:pr-12">
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full border border-red-500/30 bg-white/5 backdrop-blur-md mb-8 hover:bg-white/10 transition-all cursor-pointer overflow-hidden relative group">
              <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-red-500/0 via-red-500/20 to-red-500/0 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500"></span>
              </span>
              <span className="text-sm text-red-50 tracking-wider uppercase">Premium Event Management</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-[4.4rem] font-bold tracking-tight text-white mb-6 leading-[1.1]">
              Crafting Unforgettable <br className="hidden md:block" /> 
              <span className="relative z-10 inline-block mt-2">
                <span className={`text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-rose-500 to-red-600 ${dancingScript.className} font-bold px-2 inline-block -rotate-3 transform scale-110 drop-shadow-[0_0_35px_rgba(225,29,72,0.8)]`}>Experiences</span>
                <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-red-600/5 blur-[45px] rounded-full pointer-events-none"></div>
              </span>
            </h1>
            
            {/* Subtitle */}
            <div className="mt-6 max-w-xl">
              <p className="text-md md:text-lg text-gray-300 leading-relaxed font-light">
                Your premier partner in comprehensive event management. From corporate conferences to grand celebrations, we handle every detail with precision, creativity, and passion.
              </p>
            </div>

            {/* Call to Actions */}
            <div className="mt-8 flex flex-col sm:flex-row items-start sm:items-center justify-start gap-5">
              <Link href={"/dashboard" } className="w-full sm:w-auto px-4 md:px-8 py-1.5 lg:py-3 xl:py-3.5 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white rounded-full font-bold text-lg transition-all duration-300 shadow-[0_0_30px_rgba(225,29,72,0.4)] hover:shadow-[0_0_50px_rgba(225,29,72,0.6)] hover:-translate-y-1 flex items-center justify-center gap-3 group">
                Start Planning
                <svg className="w-6 h-6 group-hover:translate-x-1.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
              </Link>
              <Link href={"/events" } className="w-full sm:w-auto px-4 md:px-8 py-1.5 lg:py-3 xl:py-3.5 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-white rounded-full font-semibold text-lg transition-all duration-300 shadow-xl backdrop-blur-md hover:-translate-y-1 flex items-center justify-center">
                Explore Portfolio
              </Link>
            </div>
          </div>

          {/* Right Column - Visual Graphic */}
          <div className="relative hidden lg:block w-full h-full min-h-[500px]">
             {/* Glow Behind */}
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-red-600/20 blur-[100px] rounded-full"></div>
             
             {/* Main Image Container */}
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md aspect-[4/5] rounded-[2.5rem] overflow-hidden border border-white/10 shadow-[0_0_60px_rgba(0,0,0,0.6)] transform  transition-transform duration-700 group">
               <img src="/img/login.jpg" alt="Event Planning" className="w-full h-full object-cover scale-105 group-hover:scale-100 transition-transform duration-1000" />
               <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-700"></div>
               
               {/* Floating Element on Image */}
               <div className="absolute bottom-8 left-8 right-8 p-5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center gap-4 transform translate-y-2 group-hover:translate-y-0 transition-all duration-700">
                  <div className="w-12 h-12 flex-shrink-0 rounded-full bg-gradient-to-br from-red-500 to-rose-600 flex items-center justify-center shadow-lg">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"></path></svg>
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-lg leading-tight">Top Rated</h4>
                    <p className="text-gray-300 text-sm font-medium">Event Organizers</p>
                  </div>
               </div>
             </div>
             
             {/* Decorative Sparkles/Dots */}
             <div className="absolute top-[10%] left-[10%] w-3 h-3 bg-red-400 rounded-full animate-ping"></div>
             <div className="absolute bottom-[20%] right-[10%] w-4 h-4 bg-rose-500 rounded-full blur-[2px] animate-pulse"></div>
          </div>
        </div>
      </div>

      {/* Overlapping Stats Section */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 -mt-32 md:-mt-40 lg:-mt-10 pb-16 lg:pb-24">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          <StatCard number={data?.data?.totalEvents} label="Events Successfully Managed" />
          <StatCard number={data?.data?.totalParticipants} label="Total participants" />
          <StatCard number="15+" label="Years of Industry Experience" />
          <StatCard number="100%" label="Commitment to Excellence" />
        </div>
      </div>
    </>
  );
};

export default Banner;