"use client";

import React from 'react';
import { CalendarDays, Users, LayoutDashboard, CreditCard, ShieldCheck, MapPin } from 'lucide-react';
import Link from 'next/link';
import { useGetCurrentUserQuery } from '@/redux/features/userSlice/userSlice';

export default function FeaturesPage() {
  const {data : user} = useGetCurrentUserQuery();
  const features = [
    {
      icon: <CalendarDays className="w-8 h-8 text-primary" />,
      title: "Effortless Event Creation",
      description: "Set up your events in minutes. Add dates, times, images, and descriptions through our intuitive and user-friendly interface."
    },
    {
      icon: <Users className="w-8 h-8 text-primary" />,
      title: "Attendee Management",
      description: "Track RSVPs, manage participant lists, and engage directly with your attendees. Keep everything organized in one spot."
    },
    {
      icon: <CreditCard className="w-8 h-8 text-primary" />,
      title: "Secure Payments",
      description: "Process ticketing smoothly with integrated Stripe payments. Ensure a secure checkout experience for your paid events."
    },
    {
      icon: <LayoutDashboard className="w-8 h-8 text-primary" />,
      title: "Admin Dashboard",
      description: "Gain complete oversight of your platform. Analyze statistics, approve events, and manage user roles effortlessly."
    },
    {
      icon: <ShieldCheck className="w-8 h-8 text-primary" />,
      title: "Role-Based Access",
      description: "Secure routing and permissions for users, organizers, and administrators. Keep your system structured and protected."
    },
    {
      icon: <MapPin className="w-8 h-8 text-primary" />,
      title: "Venue & Location Integration",
      description: "Showcase event locations with clear address formatting and map integrations, ensuring attendees always find their way."
    }
  ];

  return (
    <div className="min-h-screen w-full bg-slate-50 dark:bg-[#121212] flex flex-col overflow-x-hidden items-center pt-24 pb-20">
      <div className="max-w-7xl xl:max-w-[1200px] 2xl:max-w-[1400px] 3xl:max-w-[1500px] w-full px-6 md:px-12 lg:px-20 space-y-24">
        
        {/* === Header Section === */}
        <div className="text-center space-y-6 pt-10">
          <h4 className="text-primary font-semibold tracking-widest uppercase text-sm">Platform Capabilities</h4>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white leading-tight">
            Everything You Need <br /> To Run <span className="text-primary italic font-serif">Successful Events</span>
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed max-w-2xl mx-auto">
            Planora provides a comprehensive suite of tools designed to simplify event planning, ticketing, and attendee management. 
            Focus on creating memorable experiences while we handle the technical heavy lifting.
          </p>
        </div>

        {/* === Features Grid === */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="bg-white dark:bg-[#161616] border border-gray-200 dark:border-white/5 rounded-2xl p-8 hover:bg-gray-50 dark:hover:bg-[#1a1a1a] transition-all duration-300 hover:-translate-y-2 shadow-lg group relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-rose-700 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              
              <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center mb-6 border border-primary/20 group-hover:scale-110 transition-transform duration-300">
                {feature.icon}
              </div>
              
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 group-hover:text-primary transition-colors">
                {feature.title}
              </h3>
              
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-sm">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* === Call to Action === */}
        <div className="bg-gradient-to-br from-rose-900/60 to-rose-900/60 border border-primary/70 rounded-3xl p-10 md:p-16 text-center space-y-8 relative overflow-hidden backdrop-blur-sm">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent pointer-events-none"></div>
          
          <h2 className="text-3xl md:text-4xl font-bold text-white dark:text-white relative z-10">
            Ready to Streamline Your Events?
          </h2>
          <p className="text-gray-200 dark:text-gray-300 text-lg max-w-xl mx-auto relative z-10">
            Join thousands of organizers who use Planora to bring their ideas to life. Start creating your next unforgettable event today.
          </p>
          <div className="pt-4 relative z-10">
            <Link
              href={user?.data?.role === "ADMIN" && "/admin-dashboard" || user?.data?.role === "USER" ? "/dashboard" : "/register"}
              className="inline-block bg-secondary hover:bg-secondary/80 text-white font-medium px-8 py-4 rounded-full transition-all duration-300 shadow-[0_0_20px_rgba(225,29,72,0.4)] hover:shadow-[0_0_30px_rgba(225,29,72,0.6)] transform hover:scale-105"
            >
              Get Started
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
