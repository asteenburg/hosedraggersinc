import { NextResponse } from "next/server";
import crypto from "crypto";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      sourceId,
      amount,
      email,
      isDonating,
      shippingName,
      shippingAddress,
      shippingCity,
      shippingProvince,
      shippingPostal,
      contactPhone,
    } = body;

    if (!sourceId || !amount) {
      return NextResponse.json(
        { error: "Missing sourceId or amount" },
        { status: 400 },
      );
    }

    const secretKey = process.env.SQUARE_ACCESS_TOKEN;
    if (!secretKey) {
      console.error("❌ SQUARE_ACCESS_TOKEN not defined.");
      return NextResponse.json(
        { error: "Server configuration error" },
        { status: 500 },
      );
    }

    const squareUrl = "https://connect.squareup.com/v2/payments";

    const squareRequest = {
      idempotency_key: crypto.randomBytes(12).toString("hex"),
      source_id: sourceId,
      amount_money: {
        amount: Math.round(amount),
        currency: "CAD",
      },
      buyer_email_address: email || undefined,
      note: `Donation: ${isDonating}, Email: ${email}, Shipping: ${shippingName}, ${shippingAddress}, ${shippingCity}, ${shippingProvince}, ${shippingPostal}, Phone: ${contactPhone}`,
    };

    const response = await fetch(squareUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${secretKey}`,
        "Square-Version": "2025-03-12",
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

    return NextResponse.json({ success: true, paymentId: result.payment.id });
  } catch (error) {
    console.error("Internal Server Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
