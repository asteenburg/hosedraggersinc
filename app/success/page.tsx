"use client";

import React, { useEffect } from "react";
import confetti from "canvas-confetti";
import { CheckCircleIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

const SuccessPage = () => {
  useEffect(() => {
    // Trigger confetti on mount
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    const randomInRange = (min: number, max: number) =>
      Math.random() * (max - min) + min;

    const interval: any = setInterval(function () {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);

      // Since particles fall down, start a bit higher than random
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
      });
    }, 250);
  }, []);

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-50 px-4'>
      <div className='max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center border border-gray-100'>
        <div className='flex justify-center mb-6'>
          <div className='bg-green-100 p-3 rounded-full'>
            <CheckCircleIcon className='w-16 h-16 text-green-600' />
          </div>
        </div>

        <h1 className='text-3xl font-bold text-gray-900 mb-2'>
          Order Confirmed!
        </h1>
        <p className='text-gray-600 mb-8'>
          Your gear is being prepped. We've sent a receipt to your email
          address.
        </p>

        <div className='space-y-4'>
          <Link
            href='/shop'
            className='block w-full py-3 px-4 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition duration-200 shadow-md'
          >
            Continue Shopping
          </Link>
          <Link
            href='/'
            className='block w-full py-3 px-4 bg-white border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition duration-200'
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SuccessPage;
