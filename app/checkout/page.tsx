"use client";

import Image from "next/image";
import Link from "next/link";
import Script from "next/script";
import { useState } from "react";
import {
  EnvelopeIcon,
  TruckIcon,
  EnvelopeOpenIcon,
  BoltIcon,
  ShieldCheckIcon,
  MapPinIcon,
  ChevronLeftIcon,
  HeartIcon,
  PhoneIcon,
} from "@heroicons/react/24/outline";
import { useCart } from "@/app/context/CartContext";
import SquarePaymentForm from "@/components/SquarePaymentForm";

// --- Types ---
interface ShippingOption {
  id: string;
  name: string;
  price: number; // in cents to match your subtotal logic
  desc: string;
  icon: React.ReactNode;
}

export default function CheckoutPage() {
  const { cart, clearCart, isDonating, toggleDonation } = useCart();
  const [isSdkLoaded, setIsSdkLoaded] = useState(false);

  // State Management
  const [emailOptIn, setEmailOptIn] = useState(false);
  const [email, setEmail] = useState("");
  const [shippingMethod, setShippingMethod] = useState("lettermail");

  // Shipping / Contact Info
  const [shippingName, setShippingName] = useState("");
  const [shippingAddress, setShippingAddress] = useState("");
  const [shippingCity, setShippingCity] = useState("");
  const [shippingProvince, setShippingProvince] = useState("ON");
  const [shippingPostal, setShippingPostal] = useState("");
  const [contactPhone, setContactPhone] = useState("");

  // --- Calculations ---
  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  const shippingOptions: ShippingOption[] = [
    {
      id: "lettermail",
      name: "Standard Letter Mail",
      price: 250,
      desc: "5-10 business days • Untracked",
      icon: <EnvelopeOpenIcon className='w-5 h-5' />,
    },
    {
      id: "standard",
      name: "Ontario Standard",
      price: 1500,
      desc: "3-7 business days • Tracked",
      icon: <TruckIcon className='w-5 h-5' />,
    },
    {
      id: "xpresspost",
      name: "Canada Post Xpresspost",
      price: 2200,
      desc: "1-2 business days • Priority",
      icon: <BoltIcon className='w-5 h-5' />,
    },
  ];

  const selectedShipping =
    shippingOptions.find((opt) => opt.id === shippingMethod) ||
    shippingOptions[0];
  const shippingCost = selectedShipping.price;
  const donationAmount = isDonating ? 500 : 0;

  // Ontario HST (13%) calculated on products + shipping
  const taxRate = 0.13;
  const hst = Math.round((subtotal + shippingCost) * taxRate);

  const checkoutTotal = subtotal + shippingCost + hst + donationAmount;

  async function handlePaymentSuccess() {
    if (emailOptIn && email) {
      await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
    }
    clearCart();
  }

  if (cart.length === 0) {
    return (
      <div className='min-h-screen flex flex-col items-center justify-center p-6 bg-white'>
        <h1 className='text-4xl font-black text-orange-600 mb-4 uppercase italic'>
          Your cart is empty
        </h1>
        <Link
          href='/'
          className='text-slate-900 font-bold uppercase tracking-widest hover:text-orange-600 transition-colors'
        >
          ← Back to Shop
        </Link>
      </div>
    );
  }

  return (
    <>
      <Script
        src='https://web.squarecdn.com/v1/square.js'
        strategy='afterInteractive'
        onLoad={() => setIsSdkLoaded(true)}
      />

      <div className='min-h-screen bg-[#fcfcfc] text-slate-900 pt-32 pb-24'>
        <nav className='max-w-7xl mx-auto px-6 mb-12'>
          <Link
            href='/'
            className='group inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-orange-600 transition-colors'
          >
            <ChevronLeftIcon className='w-4 h-4 transition-transform group-hover:-translate-x-1' />
            <span>Back to Shop</span>
          </Link>
        </nav>

        <main className='max-w-7xl mx-auto px-6'>
          <div className='grid grid-cols-1 lg:grid-cols-12 gap-16 items-start'>
            {/* LEFT: INFO & SHIPPING */}
            <div className='lg:col-span-7 space-y-12'>
              {/* Step 1: Contact & Opt-in */}
              <section className='space-y-6'>
                <div className='flex items-center gap-4'>
                  <span className='flex items-center justify-center w-8 h-8 rounded-full bg-slate-900 text-white text-xs font-bold'>
                    1
                  </span>
                  <h2 className='text-2xl font-bold tracking-tight uppercase italic'>
                    Contact & Updates
                  </h2>
                </div>

                <div className='space-y-4'>
                  <div className='relative group'>
                    <EnvelopeIcon className='absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400' />
                    <input
                      type='email'
                      placeholder='Email Address'
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className='w-full pl-12 pr-4 py-4 bg-white border border-slate-200 rounded-2xl focus:border-orange-600 outline-none transition-all shadow-sm'
                    />
                  </div>

                  <label className='flex items-center gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-100 cursor-pointer'>
                    <input
                      type='checkbox'
                      checked={emailOptIn}
                      onChange={(e) => setEmailOptIn(e.target.checked)}
                      className='h-5 w-5 rounded border-slate-300 text-orange-600 focus:ring-orange-600'
                    />
                    <span className='text-sm font-bold text-slate-600 uppercase tracking-tight'>
                      Keep me updated on new drops
                    </span>
                  </label>
                </div>
              </section>

              {/* Step 2: Shipping Details */}
              <section className='space-y-6'>
                <div className='flex items-center gap-4'>
                  <span className='flex items-center justify-center w-8 h-8 rounded-full bg-slate-900 text-white text-xs font-bold'>
                    2
                  </span>
                  <h2 className='text-2xl font-bold tracking-tight uppercase italic'>
                    Shipping Address
                  </h2>
                </div>

                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                  <input
                    placeholder='Full Name'
                    value={shippingName}
                    onChange={(e) => setShippingName(e.target.value)}
                    className='w-full px-5 py-4 bg-white border border-slate-200 rounded-2xl focus:border-orange-600 outline-none shadow-sm md:col-span-2'
                  />
                  <div className='md:col-span-2 relative'>
                    <MapPinIcon className='absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400' />
                    <input
                      placeholder='Street Address'
                      value={shippingAddress}
                      onChange={(e) => setShippingAddress(e.target.value)}
                      className='w-full pl-12 pr-4 py-4 bg-white border border-slate-200 rounded-2xl focus:border-orange-600 outline-none shadow-sm'
                    />
                  </div>
                  <input
                    placeholder='City'
                    value={shippingCity}
                    onChange={(e) => setShippingCity(e.target.value)}
                    className='w-full px-5 py-4 bg-white border border-slate-200 rounded-2xl shadow-sm'
                  />
                  <div className='grid grid-cols-2 gap-4'>
                    <select
                      value={shippingProvince}
                      onChange={(e) => setShippingProvince(e.target.value)}
                      className='w-full px-4 py-4 bg-white border border-slate-200 rounded-2xl appearance-none'
                    >
                      <option value='ON'>Ontario</option>
                      <option value='QC'>Quebec</option>
                      <option value='BC'>British Columbia</option>
                      {/* ... other provinces */}
                    </select>
                    <input
                      placeholder='Postal Code'
                      value={shippingPostal}
                      onChange={(e) => setShippingPostal(e.target.value)}
                      className='w-full px-5 py-4 bg-white border border-slate-200 rounded-2xl shadow-sm'
                    />
                  </div>
                  <div className='md:col-span-2 relative'>
                    <PhoneIcon className='absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400' />
                    <input
                      type='tel'
                      placeholder='Phone Number'
                      value={contactPhone}
                      onChange={(e) => setContactPhone(e.target.value)}
                      className='w-full pl-12 pr-4 py-4 bg-white border border-slate-200 rounded-2xl shadow-sm'
                    />
                  </div>
                </div>
              </section>

              {/* Step 3: Shipping Method */}
              <section className='space-y-6'>
                <div className='flex items-center gap-4'>
                  <span className='flex items-center justify-center w-8 h-8 rounded-full bg-slate-900 text-white text-xs font-bold'>
                    3
                  </span>
                  <h2 className='text-2xl font-bold tracking-tight uppercase italic'>
                    Shipping Method
                  </h2>
                </div>
                <div className='space-y-3'>
                  {shippingOptions.map((option) => (
                    <label
                      key={option.id}
                      className={`flex items-center justify-between p-6 cursor-pointer rounded-3xl border-2 transition-all ${shippingMethod === option.id ? "border-orange-600 bg-orange-50/30" : "border-slate-100 bg-white"}`}
                    >
                      <input
                        type='radio'
                        name='shipping'
                        className='sr-only'
                        checked={shippingMethod === option.id}
                        onChange={() => setShippingMethod(option.id)}
                      />
                      <div className='flex items-center gap-5'>
                        <div
                          className={`p-3 rounded-2xl ${shippingMethod === option.id ? "bg-white text-orange-600 shadow-sm" : "bg-slate-50 text-slate-400"}`}
                        >
                          {option.icon}
                        </div>
                        <div>
                          <p className='font-bold text-slate-900 leading-tight tracking-tight'>
                            {option.name}
                          </p>
                          <p className='text-sm text-slate-500 mt-0.5'>
                            {option.desc}
                          </p>
                        </div>
                      </div>
                      <p className='text-lg font-black text-slate-900'>
                        ${(option.price / 100).toFixed(2)}
                      </p>
                    </label>
                  ))}
                </div>
              </section>
            </div>

            {/* RIGHT: ORDER SUMMARY & PAYMENT */}
            <aside className='lg:col-span-5 space-y-8'>
              <div className='bg-white p-10 rounded-[2.5rem] shadow-xl border border-slate-100 sticky top-12'>
                <h3 className='text-xl font-black mb-8 uppercase tracking-tighter italic'>
                  Your Order
                </h3>

                <div className='space-y-6'>
                  {/* Item List */}
                  <div className='space-y-5 max-h-60 overflow-y-auto pr-2 custom-scrollbar'>
                    {cart.map((item) => (
                      <div
                        key={item.id}
                        className='flex justify-between items-center text-sm'
                      >
                        <div className='flex items-center gap-4'>
                          <div className='relative'>
                            <span className='absolute -top-2 -right-2 w-5 h-5 flex items-center justify-center bg-orange-600 text-white text-[10px] font-bold rounded-full border-2 border-white'>
                              {item.quantity}
                            </span>
                            <Image
                              src={item.image}
                              alt={item.name}
                              width={50}
                              height={50}
                              className='rounded-xl border border-slate-100'
                            />
                          </div>
                          <span className='font-bold text-slate-800 uppercase text-xs'>
                            {item.name}
                          </span>
                        </div>
                        <span className='font-black text-slate-900'>
                          ${((item.price * item.quantity) / 100).toFixed(2)}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Donation Toggle UI */}
                  <button
                    onClick={toggleDonation}
                    className={`w-full p-4 rounded-2xl border flex items-center justify-between transition-all ${isDonating ? "bg-orange-600 border-orange-600 text-white" : "bg-orange-50 border-orange-100 text-orange-600"}`}
                  >
                    <div className='flex items-center gap-3'>
                      <HeartIcon className='w-5 h-5' />
                      <span className='text-xs font-black uppercase tracking-widest'>
                        Add $5.00 Donation
                      </span>
                    </div>
                    {isDonating && (
                      <CheckBadgeIcon className='w-5 h-5 text-white' />
                    )}
                  </button>

                  {/* Pricing Breakdown */}
                  <div className='pt-6 border-t border-slate-100 space-y-3'>
                    <div className='flex justify-between text-slate-500 text-xs font-bold uppercase tracking-widest'>
                      <span>Subtotal</span>
                      <span className='text-slate-900'>
                        ${(subtotal / 100).toFixed(2)}
                      </span>
                    </div>
                    <div className='flex justify-between text-slate-500 text-xs font-bold uppercase tracking-widest'>
                      <span>Shipping</span>
                      <span className='text-slate-900'>
                        ${(shippingCost / 100).toFixed(2)}
                      </span>
                    </div>
                    <div className='flex justify-between text-slate-500 text-xs font-bold uppercase tracking-widest'>
                      <span>HST (13%)</span>
                      <span className='text-slate-900'>
                        ${(hst / 100).toFixed(2)}
                      </span>
                    </div>
                    <div className='flex justify-between pt-4 text-3xl font-black uppercase tracking-tighter text-slate-900 border-t border-slate-50'>
                      <span>Total</span>
                      <span>${(checkoutTotal / 100).toFixed(2)}</span>
                    </div>
                  </div>

                  {/* Square Payment Integration */}
                  <div className='pt-8'>
                    {isSdkLoaded ? (
                      <SquarePaymentForm
                        amount={checkoutTotal}
                        email={email}
                        emailOptIn={emailOptIn}
                        isDonating={isDonating}
                        shippingName={shippingName}
                        shippingAddress={shippingAddress}
                        shippingCity={shippingCity}
                        shippingProvince={shippingProvince}
                        shippingPostal={shippingPostal}
                        contactPhone={contactPhone}
                        onPaymentSuccess={handlePaymentSuccess}
                      />
                    ) : (
                      <div className='flex justify-center p-8 animate-pulse text-slate-300 font-bold uppercase text-xs tracking-widest'>
                        Loading Secure Payment...
                      </div>
                    )}
                  </div>

                  <div className='flex items-center justify-center gap-3 pt-6 border-t border-slate-50 opacity-50 grayscale'>
                    <ShieldCheckIcon className='w-4 h-4 text-emerald-500' />
                    <span className='text-[10px] font-bold uppercase tracking-widest'>
                      Secure Checkout
                    </span>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </main>
      </div>
    </>
  );
}

// Simple internal component for the checkmark in the donation button
function CheckBadgeIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 24 24'
      fill='currentColor'
    >
      <path
        fillRule='evenodd'
        d='M8.603 3.799A4.49 4.49 0 0112 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 013.498 1.307 4.491 4.491 0 011.307 3.497A4.49 4.49 0 0121.75 12a4.49 4.49 0 01-1.549 3.397 4.491 4.491 0 01-1.307 3.497 4.491 4.491 0 01-3.497 1.307A4.49 4.49 0 0112 21.75a4.49 4.49 0 01-3.397-1.549 4.491 4.491 0 01-3.498-1.306 4.491 4.491 0 01-1.307-3.498A4.49 4.49 0 012.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 011.307-3.497 4.49 4.49 0 013.497-1.307zm7.007 6.387a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z'
        clipRule='evenodd'
      />
    </svg>
  );
}
