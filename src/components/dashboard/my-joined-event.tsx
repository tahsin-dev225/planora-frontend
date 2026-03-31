"use client";

import { useGetMyJoinedEventsQuery } from "@/redux/features/participantSlice/participantSlice";
import { ParticipatedEventCard } from "./participated-event-card";
import { CalendarX2 } from "lucide-react";
import Link from "next/link";

/* ── Skeleton card (horizontal) ── */
const CardSkeleton = () => (
  <div className="flex flex-row w-full rounded-2xl bg-white/[0.03] border border-white/[0.06] overflow-hidden animate-pulse">
    <div className="w-52 flex-shrink-0 h-32 bg-white/[0.05]" />
    <div className="flex-1 p-5 space-y-3">
      <div className="flex gap-2">
        <div className="h-5 w-16 bg-white/[0.06] rounded-full" />
        <div className="h-5 w-14 bg-white/[0.06] rounded-full" />
      </div>
      <div className="h-4 w-2/3 bg-white/[0.06] rounded-lg" />
      <div className="flex gap-4">
        <div className="h-3 w-20 bg-white/[0.04] rounded-full" />
        <div className="h-3 w-28 bg-white/[0.04] rounded-full" />
      </div>
      <div className="border-t border-white/[0.05] pt-3">
        <div className="h-8 w-28 bg-white/[0.05] rounded-xl ml-auto" />
      </div>
    </div>
  </div>
);


const MyJoinedEvent = () => {
  const { data, isLoading } = useGetMyJoinedEventsQuery();
  const participants = data?.data ?? [];

  return (
    <div className="min-h-[60vh] bg-[#0a0a0a] text-white py-8 px-4 sm:px-6">

      {/* Header */}
      <div className="mb-8">
        <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-primary/70 mb-2">
          My Activity
        </p>
        <h1 className="text-2xl md:text-3xl font-black tracking-tight text-white">
          Joined Events
        </h1>
        <p className="mt-1.5 text-white/35 text-sm">
          All events you have registered or applied for.
        </p>
      </div>

      {/* Loading */}
      {isLoading && (
        <div className="grid grid-cols-1 gap-5">
          {[...Array(3)].map((_, i) => <CardSkeleton key={i} />)}
        </div>
      )}

      {/* Empty state */}
      {!isLoading && participants.length === 0 && (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <div className="h-16 w-16 rounded-2xl bg-white/[0.04] border border-white/[0.07] flex items-center justify-center mb-5">
            <CalendarX2 className="h-7 w-7 text-white/20" />
          </div>
          <h3 className="text-lg font-black text-white mb-2">No events yet</h3>
          <p className="text-white/30 text-sm max-w-xs mb-6">
            You haven't joined any events. Browse and register for an event to see it here.
          </p>
          <Link
            href="/events"
            className="px-5 py-2.5 rounded-xl bg-primary/10 hover:bg-primary/20 border border-primary/20 text-primary text-sm font-bold transition-all"
          >
            Explore Events
          </Link>
        </div>
      )}

      {/* Grid */}
      {!isLoading && participants.length > 0 && (
        <>
          {/* Summary strip */}
          <div className="flex flex-wrap gap-3 mb-6">
            {["APPROVED", "PENDING", "NEED_PAYMENT"].map((s) => {
              const count = participants.filter((p: any) => p.status === s).length;
              if (count === 0) return null;
              const colorMap: Record<string, string> = {
                APPROVED: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
                PENDING: "bg-amber-500/10 text-amber-400 border-amber-500/20",
                NEED_PAYMENT: "bg-rose-500/10 text-rose-400 border-rose-500/20",
              };
              const labelMap: Record<string, string> = {
                APPROVED: "Approved",
                PENDING: "Pending",
                NEED_PAYMENT: "Payment Required",
              };
              return (
                <span key={s} className={`px-3 py-1.5 rounded-full border text-[11px] font-bold ${colorMap[s]}`}>
                  {count} {labelMap[s]}
                </span>
              );
            })}
            <span className="px-3 py-1.5 rounded-full border border-white/[0.08] text-[11px] font-bold text-white/30 bg-white/[0.03]">
              {participants.length} Total
            </span>
          </div>

          <div className="grid grid-cols-1 gap-5">
            {participants.map((record: any) => (
              <ParticipatedEventCard key={record.id} record={record} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default MyJoinedEvent;