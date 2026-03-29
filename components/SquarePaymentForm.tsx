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

  useEffect(() => {
    async function init() {
      if (!window.Square) {
        console.error("❌ Square SDK not loaded");
        return;
      }

      const appId = process.env.NEXT_PUBLIC_SQUARE_APP_ID;
      const locationId = process.env.NEXT_PUBLIC_SQUARE_LOCATION_ID;

      if (!appId || !locationId) {
        console.error("❌ Missing Square env vars", { appId, locationId });
        return;
      }

      const payments = window.Square.payments(appId, locationId);
      const card = await payments.card();
      await card.attach("#card-container");
      cardRef.current = card;
      setCardReady(true);

      console.log("✅ Square card initialized");
    }

    init();
  }, []);

  async function handleCheckout() {
    if (!cardReady || !cardRef.current) {
      alert("Payment form still loading. Please wait 1–2 seconds.");
      return;
    }

    if (!amount || amount <= 0) {
      alert("Invalid payment amount");
      return;
    }

    const result = await cardRef.current.tokenize();
    if (result.status !== "OK") {
      console.error("❌ Tokenize failed", result.errors);
      alert("Card tokenization failed");
      return;
    }

    try {
      const res = await fetch("/api/create-checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount,
          email,
          emailOptIn: emailOptIn || false,
          isDonating: isDonating || false, // ensure boolean
        }),
      });

      const data = await res.json();

      if (!data.checkoutUrl) {
        console.error("❌ Checkout error", data);
        alert("Checkout failed");
        return;
      }

      console.log("✅ Redirecting to Square checkout");
      onPaymentSuccess?.();
      window.location.href = data.checkoutUrl;
    } catch (error) {
      console.error("❌ Checkout fetch error", error);
      alert("Checkout failed. Please try again.");
    }
  }

  return (
    <div className='max-w-md mx-auto mt-8'>
      <div
        id='card-container'
        className='mb-6'
      />

      <button
        onClick={handleCheckout}
        className='mb-4 w-full bg-black text-white py-3 rounded-md'
      >
        Pay ${(amount / 100).toFixed(2)}
      </button>

      <Link href='/'>
        <button className='mt-4 w-full bg-gray-600 text-white py-3 rounded-md'>
          Back to Home
        </button>
      </Link>

      {!cardReady && (
        <p className='text-sm text-gray-500 mt-2 text-center'>
          Loading secure payment form…
        </p>
      )}
    </div>
  );
}
