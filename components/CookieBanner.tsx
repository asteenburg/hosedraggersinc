"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

const CookieBanner = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if the user has already accepted/declined
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) {
      // Small delay for a smoother entrance
      const timer = setTimeout(() => setIsVisible(true), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleConsent = (choice: "accepted" | "declined") => {
    localStorage.setItem("cookie-consent", choice);
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className='fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6 animate-in fade-in slide-in-from-bottom-10 duration-700'>
      <div className='max-w-4xl mx-auto bg-white/95 backdrop-blur-md border border-gray-100 shadow-[0_-10px_40px_rgba(0,0,0,0.08)] rounded-2xl p-5 md:p-6 flex flex-col md:flex-row items-center justify-between gap-4'>
        <div className='text-center md:text-left flex-1'>
          <h3 className='text-sm font-bold text-gray-900 mb-1'>
            Cookie Policy
          </h3>
          <p className='text-xs md:text-sm text-gray-500 leading-relaxed'>
            We use cookies to enhance your experience and analyze our traffic.
            By clicking "Accept All", you consent to our use of cookies.{" "}
            <Link
              href='/privacy'
              className='text-red-600 hover:underline font-medium'
            >
              Read more
            </Link>
          </p>
        </div>

        <div className='flex items-center gap-3 w-full md:w-auto'>
          <button
            onClick={() => handleConsent("declined")}
            className='flex-1 md:flex-none px-5 py-2.5 text-xs font-semibold text-gray-600 hover:text-gray-900 transition-colors'
          >
            Decline
          </button>
          <button
            onClick={() => handleConsent("accepted")}
            className='flex-1 md:flex-none px-6 py-2.5 bg-gray-900 hover:bg-gray-800 text-white text-xs font-bold rounded-xl transition-all shadow-md active:scale-95'
          >
            Accept All
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookieBanner;
