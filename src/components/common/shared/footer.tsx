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
      { name: "Events", href: "/events" },
      { name: "Success Stories", href: "/stories" },
    ],
    resources: [
      { name: "Tickets & Pricing", href: "/about" },
      { name: "Venues", href: "/about" },
      { name: "Sponsors", href: "/about" },
      { name: "FAQs", href: "/about" },
    ],
    legal: [
      { name: "Privacy Policy", href: "/about" },
      { name: "Terms of Service", href: "/about" },
      { name: "Cookie Policy", href: "/about" },
    ]
  };

  return (
    <footer className="dark:bg-[#0a0a0a] shadow-lg dark:shadow-none text-white pt-24 pb-12 dark:border-white/5 relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-red-600/5 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary/5 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl xl:max-w-[1500px] 2xl:max-w-[1700px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-20">
          
          {/* Brand Column */}
          <div className="lg:col-span-4">
            <Link href="/" className="inline-block mb-8">
              <Image 
                src="/img/logo3.png" 
                alt="Planora Logo" 
                width={180} 
                height={60} 
                className="w-44 h-auto"
              />
            </Link>
            <p className="text-gray-400 text-lg leading-relaxed mb-8 max-w-sm">
              Your premier partner in crafting unforgettable experiences. We turn your vision into perfectly executed reality.
            </p>
          </div>

          {/* Links Columns */}
          <div className="lg:col-span-2">
            <h4 className="text-xl text-gray-600 dark:text-white font-bold mb-8 relative inline-block">
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
            <h4 className="text-xl text-gray-600 dark:text-white font-bold mb-8 relative inline-block">
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
            <h4 className="text-xl text-gray-600 dark:text-white font-bold mb-8 relative inline-block">
              Contact Us
              <span className="absolute -bottom-2 left-0 w-8 h-1 bg-red-600 rounded-full"></span>
            </h4>
           
            <div className="mt-10 space-y-4">
              <div className="flex items-center gap-4 text-gray-400 group cursor-pointer hover:text-white transition-colors">
                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-red-600/10 group-hover:border-red-600/30 transition-all text-red-500">
                  <Mail className="w-5 h-5" />
                </div>
                <span>planora@gmail.com</span>
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
        <div className="pt-6 border-t border-black/5 flex flex-col md:flex-row justify-center items-center gap-6">
          <p className="text-gray-500 text-sm">
            © {currentYear} Planora Events. All rights reserved. Crafting Memories with Passion.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
