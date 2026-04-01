"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Script from "next/script";
import { useCart } from "@/app/context/CartContext";
import SquarePaymentForm from "@/components/SquarePaymentForm";

export default function CheckoutPage() {
  const { cart, clearCart, isDonating, toggleDonation } = useCart();
  const [emailOptIn, setEmailOptIn] = useState(false);
  const [email, setEmail] = useState("");
  const [isSdkLoaded, setIsSdkLoaded] = useState(false);

  // Calculate totals in cents for Square
  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const donationAmount = isDonating ? 500 : 0;
  const checkoutTotal = subtotal + donationAmount;

  async function handlePaymentSuccess() {
    if (emailOptIn && email) {
      try {
        await fetch("/api/subscribe", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        });
      } catch (err) {
        console.error("Newsletter subscription failed:", err);
      }
    }
    clearCart();
    // Logic for redirecting to a success page can go here
  }

  if (cart.length === 0) {
    return (
      <div className='min-h-screen flex flex-col items-center justify-center p-6 bg-white'>
        <h1 className='text-4xl font-[family-name:var(--font-my-custom-font)] text-orange-600 mb-4'>
          Your cart is empty
        </h1>
        <Link
          href='/'
          className='text-black font-bold uppercase tracking-widest hover:text-orange-600 transition-colors border-b-2 border-black'
        >
          ← Back to Shop
        </Link>
      </div>
    );
  }

  return (
    <>
      {/* Load the Square SDK only on the checkout page. 
          Using 'afterInteractive' ensures it doesn't block the initial page load.
      */}
      <Script
        src='https://web.squarecdn.com/v1/square.js'
        strategy='afterInteractive'
        onLoad={() => setIsSdkLoaded(true)}
      />

      <div className='min-h-screen bg-gray-50 mt-20 py-12 px-6 flex flex-col items-center'>
        <h1 className='text-5xl font-black uppercase tracking-tighter mb-10 italic text-gray-900'>
          Checkout
        </h1>

        <div className='w-full max-w-xl flex flex-col gap-8'>
          {/* ORDER SUMMARY SECTION */}
          <section className='bg-white p-8 rounded-3xl shadow-xl border border-gray-100'>
            <h2 className='text-xl font-black uppercase tracking-tight mb-6 border-b pb-4'>
              Order Summary
            </h2>

            <ul className='space-y-4 mb-8'>
              {cart.map((item) => (
                <li
                  key={item.id}
                  className='flex items-center justify-between'
                >
                  <div className='flex items-center gap-4'>
                    <div className='bg-gray-100 p-2 rounded-xl'>
                      <Image
                        src={item.image}
                        alt={item.name}
                        width={60}
                        height={60}
                        className='rounded object-contain'
                      />
                    </div>
                    <div>
                      <p className='text-sm font-black uppercase'>
                        {item.name}
                      </p>
                      <p className='text-xs text-gray-500 font-bold'>
                        QTY: {item.quantity}
                      </p>
                    </div>
                  </div>
                  <span className='text-sm font-black'>
                    ${((item.price * item.quantity) / 100).toFixed(2)}
                  </span>
                </li>
              ))}
            </ul>

            {/* DONATION TOGGLE */}
            <div
              className={`p-5 rounded-2xl border transition-all duration-300 mb-6 cursor-pointer ${
                isDonating
                  ? "bg-orange-600 border-orange-600 shadow-lg shadow-orange-600/30"
                  : "bg-orange-50 border-orange-100 hover:border-orange-300"
              }`}
              onClick={toggleDonation}
            >
              <div className='flex items-center justify-between'>
                <div className='flex items-center gap-3'>
                  <div
                    className={`h-6 w-6 rounded border flex items-center justify-center transition-colors ${isDonating ? "bg-white border-white" : "bg-white border-orange-200"}`}
                  >
                    {isDonating && (
                      <i className='fa-solid fa-check text-orange-600 text-xs'></i>
                    )}
                  </div>
                  <div>
                    <p
                      className={`text-sm font-black uppercase ${isDonating ? "text-white" : "text-gray-900"}`}
                    >
                      Add $5.00 Donation
                    </p>
                    <p
                      className={`text-[10px] font-bold uppercase ${isDonating ? "text-orange-100" : "text-orange-700"}`}
                    >
                      Support Firefighter Initiatives
                    </p>
                  </div>
                </div>
                <span
                  className={`text-sm font-black ${isDonating ? "text-white" : "text-orange-600"}`}
                >
                  +$5.00
                </span>
              </div>
            </div>

            {/* EMAIL OPT-IN SECTION */}
            <div className='p-5 rounded-2xl border bg-gray-50 border-gray-200 mb-8'>
              <label className='flex flex-col gap-3'>
                <div className='flex items-center gap-2'>
                  <input
                    type='checkbox'
                    checked={emailOptIn}
                    onChange={(e) => setEmailOptIn(e.target.checked)}
                    className='h-5 w-5 cursor-pointer accent-orange-600'
                  />
                  <span className='text-sm font-black uppercase text-gray-700'>
                    Join the Mailing List
                  </span>
                </div>

                <input
                  type='email'
                  placeholder='Enter your email for updates'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`w-full border rounded-xl p-3 text-sm font-medium transition-all ${
                    emailOptIn
                      ? "bg-white border-gray-300 focus:ring-2 focus:ring-orange-500 outline-none"
                      : "bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed"
                  }`}
                  disabled={!emailOptIn}
                />
              </label>
            </div>

            {/* TOTALS DISPLAY */}
            <div className='space-y-3 pt-6 border-t-2 border-dashed border-gray-100'>
              <div className='flex justify-between text-sm font-bold text-gray-500 uppercase tracking-widest'>
                <span>Subtotal</span>
                <span>${(subtotal / 100).toFixed(2)}</span>
              </div>

              {isDonating && (
                <div className='flex justify-between text-sm font-black text-orange-600 uppercase animate-pulse'>
                  <span>Donation</span>
                  <span>$5.00</span>
                </div>
              )}

              <div className='flex justify-between text-3xl font-black uppercase tracking-tighter pt-4 text-gray-900'>
                <span>Total</span>
                <span>${(checkoutTotal / 100).toFixed(2)}</span>
              </div>
            </div>
          </section>

          {/* SECURE PAYMENT SECTION */}
          <section className='bg-white p-8 rounded-3xl shadow-xl border border-gray-100'>
            <div className='flex items-center gap-3 mb-8'>
              <i className='fa-solid fa-shield-halved text-orange-600 text-xl'></i>
              <h2 className='text-xl font-black uppercase tracking-tight text-gray-900'>
                Secure Payment
              </h2>
            </div>

            {/* Only load the form when the CDN script is ready */}
            {isSdkLoaded ? (
              <div className='animate-in fade-in duration-700'>
                <SquarePaymentForm
                  amount={checkoutTotal}
                  email={email}
                  emailOptIn={emailOptIn}
                  isDonating={isDonating}
                  onPaymentSuccess={handlePaymentSuccess}
                />
              </div>
            ) : (
              <div className='flex flex-col items-center justify-center py-10 gap-4'>
                <div className='animate-spin rounded-full h-10 w-10 border-t-4 border-b-4 border-orange-600'></div>
                <p className='text-xs font-black uppercase text-gray-400 tracking-widest'>
                  Initializing Secure Gateway...
                </p>
              </div>
            )}

            <div className='mt-8 pt-6 border-t border-gray-50 flex items-center justify-center gap-6 opacity-40 grayscale'>
              <i className='fa-brands fa-cc-visa text-2xl'></i>
              <i className='fa-brands fa-cc-mastercard text-2xl'></i>
              <i className='fa-brands fa-cc-amex text-2xl'></i>
              <i className='fa-brands fa-cc-apple-pay text-2xl'></i>
            </div>
          </section>

          <Link
            href='/'
            className='text-center text-xs font-black uppercase tracking-[0.2em] text-gray-400 hover:text-orange-600 transition-colors mb-10'
          >
            ← Continue Shopping
          </Link>
        </div>
      </div>
    </>
  );
}
