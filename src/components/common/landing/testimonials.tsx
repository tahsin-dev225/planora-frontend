
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Event Organizer",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&h=150&auto=format&fit=crop",
    text: "This platform made organizing our yearly conference effortless! The intuitive design and seamless registration process saved us weeks of work.",
    rating: 5,
  },
  {
    name: "Michael Chen",
    role: "Corporate Planner",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&h=150&auto=format&fit=crop",
    text: "The best event management tool I've used. The notification system and analytics are top-notch. Highly recommended for any professional.",
    rating: 5,
  },
  {
    name: "Emily Rodriguez",
    role: "Volunteer Coordinator",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=150&h=150&auto=format&fit=crop",
    text: "Loved the UI and the simplicity. Our volunteers found it super easy to sign up and stay updated. Truly a game-changer for non-profits.",
    rating: 4,
  },
];

const Testimonials = () => {
  return (
    <section className="py-20 relative overflow-hidden bg-background">
      {/* Background Glows */}
      <div className="absolute top-0 -left-20 w-72 h-72 bg-rose-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 -right-20 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl" />

      <div className="max-w-7xl xl:max-w-[1200px] mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-rose-500 mb-3">Testimonials</p>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight">
            Trusted by <span className="text-teal-500">thousands</span>
          </h2>
          <p className="mt-4 text-white/40 text-sm max-w-2xl mx-auto">
            Join the group of successful organizers and happy attendees who have transformed their event experience with our platform.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="group relative p-8 rounded-3xl bg-white/[0.03] backdrop-blur-xl border border-white/10 hover:border-rose-500/50 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-rose-500/10"
            >
              <div className="flex gap-1 mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    className={`${
                      i < testimonial.rating ? "text-rose-500 fill-rose-500" : "text-white/20"
                    }`}
                  />
                ))}
              </div>

              <p className="text-white/70 text-lg leading-relaxed mb-8 italic">
                "{testimonial.text}"
              </p>

              <div className="flex items-center gap-4">
                <Avatar className="h-12 w-12 border-2 border-white/10 ring-2 ring-rose-500/20">
                  <AvatarImage src={testimonial.image} alt={testimonial.name} />
                  <AvatarFallback className="bg-rose-500/10 text-rose-500">
                    {testimonial.name[0]}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h4 className="font-bold text-white group-hover:text-rose-500 transition-colors">
                    {testimonial.name}
                  </h4>
                  <p className="text-xs text-white/40 uppercase tracking-wider">
                    {testimonial.role}
                  </p>
                </div>
              </div>

              {/* Decorative Gradient Line */}
              <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-rose-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-b-3xl" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
