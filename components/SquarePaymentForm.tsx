"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

interface SquarePaymentFormProps {
  amount: number;
  onPaymentSuccess: () => void;
  email?: string;
  emailOptIn?: boolean;
  isDonating?: boolean;
}

declare global {
  interface Window {
    Square: any;
  }
}

export default function SquarePaymentForm({
  amount,
  onPaymentSuccess,
  email = "",
  emailOptIn = false,
  isDonating = false,
}: SquarePaymentFormProps) {
  const cardRef = useRef<any>(null);
  const [cardReady, setCardReady] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    async function init() {
      if (!window.Square) {
        console.error("❌ Square SDK not loaded.");
        return;
      }

      const appId = process.env.NEXT_PUBLIC_SQUARE_APP_ID;
      const locationId = process.env.NEXT_PUBLIC_SQUARE_LOCATION_ID;

      try {
        const payments = window.Square.payments(appId, locationId);
        const card = await payments.card();
        await card.attach("#card-container");
        cardRef.current = card;
        setCardReady(true);
      } catch (e) {
        console.error("Square initialization failed", e);
      }
    }
    init();
  }, []);

  async function handleCheckout() {
    console.log({
      cardReady,
      hasCard: !!cardRef.current,
      isProcessing,
    });
    if (!cardReady || !cardRef.current || isProcessing) return;

    setIsProcessing(true);

    try {
      // 1. Generate the secure token
      const result = await cardRef.current.tokenize();

      if (result.status !== "OK") {
        throw new Error(result.errors[0].message);
      }

      // 2. Send to your backend
      // FIX: Ensure we use the correct path '/api/pay'
      const response = await fetch("/api/pay", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sourceId: result.token, // FIX: Changed 'token' to 'result.token'
          amount: amount,
          email: email,
          isDonating: isDonating,
        }),
      });

      // FIX: Changed 'res' to 'response' to match the constant above
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Payment failed at the server");
      }

      // 3. Success!
      console.log("✅ Payment processed successfully");
      onPaymentSuccess?.();
      window.location.href = "/success";
    } catch (error: any) {
      console.error("❌ Checkout error:", error);
      alert(error.message || "Checkout failed.");
    } finally {
      setIsProcessing(false);
    }
  }

  return (
    <div className='max-w-md mx-auto mt-4'>
      <div
        id='card-container'
        className='mb-6 min-h-[120px]'
      />

      <button
        onClick={handleCheckout}
        disabled={!cardReady || isProcessing}
        className={`w-full py-4 rounded-xl font-black uppercase tracking-widest transition-all shadow-lg ${
          isProcessing
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-orange-600 hover:bg-black text-white hover:scale-[1.02] active:scale-95"
        }`}
      >
        {isProcessing ? "Processing..." : `Pay $${(amount / 100).toFixed(2)}`}
      </button>

      <Link href='/'>
        <button className='mt-4 w-full text-gray-400 text-xs font-bold uppercase tracking-widest hover:text-orange-600 transition-colors'>
          Cancel & Exit
        </button>
      </Link>

      {!cardReady && (
        <div className='flex flex-col items-center gap-2 mt-4'>
          <div className='w-5 h-5 border-2 border-orange-600 border-t-transparent rounded-full animate-spin' />
          <p className='text-[10px] text-gray-500 font-bold uppercase tracking-widest'>
            Loading Secure Form...
          </p>
        </div>
      )}
    </div>
  );
}
