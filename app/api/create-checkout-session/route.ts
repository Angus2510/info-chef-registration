import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { amount, currency = "ZAR", metadata } = body;

    const mode = process.env.YOCO_MODE || "test";
    const secretKey =
      mode === "live"
        ? process.env.YOCO_LIVE_SECRET_KEY
        : process.env.YOCO_TEST_SECRET_KEY;

    if (!secretKey) {
      return NextResponse.json(
        { error: "Yoco secret key is not configured." },
        { status: 500 }
      );
    }

    const response = await fetch("https://payments.yoco.com/api/checkouts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${secretKey}`,
      },
      body: JSON.stringify({
        amount: amount * 100, // Convert to cents
        currency,
        metadata,
        successUrl: "https://yourdomain.com/success",
        cancelUrl: "https://yourdomain.com/cancel",
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        { error: data.message || "Failed to create checkout session" },
        { status: response.status }
      );
    }

    return NextResponse.json({ checkoutUrl: data.redirectUrl });
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "An unknown error occurred";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
