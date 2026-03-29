import type { NextApiRequest, NextApiResponse } from "next";
import Mailchimp from "@mailchimp/mailchimp_marketing";

Mailchimp.setConfig({
  apiKey: process.env.MAILCHIMP_API_KEY,
  server: process.env.MAILCHIMP_SERVER_PREFIX, // e.g., "us20" from your API key
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }

  try {
    const response = await Mailchimp.lists.addListMember(
      process.env.MAILCHIMP_AUDIENCE_ID!,
      {
        email_address: email,
        status: "subscribed",
      },
    );

    return res
      .status(200)
      .json({ message: "Subscribed successfully", response });
  } catch (error: any) {
    console.error("Mailchimp error:", error);
    return res
      .status(500)
      .json({ message: error?.response?.body?.title || "Subscription failed" });
  }
}
