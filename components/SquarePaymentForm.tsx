"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

interface SquarePaymentFormProps {
  amount: number;
  onPaymentSuccess: () => void;
  email?: string;
  emailOptIn?: boolean;
  isDonating?: boolean;

  // Shipping / contact info
  shippingName?: string;
  shippingAddress?: string;
  shippingCity?: string;
  shippingProvince?: string;
  shippingPostal?: string;
  contactPhone?: string;
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
  shippingName = "",
  shippingAddress = "",
  shippingCity = "",
  shippingProvince = "",
  shippingPostal = "",
  contactPhone = "",
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
        console.error("❌ Square initialization failed", e);
      }
    }

    init();
  }, []);

  async function handleCheckout() {
    console.log("🔥 Checkout clicked");

    if (!cardReady || !cardRef.current || isProcessing) {
      console.log("⛔ Blocked:", {
        cardReady,
        hasCard: !!cardRef.current,
        isProcessing,
      });
      return;
    }

    setIsProcessing(true);

    try {
      console.log("➡️ Tokenizing...");

      const result = await cardRef.current.tokenize();
      console.log("🧾 TOKEN RESULT:", result);

      if (result.status !== "OK") {
        console.error("❌ Tokenization failed:", result.errors);
        alert(JSON.stringify(result.errors, null, 2));
        return;
      }

      console.log("✅ Token OK, calling API...");

      const apiResponse = await fetch("/api/pay", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          sourceId: result.token,
          amount,
          email,
          isDonating,
          shippingName,
          shippingAddress,
          shippingCity,
          shippingProvince,
          shippingPostal,
          contactPhone,
        }),
      });

      const data = await apiResponse.json();
      console.log("📦 API DATA:", data);

      if (!apiResponse.ok) {
        throw new Error(data.error || "Payment failed");
      }

      console.log("✅ Payment success");
      onPaymentSuccess?.();
      window.location.href = "/success";
    } catch (error: any) {
      console.error("❌ Checkout error:", error);
      alert(error.message || "Checkout failed");
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
            : "bg-red-600 hover:bg-black text-white hover:scale-[1.02] active:scale-95"
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
