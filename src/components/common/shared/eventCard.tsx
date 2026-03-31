"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Calendar,
  MapPin,
  User,
  Heart,
  CircleDollarSign,
  ArrowUpRight,
  Clock3,
} from "lucide-react";
import { format } from "date-fns";
import Image from "next/image";
import Link from "next/link";

export interface IEvent {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  venue: string;
  banner: string;
  type: "PRIVATE" | "PUBLIC";
  fee: number;
  isPaid: boolean;
  organizerId: string;
  createdAt: string;
  organizer: {
    id: string;
    name: string;
    email: string;
  };
}

interface EventCardProps {
  event: IEvent;
}

export const EventCard = ({ event }: EventCardProps) => {
  const eventDate = event?.date ? new Date(event.date) : new Date();
  const day = format(eventDate, "dd");
  const month = format(eventDate, "MMM").toUpperCase();
  const fullDate = format(eventDate, "EEE, MMM dd yyyy");

  return (
    <div className="group relative flex flex-col h-full rounded-2xl overflow-hidden border border-white/[0.06] bg-white/[0.03] backdrop-blur-lg transition-all duration-500 hover:border-white/[0.12] hover:bg-white/[0.05] hover:shadow-2xl hover:shadow-black/40 hover:-translate-y-1">
      {/* ── Image Section ── */}
      <div className="relative w-full h-52 overflow-hidden bg-zinc-900 flex-shrink-0" style={{height: '208px'}}>
        <Image
          src={event?.banner || "/img/event.jpg"}
          alt={event?.title || "Event"}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover object-center transition-transform duration-700 group-hover:scale-110"
          priority
          unoptimized
        />
        {/* Dark scrim */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />


        {/* ── Type Badge (bottom-left) ── */}
        <div className="absolute bottom-4 left-4">
          <Badge className={`text-[13px] font-bold tracking-widest px-5 py-3 rounded-full uppercase border backdrop-blur-md ${event?.type === "PUBLIC"
            ? "bg-sky-500/20 text-sky-300 border-sky-500/30"
            : "bg-rose-500  text-white border-rose-500"
            }`}>
            {event?.type === "PUBLIC" ? "Public" : "Private"}
          </Badge>
        </div>

        
      </div>

      {/* ── Card Body ── */}
      <div className="flex flex-col flex-1 p-5 gap-4">
        {/* Title + Organizer */}
        <div>
          <h3 className="text-lg font-black text-white leading-tight line-clamp-1 tracking-tight transition-colors duration-300 group-hover:text-primary">
            {event?.title}
          </h3>
          <p className="mt-1 text-xs font-medium text-white/40 flex items-center gap-1.5">
            <User className="h-3 w-3" />
            {event?.organizer?.name}
          </p>
        </div>

        {/* Description */}
        <p className="text-sm line-clamp-1 text-white/50 leading-relaxed ">
          {event?.description}
        </p>

        {/* Meta List */}
        <div className="space-y-2.5 pb-1">
          <div className="flex items-center gap-3 text-sm">
            <span className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-xl bg-white/5 border border-white/[0.07]">
              <MapPin className="h-3.5 w-3.5 text-white/40" />
            </span>
            <span className="text-white/70 font-medium line-clamp-1">{event?.venue}</span>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <span className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-xl bg-white/5 border border-white/[0.07]">
              <Calendar className="h-3.5 w-3.5 text-white/40" />
            </span>
            <span className="text-white/70 font-medium">{fullDate}</span>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <span className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-xl bg-white/5 border border-white/[0.07]">
              <Clock3 className="h-3.5 w-3.5 text-white/40" />
            </span>
            <span className="text-white/70 font-medium">{event?.time}</span>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <span className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-xl bg-white/5 border border-white/[0.07]">
              <CircleDollarSign className="h-3.5 w-3.5 text-white/40" />
            </span>
            <span className={`font-bold tracking-tight ${event?.isPaid ? "text-amber-300" : "text-emerald-300"}`}>
              {event?.isPaid ? `Registration fee: $${event.fee}` : "Free Registration"}
            </span>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/[0.06] mt-auto" />

        {/* ── Action Buttons ── */}
        <div className="grid  gap-3 pt-1">
          <Link href={`/events/${event?.id}`}
            className="h-10 rounded-xl cursor-pointer border-white/10 flex items-center justify-center bg-rose-800/70 hover:bg-rose-900/80 text-white/70 hover:text-white font-bold text-xs uppercase tracking-[0.12em] transition-all duration-300 gap-1.5"
          >
            Details
            <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
};
