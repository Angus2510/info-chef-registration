"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { validateRegistrationData } from "@/utils/validation";

type RegistrationType = "individual" | "bulk" | "booth" | "sponsor";

function PaymentSuccessContent() {
  const searchParams = useSearchParams();
  const reference = searchParams.get("reference");
  const type = searchParams.get("type");
  const encodedData = searchParams.get("data");
  const paymentMethod = searchParams.get("method") || "card";
  const [emailSent, setEmailSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!reference || !type || !encodedData) {
      setError("Missing required parameters");
      return;
    }

    try {
      const formData = JSON.parse(atob(encodedData));

      console.log("Decoded form data:", formData); // Add logging

      if (!validateRegistrationData(formData, type as RegistrationType)) {
        console.error("Validation failed:", { formData, type });
        setError("Invalid or incomplete registration data");
        return;
      }

      // Only proceed with email sending for valid data and card payments
      if (!emailSent && paymentMethod === "card") {
        const userEmail =
          "email" in formData
            ? formData.email
            : "contactPersonEmail" in formData
            ? formData.contactPersonEmail
            : "companyEmail" in formData
            ? formData.companyEmail
            : null;

        const formDetails = Object.entries(formData)
          .map(([key, value]) => {
            const formattedKey = key
              .replace(/([A-Z])/g, " $1")
              .replace(/^./, (str) => str.toUpperCase());
            return `<tr><td style="padding: 8px; border: 1px solid #ddd;">${formattedKey}</td><td style="padding: 8px; border: 1px solid #ddd;">${value}</td></tr>`;
          })
          .join("");

        Promise.all([
          fetch("/api/send-email", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: "jason@sachefs.co.za, infochef@sachefs.co.za",
              title: `Registration ${
                paymentMethod === "card" ? "Completed" : "Pending Payment"
              } - ${reference}`,
              message: `
                <html>
                  <body style="font-family: Arial, sans-serif;">
                    <h2 style="color: #2c5282;">Registration ${
                      paymentMethod === "card" ? "Completed" : "Pending Payment"
                    }</h2>
                    <div style="background-color: #f8f9fa; padding: 15px; border-radius: 5px; margin-bottom: 20px;">
                      <p><strong>Reference:</strong> ${reference}</p>
                      <p><strong>Registration Type:</strong> ${type}</p>
                      <p><strong>Payment Method:</strong> ${paymentMethod.toUpperCase()}</p>
                      <p><strong>Date:</strong> ${new Date().toLocaleString()}</p>
                    </div>
                    <h3>Registration Details:</h3>
                    <table style="width: 100%; border-collapse: collapse; margin-top: 10px;">
                      ${formDetails}
                    </table>
                  </body>
                </html>
              `,
            }),
          }),
          userEmail &&
            fetch("/api/send-email", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                email: userEmail,
                title: `Registration Confirmation - SA Chefs`,
                message: `
                <html>
                  <body style="font-family: Arial, sans-serif;">
                    <h2 style="color: #2c5282;">Registration Confirmation</h2>
                    <div style="background-color: #f8f9fa; padding: 15px; border-radius: 5px; margin-bottom: 20px;">
                      <p>Thank you for registering!</p>
                      ${
                        paymentMethod === "card"
                          ? "<p>Your registration and payment have been completed successfully.</p>"
                          : "<p>Your registration has been received. Please note that payment is still pending.</p><p>You will receive an email with the payment details shortly.</p>"
                      }
                      <p><strong>Reference Number:</strong> ${reference}</p>
                      <p><strong>Registration Type:</strong> ${type}</p>
                      <p><strong>Date:</strong> ${new Date().toLocaleString()}</p>
                    </div>
                    <h3>Your Registration Details:</h3>
                    <table style="width: 100%; border-collapse: collapse; margin-top: 10px;">
                      ${formDetails}
                    </table>
                    <div style="margin-top: 20px; padding: 15px; background-color: #f8f9fa; border-radius: 5px;">
                      <p>If you have any questions, please contact us at infochef@sachefs.co.za</p>
                    </div>
                  </body>
                </html>
              `,
              }),
            }),
        ])
          .then(() => {
            setEmailSent(true);
          })
          .catch((error) => {
            console.error("Error sending confirmation emails:", error);
            setError("Failed to send confirmation emails");
          });
      }
    } catch (error) {
      console.error("Error processing registration data:", error);
      setError("Failed to process registration data");
    }
  }, [reference, type, encodedData, emailSent, paymentMethod]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow">
        <div className="text-center">
          {error ? (
            <>
              <h2 className="mt-6 text-3xl font-extrabold text-red-600">
                Registration Error
              </h2>
              <p className="mt-2 text-sm text-gray-600">{error}</p>
              <p className="mt-4 text-sm text-gray-600">
                Please try registering again or contact support with your
                reference number: {reference}
              </p>
            </>
          ) : (
            <>
              <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
                Registration Successful!
              </h2>
              <p className="mt-2 text-sm text-gray-600">
                Thank you for registering! Your reference number is: {reference}
              </p>
              {paymentMethod === "eft" ? (
                <p className="mt-4 text-sm text-gray-600">
                  Please check your email for payment instructions.
                </p>
              ) : (
                !error && (
                  <p className="mt-4 text-sm text-gray-500">
                    {emailSent
                      ? "A confirmation email has been sent to your registered email address."
                      : "Sending confirmation email..."}
                  </p>
                )
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function LoadingState() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Loading...
          </h2>
        </div>
      </div>
    </div>
  );
}

export default function PaymentSuccess() {
  return (
    <Suspense fallback={<LoadingState />}>
      <PaymentSuccessContent />
    </Suspense>
  );
}
