"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

// make teal to rose

export default function AboutPage() {
  return (
    <div className="min-h-screen w-full bg-[#121212] flex flex-col overflow-x-hidden items-center">
      {/* Container to restrict max width for large screens */}
      <div className="max-w-7xl xl:max-w-[1200px] 2xl:max-w-[1400px] 3xl:max-w-[1500px] w-full px-6 md:px-12 lg:px-20 py-20 pb-40 space-y-40">
        
        {/* === Section 1: Hero Intro === */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start mt-10">
          
          {/* Left Side: Text & Small Images */}
          <div className="space-y-12 block">
            {/* Text Block */}
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
                Transforming Your Ideas into <span className="text-rose-500 italic font-serif">Memorable Events</span>
              </h1>
              <p className="text-gray-400 text-lg leading-relaxed max-w-md">
                From corporate galas to exclusive private parties, our dedicated event management team handles every meticulous detail—so you can simply enjoy the moment.
              </p>
              <Link
                href="/events"
                className="inline-block bg-[#1f1f1f] border border-gray-700 hover:border-rose-500 text-white font-medium px-8 py-3 transition-colors duration-300 relative group overflow-hidden"
              >
                <span className="relative z-10">View All Events</span>
                <div className="absolute inset-0 bg-rose-600 translate-y-full group-hover:translate-y-0 transition-transform duration-300 z-0"></div>
              </Link>
            </div>

            {/* Sub-images grid */}
            <div className="flex gap-4 items-end mt-12 md:mt-24">
              <div className="w-1/2 overflow-hidden rounded-sm shadow-2xl relative h-48 md:h-64">
                <Image
                  src="/img/hangout.jpg"
                  alt="Floral Decor"
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="w-1/2 overflow-hidden rounded-sm shadow-2xl relative h-56 md:h-72">
                <Image
                  src="/img/banner.png"
                  alt="Happy Guests"
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
            </div>
          </div>

          {/* Right Side: Large Rectangular Image + Circular Overlay */}
          <div className="relative h-96 md:h-[600px] lg:h-[800px] w-full mt-10 lg:mt-0">
            {/* Main Tall Image */}
            <div className="absolute top-0 right-0 w-full lg:w-11/12 h-full bg-[#1e1e1e] overflow-hidden shadow-2xl">
              <Image
                src="/img/manage.jpg"
                alt="Event Banquet"
                fill
                className="object-cover opacity-80"
              />
            </div>
            
            {/* Circular Overlay Image (bottom-right overlap) */}
            <div className="absolute -bottom-16 md:-bottom-24 -right-4 md:-right-12 w-40 h-40 md:w-64 md:h-64 rounded-full border-8 border-[#121212] overflow-hidden z-10 shadow-xl bg-gray-900">
              <img
                src="/img/weding2.jpg"
                alt="Centerpiece Detail"
                className="w-full h-full object-cover opacity-90 hover:opacity-100 transition-opacity"
              />
            </div>
          </div>
        </div>

        {/* === Section 2: Services & Quick Contact === */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start relative">
          
          {/* Faint Background Text for stylistic flair */}
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[12rem] lg:text-[20rem] font-serif font-black text-white/[0.02] tracking-widest uppercase pointer-events-none select-none -z-10">
            Celebrate
          </div>

          {/* Left Side: Services List & Form (Col Span 5) */}
          <div className="col-span-1 lg:col-span-5 space-y-12">
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight">
                The Celebration of a Lifetime: <br/><span className="text-rose-500 font-serif italic">Our Core Services</span>
              </h2>
              
              {/* Features List */}
              <div className="grid grid-cols-1 gap-y-4 gap-x-6 text-gray-400 text-sm md:text-base">
                {[
                  "Corporate Events", "Gala Dinners", "Product Launches", "Private Parties",
                  "Exhibitions", "Live Concerts", "Weddings", "Award Ceremonies"
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center space-x-2">
                    <span className="w-1.5 h-1.5 bg-rose-500 rounded-full"></span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Contact Form */}
            {/* <div className="bg-[#161616] border border-gray-800 p-8 shadow-xl mt-12 w-full lg:max-w-md">
              <h3 className="text-2xl font-bold text-white mb-6">Joining Together</h3>
              <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
                <input
                  type="text"
                  placeholder="Name"
                  className="w-full bg-transparent border-b border-gray-700 pb-3 text-white placeholder-gray-500 focus:outline-none focus:border-teal-500 transition-colors"
                />
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full bg-transparent border-b border-gray-700 pb-3 text-white placeholder-gray-500 focus:outline-none focus:border-teal-500 transition-colors"
                />
                <input
                  type="text"
                  placeholder="Phone"
                  className="w-full bg-transparent border-b border-gray-700 pb-3 text-white placeholder-gray-500 focus:outline-none focus:border-teal-500 transition-colors"
                />
                <button
                  type="submit"
                  className="mt-4 bg-[#232323] hover:bg-teal-600 text-white text-sm font-medium py-3 px-6 transition-colors duration-300 w-full sm:w-auto"
                >
                  Get in Touch
                </button>
              </form>
            </div> */}
          </div>

          {/* Right Side: Portrait Image & Intro Card (Col Span 7) */}
          <div className="col-span-1 lg:col-span-7 relative flex justify-end mt-12 lg:mt-0">
            <div className="relative w-full md:w-4/5 h-[500px] md:h-[700px] overflow-hidden shadow-2xl border-l-[1px] border-gray-800">
              <Image
                src="/img/party.jpg"
                alt="Event Director"
                fill
                className="object-cover object-center opacity-80"
              />
              {/* Dark gradient overlay at bottom for card blending */}
              <div className="absolute bottom-0 w-full h-1/2 bg-gradient-to-t from-[#121212] to-transparent"></div>
            </div>

            {/* Overlapping Info Card */}
            <div className="absolute bottom-10 left-0 md:-left-12 bg-[#1a1a1a] border border-gray-800 p-8 shadow-2xl max-w-[320px] md:max-w-sm z-10 before:absolute before:inset-0 before:border-l-4 before:border-teal-500 before:pointer-events-none">
              <h4 className="text-2xl font-bold text-white mb-3">Hi, I'm Planora</h4>
              <p className="text-gray-400 text-sm leading-relaxed mb-4">
                You can here creat event We are passionate creators dedicated to making your event seamless, breathtaking, and thoroughly unforgettable. With a decade of expertise.
              </p>
              <Image
                src="/img/logo2.png" // assuming logo2 is available as per user's earlier action
                alt="Planora Signature"
                width={120}
                height={40}
                className="w-24 opacity-60 invert"
              />
            </div>
          </div>
        </div>

        {/* === Section 3: About Us Bottom === */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Side: Venue Image & Circular Badge */}
          <div className="relative h-[400px] md:h-[500px] w-full flex justify-end">
            <div className="relative w-11/12 h-full bg-gray-900 shadow-2xl overflow-hidden">
              <Image
                src="/img/event.jpg"
                alt="Networking Event"
                fill
                className="object-cover opacity-70"
              />
            </div>
            
            {/* Circular Overlay Image (bottom-left overlap) */}
            <div className="absolute -bottom-16 md:-bottom-20 -left-6 md:-left-10 w-48 h-48 md:w-56 md:h-56 rounded-full border-8 border-[#121212] overflow-hidden z-10 shadow-xl bg-gray-900">
              <img
                src="/img/wedding.jpg"
                alt="Event Crowd overlay"
                className="w-full h-full object-cover opacity-90"
              />
            </div>
          </div>

          {/* Right Side: About Us Text Details */}
          <div className="bg-[#161616] p-10 md:p-14 border border-gray-800 shadow-xl lg:-ml-12 z-10 space-y-6 mt-16 md:mt-20 lg:mt-0">
            <h2 className="text-3xl font-bold text-white">About Us</h2>
            <p className="text-gray-300 text-base leading-relaxed">
              We do the hard work for you. Let us craft a tailored experience from venue selection to seamless day-of execution.
            </p>
            <ul className="space-y-3 text-sm text-gray-400">
              <li className="flex items-start">
                <span className="text-rose-500 mr-2">✓</span>
                Comprehensive planning solutions.
              </li>
              <li className="flex items-start">
                <span className="text-rose-500 mr-2">✓</span>
                Trusted network of premium vendors.
              </li>
              <li className="flex items-start">
                <span className="text-rose-500 mr-2">✓</span>
                On-site coordination and flawless execution.
              </li>
              <li className="flex items-start">
                <span className="text-rose-500 mr-2">✓</span>
                Stunning decor and production design.
              </li>
            </ul>
            <div className="pt-4">
              <Link
                href="/about-detail"
                className="inline-block bg-[#1f1f1f] border border-gray-700 hover:border-rose-500 text-white text-sm font-medium px-6 py-3 transition-colors duration-300"
              >
                LEARN MORE
              </Link>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}