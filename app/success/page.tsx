"use client";

import { useEffect } from "react";
import Link from "next/link";
import { CheckCircle2, Package, ArrowRight, Instagram } from "lucide-react";

export default function SuccessPage() {
  // Optional: Clear any remaining local storage if the cart didn't clear
  useEffect(() => {
    // window.localStorage.removeItem('cart');
    console.log("Order Successful - Hose Draggers Inc.");
  }, []);

  return (
    <div className='min-h-screen bg-white flex flex-col items-center justify-center p-6 text-center'>
      {/* SUCCESS ICON */}
      <div className='mb-8 relative'>
        <div className='absolute inset-0 bg-orange-500 blur-2xl opacity-20 animate-pulse' />
        <CheckCircle2
          size={100}
          className='text-orange-600 relative z-10'
          strokeWidth={1.5}
        />
      </div>

      {/* BRANDING & MESSAGE */}
      <h1 className='text-5xl md:text-7xl font-black uppercase italic tracking-tighter mb-2'>
        ORDER SECURED
      </h1>
      <p className='text-gray-500 font-bold uppercase tracking-[0.3em] text-sm mb-12'>
        Your gear is being prepped for dispatch
      </p>

      {/* INFO CARD */}
      <div className='w-full max-w-md bg-gray-50 border border-gray-100 rounded-3xl p-8 mb-8'>
        <div className='flex items-center gap-4 mb-6 text-left'>
          <div className='bg-orange-100 p-3 rounded-2xl text-orange-600'>
            <Package size={24} />
          </div>
          <div>
            <h3 className='font-black uppercase text-sm'>Tracking Info</h3>
            <p className='text-xs text-gray-500 font-medium'>
              Sent to your email shortly
            </p>
          </div>
        </div>

        <div className='space-y-4'>
          <Link
            href='/'
            className='group flex items-center justify-between w-full bg-black text-white p-5 rounded-2xl font-black uppercase tracking-widest hover:bg-orange-600 transition-all shadow-xl'
          >
            Return to Shop
            <ArrowRight
              size={20}
              className='group-hover:translate-x-1 transition-transform'
            />
          </Link>

          <a
            href='https://instagram.com/hosedraggersinc'
            target='_blank'
            className='flex items-center justify-center gap-2 w-full p-5 rounded-2xl font-black uppercase tracking-widest text-gray-400 hover:text-black transition-colors'
          >
            <Instagram size={18} />
            Follow the Build
          </a>
        </div>
      </div>

      {/* FOOTER DECAL */}
      <div className='opacity-10 pointer-events-none select-none'>
        <h2 className='text-9xl font-black italic tracking-tighter'>
          HOSE DRAGGERS
        </h2>
      </div>
    </div>
  );
}
