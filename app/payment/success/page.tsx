"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

export default function PaymentSuccess() {
  const searchParams = useSearchParams();
  const reference = searchParams.get("reference");
  const type = searchParams.get("type");
  const encodedData = searchParams.get("data");

  useEffect(() => {
    if (reference && type && encodedData) {
      try {
        // Decode the form data
        const formData = JSON.parse(
          Buffer.from(encodedData, "base64").toString()
        );

        // Format form data for email
        const formDetails = Object.entries(formData)
          .map(([key, value]) => `<tr><td>${key}</td><td>${value}</td></tr>`)
          .join("");

        // Send success confirmation email
        fetch("/api/send-email", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: "jason@sachefs.co.za",
            title: `Payment Successful - ${reference}`,
            message: `
              <html>
                <body>
                  <h2>Payment Successful</h2>
                  <p><strong>Reference:</strong> ${reference}</p>
                  <p><strong>Registration Type:</strong> ${type}</p>
                  <p><strong>Payment Date:</strong> ${new Date().toLocaleString()}</p>
                  <h3>Form Details:</h3>
                  <table style="width: 100%; border-collapse: collapse;">
                    ${formDetails}
                  </table>
                </body>
              </html>
            `,
          }),
        });
      } catch (error) {
        console.error("Error processing success data:", error);
      }
    }
  }, [reference, type, encodedData]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Payment Successful!
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Thank you for your payment. Your reference number is: {reference}
          </p>
          <p className="mt-4 text-sm text-gray-500">
            A confirmation email has been sent to your registered email address.
          </p>
        </div>
      </div>
    </div>
  );
}
