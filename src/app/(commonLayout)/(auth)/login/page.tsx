"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Facebook, Chrome, Linkedin, ArrowRight } from "lucide-react";
import Image from "next/image";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // Clear error when user types
    if (errors[e.target.name as keyof typeof errors]) {
      setErrors({ ...errors, [e.target.name]: "" });
    }
  };

  const validate = () => {
    let isValid = true;
    const newErrors = { email: "", password: "" };
    
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
      isValid = false;
    }
    
    if (!formData.password) {
      newErrors.password = "Password is required";
      isValid = false;
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      setLoading(true);
      try {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/login`, formData, {
          withCredentials: true,
        });

        console.log("Login successful:", response.data);
        toast.success("Login successful!");
        
        // Refresh router cache and go home
        router.push("/");
        router.refresh();
      } catch (error: any) {
        console.error("Login error:", error);
        toast.error(error?.response?.data?.message || "Login failed. Please try again.");
      } finally {
        setLoading(false);
      }
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_AUTH_URL}/api/auth/sign-in/social`,
        {
          provider: "google",
          callbackURL:  `${process.env.NEXT_PUBLIC_FRONTEND_URL}`,
          errorCallbackURL: `${process.env.NEXT_PUBLIC_FRONTEND_URL}/login`,
        },
        {
          withCredentials: true,
        }
      );
      if (response.data && response.data.url) {
        window.location.href = response.data.url;
      }
      
    } catch (error) {
      console.error("Google Auth init failed:", error);
      toast.error("Failed to start Google login");
    }
  };

  return (
    <div className="min-h-screen w-full flex bg-white dark:bg-[#121212]">
      {/* Left Panel - Image & Branding */}
      <div className="hidden lg:flex w-1/2 relative overflow-hidden flex-col justify-end p-12 text-white">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image  
            src="/img/login.jpg" 
            alt="Event Background" 
            className="w-full h-full object-cover opacity-50 grayscale-[20%]"
            width={1020}
            height={1080}
          />
          {/* Dark gradient overlay for readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-lg mb-10">
          <div className="inline-block px-3 py-1 mb-6 border border-white/20 rounded-full bg-white/10 dark:bg-white/10 backdrop-blur-md">
            <span className="text-sm font-medium tracking-wider uppercase text-teal-400">Planora Events</span>
          </div>
          <h1 className="text-5xl te font-bold mb-4 leading-tight tracking-tight">
            Keep it special
          </h1>
          <p className="text-lg text-gray-300 mb-10 leading-relaxed font-light">
            Plan, organize, and execute unforgettable events. Join thousands of creators crafting perfect memories anywhere, anytime.
          </p>
          
          {/* Social Links (Mock) */}
          
        </div>
      </div>

      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white dark:bg-[#121212]">
        <div className="w-full max-w-md">
          <div className="lg:hidden text-center mb-10">
            <h1 className="text-3xl font-bold text-black dark:text-white mb-2">Planora</h1>
            <p className="dark:text-gray-400">Join thousands of event creators</p>
          </div>

          <div className="text-center mb-10">
            <div className="hidden lg:flex justify-center mb-6 relative">
              <h1 className="text-4xl font-extrabold text-black dark:text-white tracking-widest relative">
                <span className="relative z-10">Planora</span>
                <div className="absolute -top-2 -left-3 w-4 h-4 border-t-2 border-l-2 border-teal-500"></div>
                <div className="absolute -bottom-2 -right-3 w-4 h-4 border-b-2 border-r-2 border-teal-500"></div>
              </h1>
            </div>

            <p className="text-gray-600 dark:text-gray-400">Login your account now join, create, explore event. </p>

            
          </div>

          <form onSubmit={handleSubmit} className="space-y-5" noValidate>
            
            

            {/* Email Input */}
            <div>
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full bg-gray-100 dark:bg-[#0a0a0a] text-black dark:text-white placeholder-gray-500 border rounded-md p-4 transition duration-200 outline-none focus:ring-1 ${
                  errors.email ? "border-red-500 focus:ring-red-500" : "border-gray-300 dark:border-gray-800 focus:border-teal-500 focus:ring-teal-500"
                }`}
              />
              {errors.email && <p className="text-red-500 text-sm mt-1 text-left px-1">{errors.email}</p>}
            </div>

            <div>
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className={`w-full bg-gray-100 dark:bg-[#0a0a0a] text-black dark:text-white placeholder-gray-500 border rounded-md p-4 transition duration-200 outline-none focus:ring-1 ${
                  errors.password ? "border-red-500 focus:ring-red-500" : "border-gray-300 dark:border-gray-800 focus:border-teal-500 focus:ring-teal-500"
                }`}
              />
              {errors.password && <p className="text-red-500 text-sm mt-1 text-left px-1">{errors.password}</p>}
            </div>

            <div className="pt-4">
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-primary hover:bg-primary/90 disabled:bg-primary/40 disabled:cursor-not-allowed cursor-pointer text-white font-bold py-1.5 md:py-2.5 rounded-full transition duration-300 flex justify-center items-center shadow-lg shadow-teal-900/20 group"
              >
                {loading ? "SIGNING IN..." : "SIGN IN"}
                {!loading && <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />}
              </button>

              {/* <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300 dark:border-gray-800"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white dark:bg-[#121212] text-gray-500">Or continue with</span>
                </div>
              </div> */}

              {/* <button
                type="button"
                onClick={handleGoogleLogin}
                className="w-full bg-white dark:bg-[#1a1a1a] text-gray-800 dark:text-white border border-gray-300 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800 font-bold py-2.5 rounded-full transition duration-300 flex justify-center items-center shadow-sm"
              >
                <Chrome className="w-5 h-5 mr-3 text-primary" />
                Google
              </button> */}

              <p className="text-gray-600 dark:text-gray-400 font- text-center mt-4">
                Don't have an account? <Link href="/register" className="text-teal-400 hover:text-teal-300 font-medium">Sign Up</Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}