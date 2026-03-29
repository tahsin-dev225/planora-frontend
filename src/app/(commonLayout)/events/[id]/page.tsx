"use client";

import { useGetEventByIdQuery } from "@/redux/features/eventSlice/eventSlice";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  Calendar,
  Clock,
  MapPin,
  User,
  ArrowLeft,
  Star,
  Globe,
  Lock,
  CircleDollarSign,
  BadgeCheck,
  MessageSquare,
} from "lucide-react";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useAddParticipantMutation } from "@/redux/features/participantSlice/participantSlice";
import { toast } from "sonner";

const StarRating = ({ rating }: { rating: number }) => (
  <div className="flex items-center gap-0.5">
    {[1, 2, 3, 4, 5].map((s) => (
      <Star
        key={s}
        className={`h-4 w-4 ${
          s <= rating ? "fill-amber-400 text-amber-400" : "text-white/20"
        }`}
      />
    ))}
  </div>
);

const SkeletonBlock = ({ className }: { className?: string }) => (
  <div className={`animate-pulse rounded-xl bg-white/[0.05] ${className}`} />
);

const EventDetailsPage = () => {
  const { id } = useParams();
  const { data, isLoading, isError } = useGetEventByIdQuery(id as string);
  const event = data?.data;
  const [addParticipant] = useAddParticipantMutation();
  const buttonClass ="w-full h-12 rounded-xl bg-slate-500 hover:bg-slate-500/90 text-white font-black text-sm uppercase tracking-[0.12em] transition-all hover:scale-[1.02] hover:shadow cursor-pointer hover:shadow-slate-500/25 active:scale-95"

  const handleAddParticipant = async () => {
    try {
      const response = await addParticipant({ eventId: event?.id as string }).unwrap() as any;
      // If a Stripe payment URL is returned, redirect immediately
      const paymentUrl = response?.data?.paymentUrl;
      if (paymentUrl) {
        window.location.href = paymentUrl;
        return;
      }
      toast.success("Successfully joined the event!");
    } catch (error: any) {
      const msg = error?.data?.message || "Failed to join event. Please try again.";
      toast.error(msg);
    }
  };


  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] pt-20">
        <SkeletonBlock className="w-full h-[420px]" />
        <div className="max-w-5xl mx-auto px-6 py-12 space-y-6">
          <SkeletonBlock className="h-10 w-3/4" />
          <SkeletonBlock className="h-5 w-1/2" />
          <SkeletonBlock className="h-32 w-full" />
        </div>
      </div>
    );
  }

  // ── Error State
  if (isError || !event) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex flex-col items-center justify-center text-center px-6">
        <div className="text-6xl mb-6">😕</div>
        <h2 className="text-2xl font-black text-white mb-3">Event not found</h2>
        <p className="text-white/40 mb-8 text-sm">
          This event may have been removed or doesn't exist.
        </p>
        <Link href="/events">
          <Button variant="default" className="rounded-xl">
            ← Back to Events
          </Button>
        </Link>
      </div>
    );
  }

  const eventDate = new Date(event.date);
  const fullDate = format(eventDate, "EEEE, MMMM dd, yyyy");
  const dayNum = format(eventDate, "dd");
  const monthStr = format(eventDate, "MMM").toUpperCase();
  const avgRating =
    event.reviews?.length > 0
      ? (
          event.reviews.reduce((sum: number, r: any) => sum + r.rating, 0) /
          event.reviews.length
        ).toFixed(1)
      : null;

  return (
    <div className="min-h-screen bg-[#0a0a0a] pt-20 text-white">
      <div className="relative w-full h-[420px] md:h-[520px] overflow-hidden bg-zinc-900">
        <Image
          src={event.banner || "/img/event.jpg"}
          alt={event.title}
          fill
          className="object-cover object-center"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a]/70 via-transparent to-transparent" />

        {/* Back button */}
        <div className="absolute top-24 left-6">
          <Link href="/events">
            <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-black/40 backdrop-blur-md border border-white/10 text-sm text-white/70 hover:text-white hover:bg-black/60 transition-all">
              <ArrowLeft className="h-4 w-4" />
              All Events
            </button>
          </Link>
        </div>

        {/* Floating Date Badge */}
        <div className="absolute top-24 right-6 flex flex-col items-center justify-center bg-black/50 backdrop-blur-xl border border-white/20 rounded-2xl px-4 py-3 shadow-2xl min-w-[60px]">
          <span className="text-3xl font-black text-white leading-none">{dayNum}</span>
          <span className="text-[11px] font-bold text-white/60 uppercase tracking-widest mt-1">{monthStr}</span>
        </div>

        {/* Hero text pinned to bottom */}
        <div className="absolute bottom-0 left-0 right-0 px-6 pb-10 max-w-5xl mx-auto">
          <div className="flex flex-wrap gap-2 mb-4">
            <Badge
              className={`text-[11px] font-bold tracking-widest px-3 py-1 rounded-full uppercase border backdrop-blur-md ${
                event.type === "PUBLIC"
                  ? "bg-sky-500/20 text-sky-300 border-sky-500/30"
                  : "bg-violet-500/20 text-violet-300 border-violet-500/30"
              }`}
            >
              {event.type === "PUBLIC" ? (
                <Globe className="mr-1.5 h-3 w-3" />
              ) : (
                <Lock className="mr-1.5 h-3 w-3" />
              )}
              {event.type === "PUBLIC" ? "Public Event" : "Private Session"}
            </Badge>
            <Badge
              className={`text-[11px] font-bold tracking-widest px-3 py-1 rounded-full uppercase border backdrop-blur-md ${
                event.isPaid
                  ? "bg-amber-500/20 text-amber-300 border-amber-500/30"
                  : "bg-emerald-500/20 text-emerald-300 border-emerald-500/30"
              }`}
            >
              {event.isPaid ? `$${event.fee} Entry` : "Free Admission"}
            </Badge>
          </div>
          <h1 className="text-3xl md:text-5xl font-black tracking-tight leading-tight text-white drop-shadow-2xl">
            {event.title}
          </h1>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-10">

            {/* About */}
            <section>
              <h2 className="text-lg font-black uppercase tracking-widest text-white/40 mb-4">
                About This Event
              </h2>
              <p className="text-white/70 leading-relaxed text-base">
                {event.description}
              </p>
            </section>

            {/* Divider */}
            <div className="border-t border-white/[0.06]" />

            {/* Reviews */}
            <section>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-black uppercase tracking-widest text-white/40 flex items-center gap-2">
                  <MessageSquare className="h-5 w-5" />
                  Reviews
                </h2>
                {avgRating && (
                  <div className="flex items-center gap-2 bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-2">
                    <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                    <span className="text-white font-black text-lg">{avgRating}</span>
                    <span className="text-white/30 text-xs">/ 5</span>
                  </div>
                )}
              </div>

              {event.reviews?.length > 0 ? (
                <div className="space-y-4">
                  {event.reviews.map((review: any) => (
                    <div
                      key={review.id}
                      className="rounded-2xl bg-white/[0.03] border border-white/[0.07] p-5 space-y-3 hover:border-white/[0.12] transition-colors"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex items-center gap-3">
                          <div className="h-9 w-9 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center text-primary font-black text-sm">
                            {review.userId.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <p className="text-sm font-bold text-white">
                              Anonymous User
                            </p>
                            <p className="text-xs text-white/30">
                              {format(new Date(review.createdAt), "MMM dd, yyyy")}
                            </p>
                          </div>
                        </div>
                        <StarRating rating={review.rating} />
                      </div>
                      <p className="text-sm text-white/60 leading-relaxed pl-12">
                        "{review.comment}"
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="rounded-2xl bg-white/[0.03] border border-white/[0.06] p-8 text-center">
                  <p className="text-white/30 text-sm">
                    No reviews yet. Be the first!
                  </p>
                </div>
              )}
            </section>
          </div>

          {/* ── RIGHT: Info Sidebar ── */}
          <div className="space-y-5">

            {/* Info Card */}
            <div className="rounded-2xl bg-white/[0.03] border border-white/[0.07] p-6 space-y-4 sticky top-24">
              <h3 className="text-xs font-black uppercase tracking-widest text-white/30 mb-2">
                Event Details
              </h3>

              {/* Date */}
              <div className="flex items-start gap-3">
                <span className="flex-shrink-0 flex items-center justify-center w-9 h-9 rounded-xl bg-white/5 border border-white/[0.07]">
                  <Calendar className="h-4 w-4 text-white/40" />
                </span>
                <div>
                  <p className="text-xs text-white/30 uppercase tracking-wider mb-0.5">Date</p>
                  <p className="text-sm font-bold text-white">{fullDate}</p>
                </div>
              </div>

              {/* Time */}
              <div className="flex items-start gap-3">
                <span className="flex-shrink-0 flex items-center justify-center w-9 h-9 rounded-xl bg-white/5 border border-white/[0.07]">
                  <Clock className="h-4 w-4 text-white/40" />
                </span>
                <div>
                  <p className="text-xs text-white/30 uppercase tracking-wider mb-0.5">Time</p>
                  <p className="text-sm font-bold text-white">{event.time}</p>
                </div>
              </div>

              {/* Venue */}
              <div className="flex items-start gap-3">
                <span className="flex-shrink-0 flex items-center justify-center w-9 h-9 rounded-xl bg-white/5 border border-white/[0.07]">
                  <MapPin className="h-4 w-4 text-white/40" />
                </span>
                <div>
                  <p className="text-xs text-white/30 uppercase tracking-wider mb-0.5">Venue</p>
                  <p className="text-sm font-bold text-white">{event.venue}</p>
                </div>
              </div>

              {/* Price */}
              <div className="flex items-start gap-3">
                <span className="flex-shrink-0 flex items-center justify-center w-9 h-9 rounded-xl bg-white/5 border border-white/[0.07]">
                  <CircleDollarSign className="h-4 w-4 text-white/40" />
                </span>
                <div>
                  <p className="text-xs text-white/30 uppercase tracking-wider mb-0.5">Price</p>
                  <p className={`text-sm font-black ${event.isPaid ? "text-amber-300" : "text-emerald-300"}`}>
                    {event.isPaid ? `$${event.fee}` : "Free"}
                  </p>
                </div>
              </div>

              <div className="border-t border-white/[0.06] my-2" />

              {/* Organizer */}
              <div className="flex items-start gap-3">
                <span className="flex-shrink-0 flex items-center justify-center w-9 h-9 rounded-xl bg-primary/10 border border-primary/20">
                  <User className="h-4 w-4 text-primary/70" />
                </span>
                <div>
                  <p className="text-xs text-white/30 uppercase tracking-wider mb-0.5">Organizer</p>
                  <p className="text-sm font-bold text-white flex items-center gap-1.5">
                    {event.organizer?.name}
                    <BadgeCheck className="h-4 w-4 text-sky-400" />
                  </p>
                  <p className="text-xs text-white/30 mt-0.5">{event.organizer?.email}</p>
                </div>
              </div>

              <div className="border-t border-white/[0.06] my-2" />

              {/* CTA */}
              {/* // <Button
              //   className="w-full h-12 rounded-xl bg-slate-500 hover:bg-slate-500/90 text-white font-black text-sm uppercase tracking-[0.12em] transition-all hover:scale-[1.02] hover:shadow cursor-pointer hover:shadow-slate-500/25 active:scale-95"
              // >
              //   {event.isPaid ? `Buy Ticket — $${event.fee}` : "Join for Free"}
              // </Button> */}

              {!event.isPaid && event.type === "PUBLIC" && <Button className={buttonClass} onClick={handleAddParticipant}>Join for Free</Button>}

              {event?.isPaid && event?.type === "PUBLIC" && (
                <Button className={buttonClass} onClick={handleAddParticipant}>
                  Buy Ticket — ${event.fee}
                </Button>
              )}

                {!event.isPaid && event.type === "PRIVATE" && <Button onClick={handleAddParticipant} className={buttonClass} > Request For Join </Button>}

                {event.isPaid && event.type === "PRIVATE" && <Button onClick={handleAddParticipant} className={buttonClass}>Go To Checkout — ${event.fee}</Button>}

              {event.isPaid && <p className="text-center text-[10px] text-white/20">
                Secure checkout · No hidden fees
              </p>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetailsPage;