"use client";

import Link from "next/link";
import Image from "next/image";
import { 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin, 
  Mail, 
  Phone, 
  MapPin, 
  ArrowRight,
  Send
} from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    company: [
      { name: "About Us", href: "/about" },
      { name: "Our Services", href: "/services" },
      { name: "Event Gallery", href: "/gallery" },
      { name: "Success Stories", href: "/stories" },
    ],
    resources: [
      { name: "Tickets & Pricing", href: "/tickets" },
      { name: "Venue Selections", href: "/venue" },
      { name: "Sponsor Packages", href: "/sponsors" },
      { name: "FAQs", href: "/faq" },
    ],
    legal: [
      { name: "Privacy Policy", href: "/privacy" },
      { name: "Terms of Service", href: "/terms" },
      { name: "Cookie Policy", href: "/cookies" },
    ]
  };

  return (
    <footer className="bg-[#0a0a0a] text-white pt-24 pb-12 border-t border-white/5 relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-red-600/5 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-rose-600/5 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl xl:max-w-[1500px] 2xl:max-w-[1700px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-20">
          
          {/* Brand Column */}
          <div className="lg:col-span-4">
            <Link href="/" className="inline-block mb-8">
              <Image 
                src="/img/logo2.png" 
                alt="Planora Logo" 
                width={180} 
                height={60} 
                className="w-44 h-auto"
              />
            </Link>
            <p className="text-gray-400 text-lg leading-relaxed mb-8 max-w-sm">
              Your premier partner in crafting unforgettable experiences. We turn your vision into perfectly executed reality.
            </p>
            <div className="flex items-center gap-4">
              {[Facebook, Twitter, Instagram, Linkedin].map((Icon, index) => (
                <a 
                  key={index} 
                  href="#" 
                  className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-red-600 hover:border-red-600 transition-all duration-300 group"
                >
                  <Icon className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
                </a>
              ))}
            </div>
          </div>

          {/* Links Columns */}
          <div className="lg:col-span-2">
            <h4 className="text-xl font-bold mb-8 relative inline-block">
              Company
              <span className="absolute -bottom-2 left-0 w-8 h-1 bg-red-600 rounded-full"></span>
            </h4>
            <ul className="space-y-4">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-gray-400 hover:text-white hover:translate-x-1 inline-block transition-all">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h4 className="text-xl font-bold mb-8 relative inline-block">
              Resources
              <span className="absolute -bottom-2 left-0 w-8 h-1 bg-red-600 rounded-full"></span>
            </h4>
            <ul className="space-y-4">
              {footerLinks.resources.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-gray-400 hover:text-white hover:translate-x-1 inline-block transition-all">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter Column */}
          <div className="lg:col-span-4">
            <h4 className="text-xl font-bold mb-8 relative inline-block">
              Newsletter
              <span className="absolute -bottom-2 left-0 w-8 h-1 bg-red-600 rounded-full"></span>
            </h4>
            <p className="text-gray-400 mb-6">Subscribe to get the latest updates and special offers.</p>
            <form className="relative group">
              <input 
                type="email" 
                placeholder="Your email address" 
                className="w-full bg-white/5 border border-white/10 rounded-full py-4 pl-6 pr-14 text-white placeholder-gray-500 focus:outline-none focus:border-red-600 transition-colors"
              />
              <button 
                type="submit" 
                className="absolute right-2 top-2 bottom-2 w-10 h-10 rounded-full bg-red-600 flex items-center justify-center hover:bg-red-500 transition-all shadow-lg shadow-red-600/20"
              >
                <Send className="w-4 h-4 text-white" />
              </button>
            </form>
            
            <div className="mt-10 space-y-4">
              <div className="flex items-center gap-4 text-gray-400 group cursor-pointer hover:text-white transition-colors">
                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-red-600/10 group-hover:border-red-600/30 transition-all text-red-500">
                  <Mail className="w-5 h-5" />
                </div>
                <span>hello@planora.com</span>
              </div>
              <div className="flex items-center gap-4 text-gray-400 group cursor-pointer hover:text-white transition-colors">
                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-red-600/10 group-hover:border-red-600/30 transition-all text-red-500">
                  <Phone className="w-5 h-5" />
                </div>
                <span>+1 (234) 567-890</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-gray-500 text-sm">
            © {currentYear} Planora Events. All rights reserved. Crafting Memories with Passion.
          </p>
          <div className="flex items-center gap-8">
            {footerLinks.legal.map((link) => (
              <Link key={link.name} href={link.href} className="text-gray-500 hover:text-white text-sm transition-colors">
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
