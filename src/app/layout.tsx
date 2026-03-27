"use client"
// import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/common/shared/SmoothScroll";
import { Toaster } from "@/components/ui/sonner";
import { Provider } from "react-redux";
import { store } from "@/redux/app/store";
import CurrentUserLoader from "@/components/common/shared/CurrentUserLoader";

const outfit = Outfit({
  variable: "--font-sans",
  subsets: ["latin"],
});

// export const metadata: Metadata = {
//   title: "Event Management System",
//   description: "Event Management System for managing events and bookings events booking create event update event delete event",
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  return (
    <html lang="en" className="dark">
      <body
        className={`${outfit.variable} font-sans antialiased`}
      >
        <Provider store={store}>
          <SmoothScroll>
            <CurrentUserLoader>{children}</CurrentUserLoader>
            <Toaster />
          </SmoothScroll>
        </Provider>
      </body>
    </html>
  );
}
