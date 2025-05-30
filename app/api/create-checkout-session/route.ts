import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      amount,
      currency = "ZAR",

      reference,
      formData,
      formType,
    } = body;

    // Validate required fields
    if (!amount || !reference || !formData || !formType) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

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

    // Ensure amount is a number and convert to cents
    const amountInCents = Math.round(Number(amount) * 100);

    // Create clean metadata object
    const enhancedMetadata = {
      reference,
      formType,
      formDataHash: JSON.stringify({
        type: formType,
        ref: reference,
        data: formData,
      }),
    };

    const successUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/payment/success?reference=${reference}&type=${formType}`;
    const cancelUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/payment/cancel`;

    console.log("Sending request to Yoco:", {
      amount: amountInCents,
      currency,
      metadata: enhancedMetadata,
      successUrl,
      cancelUrl,
    });

    const response = await fetch("https://payments.yoco.com/api/checkouts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${secretKey}`,
      },
      body: JSON.stringify({
        amount: amountInCents,
        currency,
        metadata: enhancedMetadata,
        success_url: successUrl,
        cancel_url: cancelUrl,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("Yoco API error:", data);
      return NextResponse.json(
        { error: data.message || "Failed to create checkout session" },
        { status: response.status }
      );
    }

    if (data.id) {
      console.log("Checkout session created:", data.id);
    }

    return NextResponse.json({
      checkoutUrl: data.redirectUrl,
      sessionId: data.id,
    });
  } catch (error: unknown) {
    console.error("Checkout error:", error);
    const message =
      error instanceof Error ? error.message : "An unknown error occurred";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
