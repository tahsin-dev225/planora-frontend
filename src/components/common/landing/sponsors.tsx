"use client";

const sponsors = [
  {
    tier: "Platinum",
    partners: [
      { name: "Grameenphone", abbr: "GP", color: "from-sky-400 to-sky-600" },
      { name: "bKash", abbr: "bK", color: "from-pink-500 to-rose-600" },
      { name: "BRAC Bank", abbr: "BB", color: "from-red-500 to-red-700" },
      { name: "Robi", abbr: "RB", color: "from-red-400 to-orange-500" },
    ],
  },
  {
    tier: "Gold",
    partners: [
      { name: "Nagad", abbr: "NG", color: "from-orange-400 to-yellow-500" },
      { name: "Dutch Bangla", abbr: "DB", color: "from-green-500 to-emerald-600" },
      { name: "Pathao", abbr: "PT", color: "from-violet-500 to-purple-700" },
      { name: "Shajgoj", abbr: "SJ", color: "from-teal-400 to-cyan-600" },
      { name: "Chaldal", abbr: "CD", color: "from-lime-500 to-green-600" },
      { name: "10 Minute School", abbr: "10M", color: "from-amber-400 to-orange-500" },
    ],
  },
];

// Infinite-scroll marquee row
const MarqueeRow = ({
  partners,
  reverse = false,
}: {
  partners: (typeof sponsors)[0]["partners"];
  reverse?: boolean;
}) => {
  const doubled = [...partners, ...partners];
  return (
    <div className="relative overflow-hidden py-3">
      {/* Fade edges */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 z-10 bg-gradient-to-r from-slate-50 dark:from-[#0a0a0a] to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 z-10 bg-gradient-to-l from-slate-50 dark:from-[#0a0a0a] to-transparent" />

      <div
        className={`flex gap-6 w-max ${
          reverse ? "animate-marquee-reverse" : "animate-marquee"
        }`}
      >
        {doubled.map((p, i) => (
          <div
            key={i}
            className="flex items-center gap-3 px-5 py-3 rounded-2xl bg-white dark:bg-white/[0.04] border border-gray-200 dark:border-white/10 shadow-sm hover:shadow-md hover:border-primary/30 dark:hover:border-primary/30 transition-all duration-300 group flex-shrink-0"
          >
            <div
              className={`w-9 h-9 rounded-xl bg-gradient-to-br ${p.color} flex items-center justify-center text-white text-xs font-black shadow-sm`}
            >
              {p.abbr}
            </div>
            <span className="text-sm font-semibold text-gray-800 dark:text-white/80 group-hover:text-primary transition-colors whitespace-nowrap">
              {p.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default function Sponsors() {
  return (
    <section className="py-20 relative overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute left-1/4 top-1/2 -translate-y-1/2 w-96 h-48 bg-primary/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute right-1/4 top-1/2 -translate-y-1/2 w-96 h-48 bg-secondary/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl xl:max-w-[1200px] mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-14">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-secondary mb-3">
            Trusted By
          </p>
          <h2 className="text-4xl sm:text-5xl font-black text-gray-900 dark:text-white tracking-tight">
            Our Sponsors &{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
              Partners
            </span>
          </h2>
          <p className="mt-4 text-gray-500 dark:text-white/40 text-sm max-w-md mx-auto">
            Collaborating with Bangladesh's leading brands to power unforgettable events.
          </p>
        </div>

        {/* Tier Labels + Marquee rows */}
        <div className="space-y-8">
          {sponsors.map((group, gi) => (
            <div key={gi}>
              <div className="flex items-center gap-3 mb-4 px-1">
                <span
                  className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${
                    group.tier === "Platinum"
                      ? "bg-sky-500/10 text-sky-500 border-sky-500/30"
                      : "bg-amber-500/10 text-amber-500 border-amber-500/30"
                  }`}
                >
                  {group.tier}
                </span>
                <div className="flex-1 h-px bg-gray-200 dark:bg-white/[0.06]" />
              </div>
              <MarqueeRow partners={group.partners} reverse={gi % 2 !== 0} />
            </div>
          ))}
        </div>

        
      </div>
    </section>
  );
}
