"use client"
// import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/common/shared/SmoothScroll";
import { Toaster } from "@/components/ui/sonner";
import { Provider } from "react-redux";
import { store } from "@/redux/app/store";
import CurrentUserLoader from "@/components/common/shared/CurrentUserLoader";
import { ThemeProvider } from "@/components/theme-provider";
import ChatBox from "@/components/common/shared/chatbox";

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
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${outfit.variable} font-sans antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <Provider store={store}>
            <SmoothScroll>
              <CurrentUserLoader>
                {children}
              </CurrentUserLoader>
            <Toaster position="top-right" richColors/>
            <ChatBox />
          </SmoothScroll>
        </Provider>
        </ThemeProvider>
      </body>
    </html>
  );
}
