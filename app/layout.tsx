// app/layout.tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import LocalFont from "next/font/local";
import Footer from "@/components/footer";
import "./globals.css";
import CookieBanner from "@/components/CookieBanner";
import ClientLayout from "../components/clientLayout"; // This will handle Navbar + CartDrawer

// Font Definitions
const myCustomFont = LocalFont({
  src: "./fonts/Billy_Ohio.ttf",
  variable: "--font-my-custom-font",
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Hose Draggers Inc.",
  description: "High quality stickers for firefighters by firefighters.",
  icons: {
    icon: "/favicon.ico", // Points to public/favicon.ico or app/favicon.ico
    apple: "/apple-icon.png", // If you have one
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <title>Hose Draggers Inc | Premium Firefighter Stickers</title>
      <head>
        <link
          rel='stylesheet'
          href='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css'
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${myCustomFont.variable} antialiased`}
      >
        {/* Wrap dynamic client features inside ClientLayout */}
        <ClientLayout>{children}</ClientLayout>
        <CookieBanner />
        <Footer />
      </body>
    </html>
  );
}
