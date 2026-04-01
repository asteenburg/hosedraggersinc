import { NextResponse } from "next/server";
import crypto from "crypto";

export async function POST(req: Request) {
  try {
    // 1. Parse the request body safely
    const body = await req.json();
    const { sourceId, amount, email, isDonating } = body;

    // 2. Validate input
    if (!sourceId || !amount) {
      return NextResponse.json(
        { error: "Missing sourceId or amount" },
        { status: 400 },
      );
    }

    // 3. Get Secret Key from Vercel Env Vars
    const secretKey = process.env.SQUARE_ACCESS_TOKEN;

    if (!secretKey) {
      console.error("❌ SQUARE_ACCESS_TOKEN is not defined in Vercel.");
      return NextResponse.json(
        { error: "Server configuration error" },
        { status: 500 },
      );
    }

    // 4. Square Production Endpoint
    const squareUrl = "https://connect.squareup.com/v2/payments";

    // 5. Build Square Request
    const squareRequest = {
      idempotency_key: crypto.randomBytes(12).toString("hex"),
      source_id: sourceId,
      amount_money: {
        amount: Math.round(amount), // Ensure integer for cents
        currency: "CAD",
      },
      buyer_email_address: email || undefined,
      note: isDonating ? "Includes $5 Donation" : "Hose Draggers Purchase",
    };

    // 6. Execute Payment
    const response = await fetch(squareUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${secretKey}`,
        "Square-Version": "2025-03-12", // Updated to current stable
      },
      body: JSON.stringify(squareRequest),
    });

    const result = await response.json();

    if (!response.ok) {
      console.error("❌ Square API Error:", result.errors);
      return NextResponse.json(
        { error: result.errors?.[0]?.detail || "Payment failed" },
        { status: response.status },
      );
    }

    // 7. Success
    return NextResponse.json({
      success: true,
      paymentId: result.payment.id,
    });
  } catch (error) {
    console.error("Internal Server Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
