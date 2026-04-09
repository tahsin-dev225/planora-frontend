"use client";

const stats = [
  { value: "10K+", label: "Events Created", icon: "🎉" },
  { value: "50K+", label: "Happy Attendees", icon: "😊" },
  { value: "500+", label: "Expert Organizers", icon: "🏆" },
  { value: "99%", label: "Satisfaction Rate", icon: "⭐" },
];

export default function Stats() {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/[0.03] to-transparent pointer-events-none" />
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[200px] bg-primary/5 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-7xl xl:max-w-[1200px] mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-primary mb-3">Our Impact</p>
          <h2 className="text-4xl sm:text-5xl font-black text-gray-900 dark:text-white tracking-tight">
            Numbers that speak
            <span className="text-primary"> for themselves</span>
          </h2>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <div
              key={i}
              className="group relative p-8 rounded-3xl bg-white dark:bg-white/[0.03] border border-gray-200 dark:border-white/10 hover:border-primary/40 transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl hover:shadow-primary/10 text-center overflow-hidden"
            >
              {/* Corner glow on hover */}
              <div className="absolute -top-6 -right-6 w-16 h-16 bg-primary/10 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="text-4xl mb-4">{stat.icon}</div>
              <div className="text-4xl sm:text-5xl font-black text-primary mb-2 tracking-tight">
                {stat.value}
              </div>
              <p className="text-sm font-semibold text-gray-600 dark:text-white/50 uppercase tracking-wider">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
