import type { Metadata } from "next";
import Script from "next/script";
import { Geist, Geist_Mono } from "next/font/google";
import Footer from "@/components/footer";
import { CartProvider } from "./context/CartContext";
import LocalFont from "next/font/local";
import "./globals.css";
import ClientLayout from "../components/clientLayout";

const myCustomFont = LocalFont({
  src: "../public/fonts/billy ohio.ttf",
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <head>
        <link
          rel='stylesheet'
          href='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css'
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Script
          src='https://sandbox.web.squarecdn.com/v1/square.js'
          strategy='afterInteractive'
        />

        <CartProvider>
          <ClientLayout>{children}</ClientLayout>
        </CartProvider>

        <Footer />
      </body>
    </html>
  );
}
