"use client";

import Link from 'next/link';
import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import Image from 'next/image';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Event Gallery', href: '/gallery' },
    { name: 'Venue', href: '/venue' },
    { name: 'Tickets', href: '/tickets' },
    { name: 'Sponsors', href: '/sponsors' },
  ];

  return (
    <nav className="absolute top-0 z-50 w-full bg-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="text-2xl font-bold text-white tracking-widest flex items-center uppercase">
              <Image className='w-40' src="/img/logo2.png" alt="Logo" width={400} height={200} />
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
            <div className="flex items-baseline space-x-4 lg:space-x-6">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-gray-300 hover:text-white px-2 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
          
          {/* Contact Button */}
          <div className="hidden md:flex items-center">
            <Link
              href="/login"
              className="bg-red-600 text-white hover:bg-red-700 px-6 py-2 rounded-md text-sm font-medium transition-all shadow-lg hover:shadow-red-600/20"
            >
              Login
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-300 hover:text-white hover:bg-white/10 focus:outline-none transition-colors"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div 
        className={`md:hidden absolute w-full bg-background border-b border-white/10 shadow-lg transition-all duration-300 ease-in-out origin-top ${isOpen ? 'opacity-100 scale-y-100' : 'opacity-0 scale-y-0 pointer-events-none'}`}
      >
        <div className="px-4 pt-2 pb-6 space-y-2">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-gray-300 hover:text-white hover:bg-white/5 block px-3 py-3 rounded-md text-base font-medium transition-colors"
              onClick={() => setIsOpen(false)}
            >
              {link.name}
            </Link>
          ))}
          <div className="pt-4 flex flex-col space-y-3 px-3">
            <Link
              href="/login"
              className="w-full text-center bg-red-600 text-white hover:bg-red-700 px-4 py-3 rounded-md font-medium transition-colors shadow-sm"
              onClick={() => setIsOpen(false)}
            >
              Login
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;