import { NextResponse } from "next/server";
import crypto from "crypto";

export async function POST(req: Request) {
  try {
    const { amount } = await req.json();

    if (!amount || amount <= 0) {
      return NextResponse.json({ error: "Invalid amount" }, { status: 400 });
    }

    const token = process.env.SQUARE_ACCESS_TOKEN;
    const locationId = process.env.NEXT_PUBLIC_SQUARE_LOCATION_ID;

    if (!token || !locationId) {
      console.error("❌ Missing Square credentials", { token, locationId });
      return NextResponse.json(
        { error: "Missing Square credentials" },
        { status: 500 },
      );
    }

    const body = {
      idempotency_key: crypto.randomUUID(),
      quick_pay: {
        name: "Cart Total",
        price_money: {
          amount: amount,
          currency: "CAD",
        },
        location_id: locationId,
      },
    };

    const response = await fetch(
      "https://connect.squareupsandbox.com/v2/online-checkout/payment-links",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      },
    );

    const data = await response.json();
    console.log("Square API response:", data);

    if (!response.ok) {
      return NextResponse.json(
        { error: "Square API error", details: data },
        { status: 500 },
      );
    }

    const checkoutUrl = data.payment_link?.url;
    if (!checkoutUrl) {
      console.error("❌ No checkout URL returned", data);
      return NextResponse.json(
        { error: "Checkout URL not returned by Square" },
        { status: 500 },
      );
    }

    return NextResponse.json({ checkoutUrl });
  } catch (error: any) {
    console.error("Unexpected error:", error);
    return NextResponse.json(
      { error: error.message || "Server error" },
      { status: 500 },
    );
  }
}
