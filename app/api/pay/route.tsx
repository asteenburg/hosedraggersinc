import { NextResponse } from "next/server";
import crypto from "crypto";

export async function POST(req: Request) {
  try {
    // 1. Parse request body
    const body = await req.json();
    const { sourceId, amount, email, isDonating } = body;

    if (!sourceId || !amount) {
      return NextResponse.json(
        { error: "Missing sourceId or amount" },
        { status: 400 }
      );
    }

    // 2. Env vars
    const secretKey = process.env.SQUARE_ACCESS_TOKEN;

    if (!secretKey) {
      console.error("❌ Missing SQUARE_ACCESS_TOKEN");
      return NextResponse.json(
        { error: "Server configuration error" },
        { status: 500 }
      );
    }

    // ⚠️ IMPORTANT: switch this if you're using sandbox
    const squareUrl = "https://connect.squareup.com/v2/payments";
    // const squareUrl = "https://connect.squareupsandbox.com/v2/payments";

    const squareRequest = {
      idempotency_key: crypto.randomBytes(12).toString("hex"),
      source_id: sourceId,
      amount_money: {
        amount: Math.round(amount),
        currency: "CAD",
      },
      buyer_email_address: email || undefined,
      note: isDonating
        ? "Includes $5 Donation"
        : "Hose Draggers Purchase",
    };

    console.log("➡️ Sending to Square:", squareRequest);

    // 3. Call Square
    const response = await fetch(squareUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${secretKey}`,
        "Square-Version": "2025-03-12",
      },
      body: JSON.stringify(squareRequest),
    });

    // 4. Read raw response FIRST
    const rawText = await response.text();
    console.log("⬅️ RAW Square response:", rawText);

    let result;

    try {
      result = JSON.parse(rawText);
    } catch (parseError) {
      console.error("❌ Failed to parse Square response as JSON");
      return NextResponse.json(
        {
          error: "Invalid response from payment processor",
          raw: rawText, // helpful for debugging
        },
        { status: 500 }
      );
    }

    // 5. Handle Square errors
    if (!response.ok) {
      console.error("❌ Square API Error:", result?.errors);
      return NextResponse.json(
        {
          error:
            result?.errors?.[0]?.detail ||
            "Payment failed",
        },
        { status: response.status }
      );
    }

    // 6. Success
    console.log("✅ Payment success:", result.payment?.id);

    return NextResponse.json({
      success: true,
      paymentId: result.payment.id,
    });
  } catch (error) {
    console.error("❌ Internal Server Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
