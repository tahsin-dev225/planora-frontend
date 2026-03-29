"use client";

import { useAddEventMutation } from "@/redux/features/eventSlice/eventSlice";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { toast } from "sonner";
import {
  Calendar,
  Clock,
  MapPin,
  DollarSign,
  Globe,
  Lock,
  ImagePlus,
  X,
  Loader2,
  Sparkles,
  FileText,
  CreditCard,
} from "lucide-react";
import Image from "next/image";

type EventType = "PUBLIC" | "PRIVATE";

const FIELD_BASE =
  "w-full bg-white/[0.04] border border-white/[0.09] rounded-xl px-4 py-3 text-sm text-white placeholder-white/25 outline-none focus:border-primary/60 focus:ring-1 focus:ring-primary/30 transition-all";

const Label = ({
  children,
  icon,
  required,
}: {
  children: React.ReactNode;
  icon?: React.ReactNode;
  required?: boolean;
}) => (
  <label className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-white/40 mb-2">
    {icon && <span className="text-white/30">{icon}</span>}
    {children}
    {required && <span className="text-rose-400 ml-0.5">*</span>}
  </label>
);

const AddEvents = () => {
  const router = useRouter();
  const [addEvent, { isLoading }] = useAddEventMutation();
  const fileInputRef = useRef<HTMLInputElement>(null);

  /* ── Form State ── */
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("12:00 PM");
  const [venue, setVenue] = useState("");
  const [type, setType] = useState<EventType>("PUBLIC");
  const [isPaid, setIsPaid] = useState(false);
  const [fee, setFee] = useState<number>(0);
  const [bannerFile, setBannerFile] = useState<File | null>(null);
  const [bannerPreview, setBannerPreview] = useState<string | null>(null);

  console.log("all State", title, description, date, time, venue, type, isPaid, fee, bannerFile, bannerPreview);

  const handleBannerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setBannerFile(file);
    setBannerPreview(URL.createObjectURL(file));
  };

  const removeBanner = () => {
    setBannerFile(null);
    setBannerPreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim() || !description.trim() || !date || !time || !venue.trim()) {
      toast.error("Please fill in all required fields.");
      return;
    }
    if (isPaid && fee <= 0) {
      toast.error("Fee must be greater than 0 for paid events.");
      return;
    }

    const formData = new FormData();

    // Backend controller does JSON.parse(req.body.data),
    // so all JSON fields must be sent as one stringified "data" key.
    const eventPayload = {
      title: title.trim(),
      description: description.trim(),
      date,
      time,
      venue: venue.trim(),
      type,
      isPaid,
      fee: isPaid ? fee : 0,
    };
    formData.append("data", JSON.stringify(eventPayload));

    // Banner file goes as a separate multipart field
    if (bannerFile) formData.append("banner", bannerFile);
    try {
      toast.loading("Uploading banner...", { id: "banner" })
      await addEvent(formData).unwrap();
      toast.success("Event created successfully! 🎉", { id: "banner" });
      router.push("/dashboard");
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to create event. Try again.", { id: "banner" });
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white py-10 px-4">
      <div className="max-w-2xl mx-auto">

        {/* ── Header ── */}
        <div className="mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-[11px] font-bold uppercase tracking-widest mb-4">
            <Sparkles className="h-3 w-3" />
            New Event
          </div>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight text-white">
            Create an Event
          </h1>
          <p className="mt-2 text-white/35 text-sm">
            Fill in the details below to publish your event to the platform.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* ── Banner Upload ── */}
          <div>
            <Label icon={<ImagePlus className="h-3.5 w-3.5" />}>Banner Image</Label>
            <div
              onClick={() => fileInputRef.current?.click()}
              className={`relative w-full h-48 rounded-2xl border-2 border-dashed transition-all cursor-pointer overflow-hidden group
                ${bannerPreview
                  ? "border-transparent"
                  : "border-white/10 hover:border-primary/40 hover:bg-white/[0.02]"
                }`}
            >
              {bannerPreview ? (
                <>
                  <Image
                    src={bannerPreview}
                    alt="Banner preview"
                    fill
                    className="object-cover" 
                    unoptimized
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <p className="text-white text-sm font-bold">Click to change</p>
                  </div>
                  <button
                    type="button"
                    onClick={(e) => { e.stopPropagation(); removeBanner(); }}
                    className="absolute top-3 right-3 p-1.5 rounded-full bg-black/60 border border-white/20 text-white hover:bg-rose-500/80 transition-colors z-10"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                </>
              ) : (
                <div className="flex flex-col items-center justify-center h-full gap-3">
                  <div className="h-12 w-12 rounded-2xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center">
                    <ImagePlus className="h-5 w-5 text-white/30" />
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-white/40 font-medium">
                      Click to upload banner
                    </p>
                    <p className="text-xs text-white/20 mt-1">
                      PNG, JPG, WEBP — max 5MB
                    </p>
                  </div>
                </div>
              )}
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleBannerChange}
              className="hidden"
            />
          </div>

          {/* ── Title ── */}
          <div>
            <Label icon={<FileText className="h-3.5 w-3.5" />} required>
              Event Title
            </Label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Bangla Dibos Celebration 2026"
              className={FIELD_BASE}
              required
            />
          </div>

          {/* ── Description ── */}
          <div>
            <Label icon={<FileText className="h-3.5 w-3.5" />} required>
              Description
            </Label>
            <textarea
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Tell attendees what this event is about..."
              className={`${FIELD_BASE} resize-none`}
              required
            />
          </div>

          {/* ── Date & Time ── */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label icon={<Calendar className="h-3.5 w-3.5" />} required>
                Date
              </Label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className={`${FIELD_BASE} [color-scheme:dark]`}
                required
              />
            </div>
            <div>
              <Label icon={<Clock className="h-3.5 w-3.5" />} required>
                Time
              </Label>
              <input
                type="text"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                placeholder="e.g. 1:00 PM"
                className={FIELD_BASE}
                required
              />
            </div>
          </div>

          {/* ── Venue ── */}
          <div>
            <Label icon={<MapPin className="h-3.5 w-3.5" />} required>
              Venue
            </Label>
            <input
              type="text"
              value={venue}
              onChange={(e) => setVenue(e.target.value)}
              placeholder="e.g. Kuchiamora College Ground, Dhaka"
              className={FIELD_BASE}
              required
            />
          </div>

          {/* ── Type Toggle ── */}
          <div>
            <Label icon={<Globe className="h-3.5 w-3.5" />} required>
              Event Type
            </Label>
            <div className="grid grid-cols-2 gap-3">
              {(["PUBLIC", "PRIVATE"] as EventType[]).map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setType(t)}
                  className={`flex items-center justify-center gap-2.5 py-3 rounded-xl border text-sm font-bold transition-all
                    ${type === t
                      ? t === "PUBLIC"
                        ? "bg-sky-500/20 border-sky-500/50 text-sky-300"
                        : "bg-violet-500/20 border-violet-500/50 text-violet-300"
                      : "bg-white/[0.03] border-white/[0.08] text-white/40 hover:border-white/20 hover:text-white/60"
                    }`}
                >
                  {t === "PUBLIC" ? (
                    <Globe className="h-4 w-4" />
                  ) : (
                    <Lock className="h-4 w-4" />
                  )}
                  {t === "PUBLIC" ? "Public" : "Private"}
                </button>
              ))}
            </div>
          </div>

          {/* ── Paid Toggle ── */}
          <div>
            <Label icon={<CreditCard className="h-3.5 w-3.5" />} required>
              Admission
            </Label>
            <div className="grid grid-cols-2 gap-3">
              {[false, true].map((paid) => (
                <button
                  key={String(paid)}
                  type="button"
                  onClick={() => { setIsPaid(paid); if (!paid) setFee(0); }}
                  className={`flex items-center justify-center gap-2.5 py-3 rounded-xl border text-sm font-bold transition-all
                    ${isPaid === paid
                      ? paid
                        ? "bg-amber-500/20 border-amber-500/50 text-amber-300"
                        : "bg-emerald-500/20 border-emerald-500/50 text-emerald-300"
                      : "bg-white/[0.03] border-white/[0.08] text-white/40 hover:border-white/20 hover:text-white/60"
                    }`}
                >
                  <DollarSign className="h-4 w-4" />
                  {paid ? "Paid" : "Free"}
                </button>
              ))}
            </div>
          </div>

          {/* ── Fee (only if paid) ── */}
          {isPaid && (
            <div
              className="animate-in slide-in-from-top-2 fade-in duration-300"
            >
              <Label icon={<DollarSign className="h-3.5 w-3.5" />} required>
                Ticket Fee (USD)
              </Label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 text-sm font-bold">$</span>
                <input
                  type="number"
                  min={1}
                  step={0.01}
                  value={fee === 0 ? "" : fee}
                  onChange={(e) => setFee(Number(e.target.value))}
                  placeholder="0.00"
                  className={`${FIELD_BASE} pl-8`}
                  required={isPaid}
                />
              </div>
            </div>
          )}

          {/* ── Divider ── */}
          <div className="border-t border-white/[0.06]" />

          {/* ── Submit ── */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full h-13 py-3.5 rounded-xl bg-rose-500 hover:bg-rose-600 text-white font-black text-sm uppercase tracking-[0.12em] transition-all hover:scale-[1.02] hover:shadow-lg hover:shadow-primary/25 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2 cursor-pointer"
          >
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Creating Event...
              </>
            ) : (
              <>
                <Sparkles className="h-4 w-4" />
                Publish Event
              </>
            )}
          </button>

          <p className="text-center text-[11px] text-white/20 pb-4">
            Your event will be visible to users immediately after publishing.
          </p>
        </form>
      </div>
    </div>
  );
};

export default AddEvents;