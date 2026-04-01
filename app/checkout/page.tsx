"use client";

import Image from "next/image";
import Link from "next/link";
import Script from "next/script";
import { useState } from "react";
import { useCart } from "@/app/context/CartContext";
import SquarePaymentForm from "@/components/SquarePaymentForm";

export default function CheckoutPage() {
  const { cart, clearCart, isDonating, toggleDonation } = useCart();
  const [emailOptIn, setEmailOptIn] = useState(false);
  const [email, setEmail] = useState("");
  const [isSdkLoaded, setIsSdkLoaded] = useState(false);

  // SHIPPING / CONTACT INFO
  const [shippingName, setShippingName] = useState("");
  const [shippingAddress, setShippingAddress] = useState("");
  const [shippingCity, setShippingCity] = useState("");
  const [shippingProvince, setShippingProvince] = useState("");
  const [shippingPostal, setShippingPostal] = useState("");
  const [contactPhone, setContactPhone] = useState("");

  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const donationAmount = isDonating ? 500 : 0;
  const checkoutTotal = subtotal + donationAmount;

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
        <h1 className='text-4xl font-[family-name:var(--font-my-custom-font)] text-orange-500 mb-4'>
          Your cart is empty
        </h1>
        <Link
          href='/'
          className='text-black font-bold uppercase tracking-widest hover:text-orange-600 transition-colors'
        >
          ← Back to Shop
        </Link>
      </div>
    );
  }

  return (
    <>
      {/* Square SDK */}
      <Script
        src='https://web.squarecdn.com/v1/square.js'
        strategy='afterInteractive'
        onLoad={() => setIsSdkLoaded(true)}
      />

      <div className='min-h-screen bg-gray-50 mt-18 py-12 px-6 flex flex-col items-center'>
        <h1 className='text-4xl font-black uppercase tracking-tighter mb-8 italic'>
          Checkout
        </h1>

        <div className='w-full max-w-xl flex flex-col gap-6'>
          {/* ORDER SUMMARY */}
          <div className='bg-white p-8 rounded-3xl shadow-xl border border-gray-100'>
            <h2 className='text-xl font-black uppercase tracking-tight mb-6'>
              Order Summary
            </h2>
            <ul className='space-y-4 mb-6'>
              {cart.map((item) => (
                <li
                  key={item.id}
                  className='flex items-center justify-between'
                >
                  <div className='flex items-center gap-4'>
                    <div className='bg-gray-50 p-2 rounded-lg'>
                      <Image
                        src={item.image}
                        alt={item.name}
                        width={50}
                        height={50}
                        className='rounded object-contain'
                      />
                    </div>
                    <div>
                      <p className='text-sm font-bold uppercase'>{item.name}</p>
                      <p className='text-xs text-gray-500 font-medium'>
                        Qty: {item.quantity}
                      </p>
                    </div>
                  </div>
                  <span className='text-sm font-bold'>
                    ${((item.price * item.quantity) / 100).toFixed(2)}
                  </span>
                </li>
              ))}
            </ul>

            {/* DONATION */}
            <div
              className={`p-4 rounded-2xl border transition-all duration-300 mb-6 ${
                isDonating
                  ? "bg-orange-600 border-orange-600 shadow-md shadow-orange-600/20"
                  : "bg-orange-50 border-orange-100"
              }`}
            >
              <label className='flex items-center cursor-pointer select-none'>
                <div className='relative flex items-center'>
                  <input
                    type='checkbox'
                    checked={isDonating}
                    onChange={toggleDonation}
                    className='peer h-5 w-5 cursor-pointer appearance-none rounded border border-orange-300 checked:bg-white checked:border-white transition-all'
                  />
                  <svg
                    className='absolute h-3.5 w-3.5 ml-0.75 text-orange-600 opacity-0 peer-checked:opacity-100 pointer-events-none transition-opacity'
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 24 24'
                    fill='none'
                    stroke='currentColor'
                    strokeWidth='4'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  >
                    <polyline points='20 6 9 17 4 12'></polyline>
                  </svg>
                </div>
                <div className='ml-3'>
                  <p
                    className={`text-sm font-black uppercase tracking-tight leading-none ${
                      isDonating ? "text-white" : "text-gray-900"
                    }`}
                  >
                    Add $5.00 Donation
                  </p>
                  <p
                    className={`text-[10px] font-bold uppercase mt-1 ${
                      isDonating ? "text-orange-100" : "text-orange-700"
                    }`}
                  >
                    Help support our cause
                  </p>
                </div>
              </label>
            </div>

            {/* EMAIL OPT-IN */}
            <div className='p-4 rounded-2xl border bg-gray-50 border-gray-200 mb-6'>
              <label className='flex flex-col gap-2 text-sm font-bold'>
                <span>Join our mailing list?</span>
                <div className='flex gap-2 items-center'>
                  <input
                    type='checkbox'
                    checked={emailOptIn}
                    onChange={(e) => setEmailOptIn(e.target.checked)}
                    className='h-5 w-5 cursor-pointer'
                  />
                  <input
                    type='email'
                    placeholder='Your email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className='flex-1 border border-gray-300 rounded-lg p-2 text-sm'
                    disabled={!emailOptIn}
                  />
                </div>
              </label>
            </div>

            {/* PRICING */}
            <div className='space-y-3 pt-6 border-t border-gray-100'>
              <div className='flex justify-between text-sm font-medium text-gray-500'>
                <span>Subtotal</span>
                <span>${(subtotal / 100).toFixed(2)}</span>
              </div>

              {isDonating && (
                <div className='flex justify-between text-sm font-bold text-orange-600 animate-in fade-in slide-in-from-right-4'>
                  <span>Donation Support</span>
                  <span>$5.00</span>
                </div>
              )}

              <div className='flex justify-between text-2xl font-black uppercase tracking-tighter pt-4 text-gray-900'>
                <span>Total</span>
                <span>${(checkoutTotal / 100).toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* SHIPPING INFO */}
          <div className='bg-white p-6 rounded-3xl shadow-xl border border-gray-100 mb-6'>
            <h2 className='text-xl font-black uppercase tracking-tight mb-4'>
              Shipping Information
            </h2>
            <div className='flex flex-col gap-4'>
              <input
                type='text'
                placeholder='Full Name'
                value={shippingName}
                onChange={(e) => setShippingName(e.target.value)}
                className='border p-2 rounded'
              />
              <input
                type='text'
                placeholder='Address'
                value={shippingAddress}
                onChange={(e) => setShippingAddress(e.target.value)}
                className='border p-2 rounded'
              />
              <input
                type='text'
                placeholder='City'
                value={shippingCity}
                onChange={(e) => setShippingCity(e.target.value)}
                className='border p-2 rounded'
              />
              <input
                type='text'
                placeholder='Province'
                value={shippingProvince}
                onChange={(e) => setShippingProvince(e.target.value)}
                className='border p-2 rounded'
              />
              <input
                type='text'
                placeholder='Postal Code'
                value={shippingPostal}
                onChange={(e) => setShippingPostal(e.target.value)}
                className='border p-2 rounded'
              />
              <input
                type='tel'
                placeholder='Phone Number'
                value={contactPhone}
                onChange={(e) => setContactPhone(e.target.value)}
                className='border p-2 rounded'
              />
            </div>
          </div>

          {/* PAYMENT */}
          <div className='bg-white p-8 rounded-3xl shadow-xl border border-gray-100'>
            <div className='flex items-center gap-2 mb-6'>
              <div className='h-2 w-2 bg-orange-600 rounded-full animate-pulse' />
              <h2 className='text-xl font-black uppercase tracking-tight text-gray-900'>
                Secure Payment
              </h2>
            </div>

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
              <div className='flex justify-center p-4'>
                <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-orange-600'></div>
              </div>
            )}

            <div className='mt-6 flex items-center justify-center gap-4 opacity-30 grayscale'>
              <div className='h-6 w-10 bg-gray-400 rounded-sm' />
              <div className='h-6 w-10 bg-gray-400 rounded-sm' />
              <div className='h-6 w-10 bg-gray-400 rounded-sm' />
            </div>
          </div>

          <Link
            href='/'
            className='text-center text-xs font-bold uppercase tracking-widest text-gray-400 hover:text-orange-600 transition-colors'
          >
            ← Keep Shopping
          </Link>
        </div>
      </div>
    </>
  );
}
