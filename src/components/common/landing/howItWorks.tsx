"use client";

import Link from "next/link";
import { UserPlus, CalendarSearch, Ticket, PartyPopper } from "lucide-react";

const steps = [
  {
    icon: UserPlus,
    step: "01",
    title: "Create Your Account",
    description:
      "Sign up in seconds. No credit card required. Start organizing or browsing events immediately.",
    color: "from-primary/20 to-primary/5",
    border: "border-primary/20",
    iconColor: "text-primary",
  },
  {
    icon: CalendarSearch,
    step: "02",
    title: "Discover Events",
    description:
      "Browse thousands of curated public and private events. Filter by type, date, location, and price.",
    color: "from-secondary/20 to-secondary/5",
    border: "border-secondary/20",
    iconColor: "text-secondary",
  },
  {
    icon: Ticket,
    step: "03",
    title: "Register & Pay",
    description:
      "Secure your spot with our seamless registration. Free events are one click. Paid events use Stripe for safety.",
    color: "from-amber-500/20 to-amber-500/5",
    border: "border-amber-500/20",
    iconColor: "text-amber-500",
  },
  {
    icon: PartyPopper,
    step: "04",
    title: "Attend & Enjoy",
    description:
      "Show up and make memories! After the event, leave a review and help other attendees decide.",
    color: "from-emerald-500/20 to-emerald-500/5",
    border: "border-emerald-500/20",
    iconColor: "text-emerald-500",
  },
];

export default function HowItWorks() {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-secondary/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl xl:max-w-[1200px] mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-secondary mb-3">Simple Process</p>
          <h2 className="text-4xl sm:text-5xl font-black text-gray-900 dark:text-white tracking-tight">
            How{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
              Planora
            </span>{" "}
            works
          </h2>
          <p className="mt-4 text-gray-600 dark:text-white/40 text-sm max-w-xl mx-auto">
            From sign-up to the event floor — we make the whole journey smooth, secure, and memorable.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((s, i) => {
            const Icon = s.icon;
            return (
              <div key={i} className="relative group">
                

                <div
                  className={`relative z-10 p-7 rounded-3xl bg-gradient-to-br ${s.color} border ${s.border} hover:shadow-xl transition-all duration-500 hover:-translate-y-2 h-full flex flex-col`}
                >
                 

                  {/* Icon */}
                  <div className={`w-12 h-12 rounded-2xl bg-white dark:bg-white/5 flex items-center justify-center mb-5 shadow-sm`}>
                    <Icon className={`w-6 h-6 ${s.iconColor}`} />
                  </div>

                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 leading-tight">
                    {s.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-white/50 leading-relaxed flex-1">
                    {s.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="text-center mt-14">
        </div>
      </div>
    </section>
  );
}
