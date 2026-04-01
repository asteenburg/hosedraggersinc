import { NextResponse } from "next/server";
import crypto from "crypto";

export async function POST(req: Request) {
  try {
    const { sourceId, amount, email, isDonating } = await req.json();

    // Basic validation
    if (!sourceId || !amount || amount <= 0) {
      return NextResponse.json(
        { error: "Invalid payment data" },
        { status: 400 },
      );
    }

    const token = process.env.SQUARE_ACCESS_TOKEN;

    // Check for credentials
    if (!token) {
      console.error("❌ Missing SQUARE_ACCESS_TOKEN");
      return NextResponse.json(
        { error: "Internal Server Error" },
        { status: 500 },
      );
    }

    // Use 'connect.squareup.com' for LIVE,
    const squareUrl = "https://connect.squareup.com/v2/payments";

    const body = {
      idempotency_key: crypto.randomBytes(12).toString("hex"),
      source_id: sourceId, // The card token from your frontend
      amount_money: {
        amount: amount, // Amount in cents
        currency: "CAD", // Matching your previous currency
      },
      buyer_email_address: email,
      note: isDonating ? "Includes $5 Donation" : "Sticker Order",
    };

    const response = await fetch(squareUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        "Square-Version": "22025-10-16", // Good practice to include version
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("❌ Square API error:", data.errors);
      return NextResponse.json(
        { error: data.errors?.[0]?.detail || "Payment failed" },
        { status: 400 },
      );
    }

    // Success!
    console.log("✅ Payment Created:", data.payment.id);
    return NextResponse.json({ success: true, paymentId: data.payment.id });
  } catch (error: any) {
    console.error("Unexpected server error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
