"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";

function PaymentSuccessContent() {
  const searchParams = useSearchParams();
  const reference = searchParams.get("reference");
  const type = searchParams.get("type");
  const encodedData = searchParams.get("data");
  const [emailSent, setEmailSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (reference && type && encodedData && !emailSent) {
      try {
        const formData = JSON.parse(atob(encodedData));

        // Get user's email based on form type
        const userEmail =
          "email" in formData
            ? formData.email
            : "contactPersonEmail" in formData
            ? formData.contactPersonEmail
            : "companyEmail" in formData
            ? formData.companyEmail
            : null;

        // Format form data for email
        const formDetails = Object.entries(formData)
          .map(([key, value]) => {
            const formattedKey = key
              .replace(/([A-Z])/g, " $1")
              .replace(/^./, (str) => str.toUpperCase());
            return `<tr><td style="padding: 8px; border: 1px solid #ddd;">${formattedKey}</td><td style="padding: 8px; border: 1px solid #ddd;">${value}</td></tr>`;
          })
          .join("");

        // Send confirmation emails
        Promise.all([
          // Admin notification
          fetch("/api/send-email", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: "jason@sachefs.co.za, infochef@sachefs.co.za",
              title: `Payment Successful - ${reference}`,
              message: `
                <html>
                  <body style="font-family: Arial, sans-serif;">
                    <h2 style="color: #2c5282;">Payment Successful</h2>
                    <div style="background-color: #f8f9fa; padding: 15px; border-radius: 5px; margin-bottom: 20px;">
                      <p><strong>Reference:</strong> ${reference}</p>
                      <p><strong>Registration Type:</strong> ${type}</p>
                      <p><strong>Payment Date:</strong> ${new Date().toLocaleString()}</p>
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
          // User confirmation (if email exists)
          userEmail &&
            fetch("/api/send-email", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                email: userEmail,
                title: `Payment Application - SA Chefs Registration`,
                message: `
                <html>
                  <body style="font-family: Arial, sans-serif;">
                    <h2 style="color: #2c5282;">Payment Pending</h2>
                    <div style="background-color: #f8f9fa; padding: 15px; border-radius: 5px; margin-bottom: 20px;">
                      <p>Thank you for your application! Your registration is now complete. Please note that payment is still pending.</p>  
                      <p>You will receive an email with the payment details</p>
                      <p><strong>Reference Number:</strong> ${reference}</p>
                      <p><strong>Registration Type:</strong> ${type}</p>
                      <p><strong>Payment Date:</strong> ${new Date().toLocaleString()}</p>
                    </div>
                    <h3>Your Registration Details:</h3>
                    <table style="width: 100%; border-collapse: collapse; margin-top: 10px;">
                      ${formDetails}
                    </table>
                    <div style="margin-top: 20px; padding: 15px; background-color: #f8f9fa; border-radius: 5px;">
                      <p>If you have any questions, please contact us at  infochef@sachefs.co.za</p>
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
      } catch (error) {
        console.error("Error processing success data:", error);
        setError("Failed to process payment data");
      }
    }
  }, [reference, type, encodedData, emailSent]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Payment Pending!
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Thank you for your interest. Your reference number is: {reference}
          </p>
          {error ? (
            <p className="mt-4 text-sm text-red-600">
              {error}. Please contact support with your reference number.
            </p>
          ) : (
            <p className="mt-4 text-sm text-gray-500">
              {emailSent
                ? "Confirmation email has been sent to your registered email address."
                : "Sending confirmation email..."}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

// Loading component
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

// Main export
export default function PaymentSuccess() {
  return (
    <Suspense fallback={<LoadingState />}>
      <PaymentSuccessContent />
    </Suspense>
  );
}
