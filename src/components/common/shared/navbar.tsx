"use client";

import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { Menu, User, X, LogOut, ShieldCheck, Mail, AlertCircle } from 'lucide-react';
import Image from 'next/image';
import { useGetCurrentUserQuery, useLogoutMutation } from '@/redux/features/userSlice/userSlice';
import { removeAuthCookies } from '@/actions/auth';
import { useRouter } from 'next/navigation';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";


const Navbar = () => {
  const {data : user} = useGetCurrentUserQuery();
  const [isOpen, setIsOpen] = useState(false);


  
  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Events', href: '/events' },
    { name: 'About', href: '/about' },
  ];


  return (
    <nav className="absolute top-0 z-50 w-full bg-transparent">
      <div className="max-w-7xl xl:max-w-[1500px] 2xl:max-w-[1700px] 3xl:max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo */}
          <div className="flex-shrink-0  rounded-lg flex items-center">
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

              {
                user?.data && (
                  <Link
                    href="/dashboard"
                    className="text-gray-300 hover:text-white px-2 py-2 rounded-md text-sm font-medium transition-colors"
                  >
                    Dashboard
                  </Link>
                )
              }
            </div>
          </div>
          
          {/* Contact Button */}
          <div className="hidden md:flex items-center">
            {user?.data ? (
              <ProfileDrawer user={user.data} />
            ) : (
              <Link
                href="/login"
                className="bg-red-600 text-white hover:bg-red-700 px-6 py-2 rounded-md text-sm font-medium transition-all shadow-lg hover:shadow-red-600/20"
              >
                Login
              </Link>
            )}
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
          {
            user?.data && (
              <Link
                href="/dashboard"
                className="text-gray-300 hover:text-white hover:bg-white/5 block px-3 py-3 rounded-md text-base font-medium transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Dashboard
              </Link>
            )
          }
          <div className="pt-4 flex flex-col space-y-3 px-3">
            {user?.data ? (
              <div className="flex justify-center py-2">
                <ProfileDrawer user={user.data} />
              </div>
            ) : (
              <Link
                href="/login"
                className="w-full text-center bg-red-600 text-white hover:bg-red-700 px-4 py-3 rounded-md font-medium transition-colors shadow-sm"
                onClick={() => setIsOpen(false)}
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

const ProfileDrawer = ({ user }: { user: any }) => {

  const [logout, { isSuccess, isLoading }] = useLogoutMutation();
  const router = useRouter();

  useEffect(() => {
    if (isSuccess) {
      const cleanup = async () => {
        router.push("/login");
        window.location.reload();
      };
      cleanup();
    }
  }, [isSuccess, router]);

  const handleLogout = () => {
    if (!isLoading) logout();
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <button className="rounded-full border border-white/15 shadow-lg shadow-sky-900/10 size-10 flex justify-center items-center hover:bg-white/10 transition-colors cursor-pointer text-white">
          <User className="w-5 h-5" />
        </button>
      </SheetTrigger>
      <SheetContent side="right" className="bg-[#121212] border-none text-white w-full sm:max-w-md p-0 shadow-2xl">
        <div className="flex flex-col h-full h-[100dvh]">
          {/* Header */}
          <SheetHeader className="p-6 border-b border-white/10 text-left">
            <SheetTitle className="text-2xl font-bold flex items-center gap-2 text-white">
              My Profile
            </SheetTitle>
            <SheetDescription className="text-gray-400">
              Manage your personal information and preferences.
            </SheetDescription>
          </SheetHeader>

          {/* Body */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6 mt-4">
            
            {/* Main Info */}
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-red-500 to-rose-600 flex items-center justify-center text-2xl font-bold uppercase shadow-lg shadow-red-500/20">
                {user?.name?.charAt(0) || "U"}
              </div>
              <div>
                <h3 className="text-xl font-bold text-white tracking-wide">{user?.name}</h3>
                <div className="flex items-center gap-2 text-sm text-gray-400 mt-1">
                  <Mail className="w-4 h-4" />
                  {user?.email}
                  {user?.emailVerified ? (
                    <span title="Verified email" className="flex items-center">
                      <ShieldCheck className="w-4 h-4 text-emerald-400 ml-1" />
                    </span>
                  ) : (
                    <span title="Unverified email" className="flex items-center">
                      <AlertCircle className="w-4 h-4 text-amber-500 ml-1" />
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Badges/Tags */}
            <div className="flex gap-2 pb-6 border-b border-white/5">
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white/10 text-gray-200 uppercase tracking-wider">
                Role: {user?.role}
              </span>
              <span className={`px-3 py-1 rounded-full text-xs font-semibold tracking-wider ${user?.status === 'ACTIVE' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'}`}>
                {user?.status}
              </span>
            </div>

            {/* Stats Overview */}
            <div>
              <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4">Account Stats</h4>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-white/5 rounded-xl p-4 border border-white/5 hover:bg-white/10 transition-colors">
                  <p className="text-2xl font-bold text-white mb-1">{user?.events?.length || 0}</p>
                  <p className="text-xs text-gray-400 font-medium">Events Organized</p>
                </div>
                <div className="bg-white/5 rounded-xl p-4 border border-white/5 hover:bg-white/10 transition-colors">
                  <p className="text-2xl font-bold text-teal-400 mb-1">{user?.participants?.length || 0}</p>
                  <p className="text-xs text-gray-400 font-medium">Events Attended</p>
                </div>
              </div>
            </div>

            {/* Additional info */}
            <div className="pt-2">
              <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4">Account Details</h4>
              <div className="space-y-4">
                <div className="flex justify-between items-center text-sm border border-white/5 p-3 rounded-lg bg-white/5">
                  <span className="text-gray-400">Member Since</span>
                  <span className="text-gray-200 font-medium">
                    {new Date(user?.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
                  </span>
                </div>
                <div className="flex justify-between items-center text-sm border border-white/5 p-3 rounded-lg bg-white/5">
                  <span className="text-gray-400">User ID</span>
                  <span className="text-gray-300 font-mono text-xs truncate max-w-[120px]" title={user?.id}>
                    {user?.id}
                  </span>
                </div>
              </div>
            </div>

          </div>

          {/* Footer inside drawer to stay at bottom */}
          <div className="p-6 border-t border-white/10 bg-[#161616]">
            <SheetClose asChild>
              <button onClick={handleLogout} className="w-full py-3 px-4 flex items-center justify-center gap-2 rounded-lg bg-red-500/10 text-red-500 hover:bg-red-500/20 transition-all font-bold border border-red-500/20 hover:scale-[1.02] cursor-pointer">
                <LogOut className="w-5 h-5" />
                Sign Out
              </button>
            </SheetClose>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}


export default Navbar;