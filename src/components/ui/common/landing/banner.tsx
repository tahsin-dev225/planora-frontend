import Link from 'next/link';
import { CalendarDays, Users, Star, ArrowRight } from 'lucide-react';

const Banner = () => {
  return (
    <div className="relative overflow-hidden bg-white">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-blue-100 opacity-50 blur-3xl mix-blend-multiply animate-blob"></div>
        <div className="absolute top-40 -left-20 w-72 h-72 rounded-full bg-purple-100 opacity-50 blur-3xl mix-blend-multiply animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-40 left-1/2 w-80 h-80 rounded-full bg-pink-100 opacity-50 blur-3xl mix-blend-multiply animate-blob animation-delay-4000"></div>
        
        {/* Abstract Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="pt-20 pb-16 md:pt-32 md:pb-24 lg:pt-40 lg:pb-32 flex flex-col items-center text-center">
          
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-sm font-medium mb-8">
            <span className="flex h-2 w-2 rounded-full bg-blue-600 animate-pulse"></span>
            The #1 Platform for Event Organizers
          </div>
          
          {/* Main Headline */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-900 mb-6 max-w-4xl">
            Create, Manage, and Scale <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Unforgettable Events</span>
          </h1>
          
          {/* Subheadline */}
          <p className="mt-4 text-lg md:text-xl text-slate-600 max-w-2xl mb-10 leading-relaxed">
            Everything you need to host successful events, from ticketing and registrations to seamless attendee management. Built for modern event creators.
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <Link
              href="/signup"
              className="inline-flex items-center justify-center px-8 py-4 text-base font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-full shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200"
            >
              Start for free
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
            <Link
              href="/events"
              className="inline-flex items-center justify-center px-8 py-4 text-base font-semibold text-slate-700 bg-white border border-slate-200 hover:border-slate-300 hover:bg-slate-50 rounded-full transition-all duration-200"
            >
              Explore events
            </Link>
          </div>

          {/* Social Proof Stats */}
          <div className="mt-16 sm:mt-24 grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-12 md:gap-16 pt-8 border-t border-slate-200/60 w-full max-w-4xl">
            <div className="flex flex-col items-center justify-center space-y-2">
              <div className="p-3 bg-blue-50 rounded-2xl text-blue-600 mb-2">
                <CalendarDays className="w-6 h-6" />
              </div>
              <h3 className="text-3xl font-bold tracking-tight text-slate-900">10k+</h3>
              <p className="text-sm font-medium text-slate-500 uppercase tracking-wide">Events Hosted</p>
            </div>
            
            <div className="flex flex-col items-center justify-center space-y-2">
              <div className="p-3 bg-purple-50 rounded-2xl text-purple-600 mb-2">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="text-3xl font-bold tracking-tight text-slate-900">2M+</h3>
              <p className="text-sm font-medium text-slate-500 uppercase tracking-wide">Tickets Sold</p>
            </div>
            
            <div className="flex flex-col items-center justify-center space-y-2">
              <div className="p-3 bg-pink-50 rounded-2xl text-pink-600 mb-2">
                <Star className="w-6 h-6" />
              </div>
              <h3 className="text-3xl font-bold tracking-tight text-slate-900">4.9/5</h3>
              <p className="text-sm font-medium text-slate-500 uppercase tracking-wide">Customer Rating</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Banner;