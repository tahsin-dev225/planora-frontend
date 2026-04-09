"use client";

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles, Calendar, Zap } from 'lucide-react';
import { useGetCurrentUserQuery } from '@/redux/features/userSlice/userSlice';

const Cta = () => {
  const {data:user} = useGetCurrentUserQuery();
  return (
    <section className="relative py-24 overflow-hidden dark:bg-[#0a0a0a] bg-gray-50">
      {/* Background Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(225,29,72,0.08),transparent_70%)] pointer-events-none"></div>
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-red-600/10 blur-[120px] rounded-full pointer-events-none animate-pulse"></div>
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-primary/10 blur-[120px] rounded-full pointer-events-none animate-pulse" style={{ animationDelay: '2s' }}></div>

      <div className="max-w-7xl xl:max-w-[1200px] 2xl:max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="relative rounded-[3rem] overflow-hidden bg-gradient-to-br dark:from-[#1a1a1a] dark:to-[#0d0d0d] from-white to-gray-50 border border-gray-200 dark:border-white/5 p-8 md:p-16 lg:p-24 shadow-2xl group">
          
          {/* Subtle Grid Pattern inside card */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:30px_30px] opacity-30"></div>
          
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Left Side - Content */}
            <div className="text-left">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/10 border border-red-500/20 mb-8">
                <Sparkles className="w-4 h-4 text-red-500" />
                <span className="text-xs font-bold text-red-400 uppercase tracking-widest">Limited Availability</span>
              </div>
              
              <h2 className="text-4xl md:text-5xl font-bold text-[var(--heading-color)] dark:text-[var(--heading-color-dark)] mb-8 leading-[1.1] tracking-tight">
                Ready to Create Your <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-primary to-red-600 underline decoration-red-500/30 underline-offset-8">Perfect Event?</span>
              </h2>
              
              <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 leading-relaxed mb-10 max-w-xl">
                Join thousands of creators who trust Planora to handle their most important moments. We provide the tools, the venue, and the expertise to make your vision a reality.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-5">
                {user?.data?.id ? <Link href="/dashboard"
                className="px-4 md:px-8 py-1.5 lg:py-3 xl:py-3.5 gap-3 bg-secondary/80 hover:bg-secondary/10 border border-white/10 hover:border-white/20 text-white rounded-2xl font-bold text-lg transition-all duration-300 backdrop-blur-md hover:-translate-y-1 flex items-center justify-center"
                >Go to Dashboard 
                <ArrowRight className="w-6 h-6 group-hover/btn:translate-x-1.5 transition-transform" />
                </Link> 
                :
                <Link 
                  href="/register" 
                  className="px-4 md:px-8 py-1.5 gap-3 lg:py-3 xl:py-3.5 bg-gradient-to-r from-red-600 to-primary hover:from-red-500 hover:to-primary text-white rounded-2xl font-bold text-lg transition-all duration-300 shadow-xl shadow-red-600/20 hover:shadow-red-600/40 hover:-translate-y-1 flex items-center justify-center gap-3 group/btn"
                >
                  Get Started Now
                  <ArrowRight className="w-6 h-6 group-hover/btn:translate-x-1.5 transition-transform" />
                </Link>}
              </div>
            </div>

            {/* Right Side - Feature Cards / Visual */}
            <div className="relative group/visual  hidden md:block">
              <div className="grid grid-cols-2 gap-4 relative">
                
                {/* Visual Cards */}
                <div className="space-y-4 pt-12">
                  <div className="dark:bg-[#242424] bg-white border border-gray-200 dark:border-white/5 p-6 rounded-[2rem] shadow-xl hover:border-red-500/30 transition-all duration-500 group-hover/visual:-rotate-2">
                    <div className="w-12 h-12 rounded-2xl bg-red-500/10 flex items-center justify-center mb-4 text-red-500">
                      <Calendar className="w-6 h-6" />
                    </div>
                    <h4 className="text-[var(--heading-color)] dark:text-[var(--heading-color-dark)] font-bold text-lg mb-2">Smart Scheduling</h4>
                    <p className="text-gray-600 dark:text-gray-500 text-sm">Automated event planning & reminders.</p>
                  </div>
                  <div className="dark:bg-[#242424] bg-white border border-gray-200 dark:border-white/5 p-6 rounded-[2rem] shadow-xl hover:border-red-500/30 transition-all duration-500 group-hover/visual:rotate-2">
                    <div className="w-12 h-12 rounded-2xl bg-secondary/10 flex items-center justify-center mb-4 text-secondary">
                      <Zap className="w-6 h-6" />
                    </div>
                    <h4 className="text-[var(--heading-color)] dark:text-[var(--heading-color-dark)] font-bold text-lg mb-2">Instant Ticket</h4>
                    <p className="text-gray-600 dark:text-gray-500 text-sm">Dynamic QR ticketing system for entries.</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                   <div className="h-64 rounded-[2.5rem] overflow-hidden border border-gray-200 dark:border-white/10 shadow-2xl relative">
                      <img 
                        src="/img/login.jpg" 
                        alt="Event" 
                        className="w-full h-full object-cover grayscale-[30%] group-hover/visual:grayscale-0 transition-all duration-700" 
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-red-600/40 to-transparent"></div>
                   </div>
                   <div className="bg-red-600 p-8 rounded-[2rem] shadow-xl flex flex-col justify-between h-48 group-hover/visual:rotate-3 transition-transform duration-500">
                      <h4 className="text-white text-lg sm:text-xl md:text-2xl font-extrabold leading-tight">24/7 Expert <br />Support</h4>
                      <div className="flex -space-x-3">
                         {[1,2,3].map(i => (
                           <div key={i} className="w-10 h-10 rounded-full border-2 border-red-600 bg-gray-800 flex items-center justify-center text-[10px] font-bold">U{i}</div>
                         ))}
                         <div className="w-10 h-10 rounded-full border-2 border-red-600 bg-white/20 flex items-center justify-center text-xs font-bold">+5</div>
                      </div>
                   </div>
                </div>

                {/* Decorative Elements */}
                <div className="absolute -top-8 -right-8 w-24 h-24 bg-red-500/20 blur-2xl rounded-full"></div>
                <div className="absolute -bottom-8 -left-8 w-24 h-24 bg-primary/20 blur-2xl rounded-full"></div>
              </div>
            </div>

          </div>

          {/* Absolute Glow behind sections */}
          <div className="absolute -top-1/2 -right-1/4 w-[60%] h-[150%] bg-red-600/5 blur-[100px] rounded-full pointer-events-none group-hover:bg-red-600/10 transition-colors duration-1000"></div>
        </div>
      </div>
    </section>
  );
};

export default Cta;