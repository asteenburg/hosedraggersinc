"use client";

import Link from "next/link";
import LocalFont from "next/font/local";
import { CheckCircle2, Package, ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import confetti from "canvas-confetti";

const HoseFont = LocalFont({
  src: "../fonts/Billy_Ohio.ttf",
  variable: "--font-hose-draggers",
});

export default function SuccessPage() {
  useEffect(() => {
    // Trigger a celebration confetti blast on load
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

    const interval: any = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
    }, 250);

    return () => clearInterval(interval);
  }, []);

  return (
    <main className={`min-h-screen bg-black text-white flex flex-col items-center justify-center px-6 ${HoseFont.variable}`}>
      <div className="relative">
        {/* Animated Glow Effect */}
        <div className="absolute -inset-10 bg-orange-600/20 blur-3xl rounded-full animate-pulse" />
        
        <div className="relative z-10 flex flex-col items-center text-center">
          <CheckCircle2 size={80} className="text-orange-500 mb-8 animate-bounce" />
          
          <h1 className={`${HoseFont.className} text-8xl md:text-[12rem] text-white normal-case -rotate-2 leading-none`}>
            Hell Yeah!
          </h1>
          
          <p className="mt-6 text-gray-400 font-black uppercase tracking-[0.3em] text-sm md:text-base">
            Order Received & Locked In
          </p>

          <div className="mt-12 p-8 bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2.5rem] max-w-md w-full">
            <div className="flex items-center gap-4 mb-4 text-left">
              <div className="bg-orange-600/20 p-3 rounded-2xl">
                <Package className="text-orange-500" size={24} />
              </div>
              <div>
                <h3 className="font-bold uppercase tracking-tight">What's Next?</h3>
                <p className="text-xs text-gray-500 font-medium">We're prepping your high-heat decals now.</p>
              </div>
            </div>
            
            <p className="text-sm text-gray-400 text-left leading-relaxed">
              You'll get a confirmation email shortly. Once the crew ships your gear, we'll send over the tracking info.
            </p>
          </div>

          <Link href="/" className="group mt-12 flex items-center gap-3 bg-white text-black px-8 py-4 rounded-full font-black uppercase tracking-widest hover:bg-orange-600 hover:text-white transition-all hover:scale-110 active:scale-95">
            Back to the Shop
            <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
          </Link>
        </div>
      </div>
    </main>
  );
}
