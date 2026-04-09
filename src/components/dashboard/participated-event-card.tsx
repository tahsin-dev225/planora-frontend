"use client";

import Image from "next/image";
import Link from "next/link";
import { format } from "date-fns";
import {
  Calendar,
  MapPin,
  User,
  Clock,
  Globe,
  Lock,
  CircleDollarSign,
  ArrowRight,
  CheckCircle2,
  Clock3,
  AlertCircle,
} from "lucide-react";

interface Organizer {
  id: string;
  name: string;
  email: string;
}

interface ParticipatedEvent {
  id: string;
  banner?: string;
  title: string;
  description: string;
  date: string;
  time: string;
  venue: string;
  type: "PUBLIC" | "PRIVATE";
  fee: number;
  isPaid: boolean;
  organizer: Organizer;
}

interface ParticipationRecord {
  id: string;
  status: "APPROVED" | "PENDING" | "NEED_PAYMENT" | string;
  createdAt: string;
  event: ParticipatedEvent;
}

const STATUS_CONFIG = {
  APPROVED: {
    label: "Approved",
    icon: CheckCircle2,
    classes: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
  },
  PENDING: {
    label: "Pending",
    icon: Clock3,
    classes: "bg-amber-500/15 text-amber-400 border-amber-500/30",
  },
  NEED_PAYMENT: {
    label: "Payment Required",
    icon: AlertCircle,
    classes: "bg-primary/15 text-rose-400 border-primary/30",
  },
} as const;

export const ParticipatedEventCard = ({ record }: { record: ParticipationRecord }) => {
  const { event, status, createdAt } = record;
  const statusCfg =
    STATUS_CONFIG[status as keyof typeof STATUS_CONFIG] ?? STATUS_CONFIG.PENDING;
  const StatusIcon = statusCfg.icon;
  const eventDate = new Date(event.date);
  const dayNum = format(eventDate, "dd");
  const monthStr = format(eventDate, "MMM").toUpperCase();

  return (
    <div className="group flex flex-row w-full rounded-2xl bg-white/[0.03] border border-white/[0.07] overflow-hidden hover:border-white/[0.14] transition-all duration-300 hover:shadow-xl hover:shadow-black/30 hover:-translate-y-0.5">

      {/* ── Left: Banner ── */}
      <div className="relative w-44 sm:w-52 md:w-60 flex-shrink-0 overflow-hidden bg-zinc-900">
        <Image
          src={event.banner || "/img/event.jpg"}
          alt={event.title}
          fill
          className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
          unoptimized
        />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#111]/60" />

        {/* Floating date badge */}
        <div className="absolute top-3 left-3 flex flex-col items-center justify-center bg-black/60 backdrop-blur-md border border-white/20 rounded-xl px-2.5 py-2 min-w-[44px]">
          <span className="text-lg font-black text-white leading-none">{dayNum}</span>
          <span className="text-[9px] font-bold text-white/50 uppercase tracking-widest">{monthStr}</span>
        </div>
      </div>

      {/* ── Right: Content ── */}
      <div className="flex flex-col flex-1 min-w-0 p-4 sm:p-5">

        {/* Top row: badges + status */}
        <div className="flex items-start justify-between gap-3 mb-3">
          {/* Type + Payment chips */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide border ${
              event.type === "PUBLIC"
                ? "bg-sky-500/15 text-sky-400 border-sky-500/25"
                : "bg-violet-500/15 text-violet-400 border-violet-500/25"
            }`}>
              {event.type === "PUBLIC"
                ? <Globe className="h-2.5 w-2.5" />
                : <Lock className="h-2.5 w-2.5" />}
              {event.type === "PUBLIC" ? "Public" : "Private"}
            </span>
            <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide border ${
              event.isPaid
                ? "bg-amber-500/15 text-amber-400 border-amber-500/25"
                : "bg-emerald-500/15 text-emerald-400 border-emerald-500/25"
            }`}>
              <CircleDollarSign className="h-2.5 w-2.5" />
              {event.isPaid ? `$${event.fee}` : "Free"}
            </span>
          </div>

          {/* Status badge */}
          <div className={`flex-shrink-0 flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-[10px] font-bold ${statusCfg.classes}`}>
            <StatusIcon className="h-3 w-3" />
            <span className="hidden sm:inline">{statusCfg.label}</span>
          </div>
        </div>

        {/* Title */}
        <h3 className="text-sm sm:text-base font-black text-white leading-snug line-clamp-1 mb-2 group-hover:text-white/90 transition-colors">
          {event.title}
        </h3>

        {/* Meta */}
        <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-white/35 mb-auto">
          <span className="flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5 flex-shrink-0" />
            {event.time}
          </span>
          <span className="flex items-center gap-1.5 min-w-0">
            <MapPin className="h-3.5 w-3.5 flex-shrink-0" />
            <span className="truncate max-w-[160px]">{event.venue}</span>
          </span>
          <span className="flex items-center gap-1.5">
            <User className="h-3.5 w-3.5 flex-shrink-0" />
            <span>
              by <span className="text-white/55 font-semibold">{event.organizer?.name}</span>
            </span>
          </span>
          <span className="flex items-center gap-1.5">
            <Calendar className="h-3.5 w-3.5 flex-shrink-0" />
            Joined {format(new Date(createdAt), "MMM dd, yyyy")}
          </span>
        </div>

        {/* Bottom row */}
        <div className="flex items-center justify-between mt-4 pt-3 border-t border-white/[0.06]">
          {status === "NEED_PAYMENT" ? (
            <p className="text-[11px] text-rose-400/70 font-medium">
              Complete payment to confirm your spot
            </p>
          ) : (
            <span />
          )}
          <Link
            href={`/events/${event.id}`}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white/[0.05] hover:bg-white/[0.09] border border-white/[0.08] text-white/55 hover:text-white text-xs font-bold transition-all group/btn"
          >
            View Event
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover/btn:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </div>
  );
};
