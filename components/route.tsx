import { NextResponse } from "next/server";
import crypto from "crypto";

export async function POST(req: Request) {
  try {
    console.log("➡️ /api/pay request received");

    // 1️⃣ Parse the request body safely
    const body = await req.json();
    console.log("📦 Request Body:", body);

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

    // 2️⃣ Validate minimum required fields
    if (!sourceId || !amount) {
      console.warn("⚠️ Missing required fields:", { sourceId, amount });
      return NextResponse.json(
        { error: "Missing sourceId or amount" },
        { status: 400 },
      );
    }

    // 3️⃣ Get Square Secret Key
    const secretKey = process.env.SQUARE_ACCESS_TOKEN;
    if (!secretKey) {
      console.error("❌ SQUARE_ACCESS_TOKEN not defined");
      return NextResponse.json(
        { error: "Server misconfiguration" },
        { status: 500 },
      );
    }

    // 4️⃣ Build the payment request
    const squareUrl = "https://connect.squareup.com/v2/payments";
    const idempotencyKey = crypto.randomBytes(12).toString("hex");

    // Combine shipping and contact info into a note for internal reference
    const noteParts = [
      isDonating ? "Includes $5 Donation" : "Hose Draggers Purchase",
      shippingName && `Name: ${shippingName}`,
      shippingAddress && `Address: ${shippingAddress}`,
      shippingCity && `City: ${shippingCity}`,
      shippingProvince && `Province: ${shippingProvince}`,
      shippingPostal && `Postal: ${shippingPostal}`,
      contactPhone && `Phone: ${contactPhone}`,
      email && `Email: ${email}`,
    ].filter(Boolean);

    const note = noteParts.join(" | ");

    const squareRequest = {
      idempotency_key: idempotencyKey,
      source_id: sourceId,
      amount_money: {
        amount: Math.round(amount), // must be integer cents
        currency: "CAD",
      },
      buyer_email_address: email || undefined,
      note,
    };

    console.log("📤 Sending payment to Square:", squareRequest);

    // 5️⃣ Execute the payment
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
    console.log("📥 Square Response:", result);

    if (!response.ok) {
      console.error("❌ Square API Error:", result.errors);
      return NextResponse.json(
        { error: result.errors?.[0]?.detail || "Payment failed" },
        { status: response.status },
      );
    }

    // 6️⃣ Success
    console.log(
      "✅ Payment processed successfully. Payment ID:",
      result.payment.id,
    );
    return NextResponse.json({
      success: true,
      paymentId: result.payment.id,
      note,
    });
  } catch (error) {
    console.error("💥 Internal Server Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
