import React from 'react';
import { Dancing_Script } from 'next/font/google';

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
  return (
    <>
      <div className="relative w-full pt-40 pb-56 lg:pt-56 lg:pb-64 flex flex-col items-center overflow-hidden bg-slate-950">
        {/* Background Image & Overlays */}
        <div className="absolute inset-0 z-0">
          <img 
            src="/img/banner.png" 
            alt="Event Stage Background" 
            className="w-full h-full object-cover opacity-30" 
          />
          {/* Radial gradient for vignette effect */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0, 0, 0, 0.36)_100%)]"></div>
          {/* Bottom gradient to blend into the next section */}
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent"></div>
          {/* Top gradient for Navbar */}
          <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-black/80 to-transparent"></div>
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 text-center">
          {/* Main Headline */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white mb-8 leading-tight">
            Bringing Your Vision to Life<br className="hidden md:block" /> with Flawless <span className={`text-red-600 ${dancingScript.className} font-medium px-2 inline-block -rotate-2 transform`}>Execution</span>
          </h1>
          
          {/* Glassmorphism Subtitle Container */}
          <div className="mt-8 relative inline-block mx-auto max-w-4xl">
            <div className="absolute inset-0 bg-white/5 backdrop-blur-xsm rounded-xl border border-white/5 shadow-xl"></div>
            <p className="relative z-10 p-6 md:p-8 text-base md:text-lg text-gray-300 leading-relaxed font-light">
              We turn your ideas into extraordinary experiences through strategic planning,<br className="hidden md:block"/> creative design, and seamless execution &mdash; ensuring your event exceeds every<br className="hidden md:block"/> expectation.
            </p>
          </div>
        </div>
      </div>

      {/* Overlapping Stats Section */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 -mt-32 md:-mt-40 pb-16 lg:pb-24">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          <StatCard number="252+" label="Partners & Exhibiting Brands" />
          <StatCard number="121+" label="Industry Experts" />
          <StatCard number="61+" label="Hours of Live Presentations" />
          <StatCard number="32+" label="150+ Businesses in Attendance" />
        </div>
      </div>
    </>
  );
};

export default Banner;