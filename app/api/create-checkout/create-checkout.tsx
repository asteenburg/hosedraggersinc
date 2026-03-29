import type { NextApiRequest, NextApiResponse } from "next";

const SQUARE_BASE_URL = "https://connect.squareupsandbox.com"; // sandbox
const SQUARE_LOCATION_ID = process.env.NEXT_PUBLIC_SQUARE_LOCATION_ID;
const SQUARE_ACCESS_TOKEN = process.env.SQUARE_ACCESS_TOKEN;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { amount, email, emailOptIn, isDonating } = req.body;

  if (!amount || amount <= 0) {
    return res.status(400).json({ message: "Invalid amount" });
  }

  try {
    // Prepare the line items
    const lineItems = [
      {
        name: "Order Payment",
        quantity: "1",
        base_price_money: {
          amount: amount,
          currency: "USD",
        },
      },
    ];

    // Add donation line item if selected
    if (isDonating) {
      lineItems.push({
        name: "Donation",
        quantity: "1",
        base_price_money: {
          amount: 500, // $5 donation in cents
          currency: "USD",
        },
      });
    }

    const checkoutBody = {
      idempotency_key: crypto.randomUUID(),
      order: {
        location_id: SQUARE_LOCATION_ID,
        line_items: lineItems,
      },
      ask_for_shipping_address: false,
      merchant_support_email: "support@yourstore.com",
      redirect_url: `${process.env.NEXT_PUBLIC_BASE_URL}/checkout-success`,
    };

    // Create checkout session
    const response = await fetch(`${SQUARE_BASE_URL}/v2/checkout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${SQUARE_ACCESS_TOKEN}`,
        "Square-Version": "2025-12-17",
      },
      body: JSON.stringify(checkoutBody),
    });

    const data = await response.json();

    if (!data.checkout || !data.checkout.checkout_page_url) {
      console.error("❌ Square checkout error:", data);
      return res.status(500).json({ message: "Failed to create checkout" });
    }

    // Optional: log email + opt-in
    if (email && emailOptIn) {
      console.log(`User opted in: ${email}`);
      // Store in DB or analytics if needed
    }

    res.status(200).json({ checkoutUrl: data.checkout.checkout_page_url });
  } catch (error: any) {
    console.error("❌ Create checkout failed:", error);
    res.status(500).json({ message: "Server error creating checkout" });
  }
}
