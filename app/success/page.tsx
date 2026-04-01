"use client";

import React, { useEffect } from "react";
import confetti from "canvas-confetti";
import { CheckBadgeIcon } from "@heroicons/react/24/solid";
import Link from "next/link";

const SuccessPage = () => {
  useEffect(() => {
    // A more "refined" burst: fires once from the center, then two subtle side bursts
    const count = 200;
    const defaults = {
      origin: { y: 0.7 },
      zIndex: 1000,
    };

    function fire(particleRatio: number, opts: any) {
      confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio),
      });
    }

    fire(0.25, { spread: 26, startVelocity: 55 });
    fire(0.2, { spread: 60 });
    fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8 });
    fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 });
    fire(0.1, { spread: 120, startVelocity: 45 });
  }, []);

  return (
    <div className='min-h-screen flex items-center justify-center bg-[#0f1115] px-4'>
      {/* Main Success Card */}
      <div className='max-w-lg w-full bg-[#1a1d23] rounded-3xl shadow-2xl p-10 text-center border border-white/5 relative overflow-hidden'>
        {/* Subtle background glow */}
        <div className='absolute -top-24 -left-24 w-48 h-48 bg-red-600/10 blur-[100px]' />

        <div className='flex justify-center mb-6'>
          <div className='bg-green-500/10 p-4 rounded-full border border-green-500/20'>
            <CheckBadgeIcon className='w-16 h-16 text-green-500' />
          </div>
        </div>

        <h1 className='text-4xl font-extrabold text-white mb-4 tracking-tight'>
          Mission Accomplished.
        </h1>
        <p className='text-gray-400 text-lg mb-10 leading-relaxed'>
          Your order has been received and is being processed. Check your inbox
          for a confirmation receipt.
        </p>

        <div className='grid grid-cols-1 gap-4'>
          <Link
            href='/shop'
            className='group relative flex items-center justify-center w-full py-4 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl transition-all duration-200 shadow-[0_0_20px_rgba(220,38,38,0.2)]'
          >
            Return to Shop
          </Link>

          <Link
            href='/'
            className='w-full py-4 bg-transparent border border-white/10 text-gray-300 font-semibold rounded-xl hover:bg-white/5 hover:text-white transition-all duration-200'
          >
            Return to Quarters
          </Link>
        </div>

        <p className='mt-8 text-sm text-gray-500'>
          Order #HD-{Math.floor(Math.random() * 10000)}
        </p>
      </div>
    </div>
  );
};

export default SuccessPage;
