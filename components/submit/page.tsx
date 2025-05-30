"use client";

import { useState } from "react";

// Individual registration data type
interface IndividualFormData {
  name: string;
  idNumber: string;
  email: string;
  contactNumber: string;
  invoicingDetails: string;
  attendeeType: string;
  isMember: boolean;
  numberOfDays: "one" | "two";
  selectedPricing: string;
  totalPrice: number;
}

// Bulk registration data type
interface BulkFormData {
  organizationType: string;
  schoolName: string;
  vatNumber?: string;
  contactPersonName: string;
  contactPersonEmail: string;
  contactPersonPhone: string;
  memberStudents: number;
  nonMemberStudents: number;
  memberTeachers: number;
  nonMemberTeachers: number;
  numberOfDays: "one" | "two";
  selectedDate?: string;
  totalPrice: number;
}

// Booth registration data type
interface BoothFormData {
  exhibitorType: string;
  exhibitorSize: string;
  educationOption: string;
  industryOption: string;
  companyName: string;
  companyAddress: string;
  companyEmail: string;
  companyContactNumber: string;
  companyVAT: string;
  companyContactPerson: string;
  priceBeforeVAT: number;
  vatAmount: number;
  totalPrice: number;
}

// Sponsor registration data type
interface SponsorFormData {
  sponsorshipType: string;
  competitionPantryType: string;
  partnerTier: string;
  companyName: string;
  companyAddress: string;
  companyEmail: string;
  companyContactNumber: string;
  companyVAT: string;
  companyContactPerson: string;
  basePrice: number;
  discount: number;
  priceBeforeVAT: number;
  vatAmount: number;
  totalPrice: number;
}

interface SubmitProps {
  formData: IndividualFormData | BulkFormData | BoothFormData | SponsorFormData;
  totalPrice: number;
  formType: "individual" | "bulk" | "booth" | "sponsor";
}

export default function Submit({
  formData,
  totalPrice,
  formType,
}: SubmitProps) {
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePayNow = async () => {
    setIsProcessing(true);

    try {
      const response = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: totalPrice,
          reference: `REG-${Date.now()}`,
        }),
      });

      const data = await response.json();

      if (data?.checkoutUrl) {
        window.location.href = data.checkoutUrl; // Redirect to Yoco
      } else {
        alert("Failed to start payment session.");
      }
    } catch (error) {
      console.error("Payment failed:", error);
      alert("Payment processing failed. Please try again.");
    }

    setIsProcessing(false);
  };

  const handlePayLater = async () => {
    try {
      // Generate EFT instructions
      await sendFormDataEmail(formData, formType, "eft");

      alert(
        "Registration successful! EFT instructions have been sent to your email."
      );
    } catch (error) {
      console.error("Failed to process EFT registration:", error);
      alert("Failed to process registration. Please try again.");
    }
  };

  const sendFormDataEmail = async (
    data: IndividualFormData | BulkFormData | BoothFormData | SponsorFormData,
    type: "individual" | "bulk" | "booth" | "sponsor",
    paymentMethod: "card" | "eft"
  ) => {
    try {
      // Get the user's email based on form type
      const userEmail =
        "email" in data
          ? data.email
          : "contactPersonEmail" in data
          ? data.contactPersonEmail
          : "companyEmail" in data
          ? data.companyEmail
          : null;

      // Format the data for email
      const formattedDate = new Date().toLocaleString();
      const reference = `REG-${Date.now()}`;

      // Create HTML content for admin email
      const adminHtml = `
      <html>
        <body>
          <h2>New Registration Submission</h2>
          <p><strong>Registration Type:</strong> ${type}</p>
          <p><strong>Payment Method:</strong> ${paymentMethod}</p>
          <p><strong>Reference:</strong> ${reference}</p>
          <p><strong>Submission Date:</strong> ${formattedDate}</p>
          <hr>
          <h3>Form Details:</h3>
          <table style="width: 100%; border-collapse: collapse;">
            ${Object.entries(data)
              .map(
                ([key, value]) => `
                <tr style="border-bottom: 1px solid #ddd;">
                  <td style="padding: 8px; font-weight: bold;">${key}:</td>
                  <td style="padding: 8px;">${value}</td>
                </tr>
              `
              )
              .join("")}
          </table>
        </body>
      </html>
    `;

      // Send email to admin using API route
      await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: "anguscarey1@gmail.com",
          title: `New ${
            type.charAt(0).toUpperCase() + type.slice(1)
          } Registration - ${reference}`,
          message: adminHtml,
        }),
      });

      // Send confirmation email to user if email exists
      if (userEmail) {
        const userHtml = `
        <html>
          <body>
            <h2>Thank you for your registration!</h2>
            <p>Your registration has been received with reference: ${reference}</p>
            ${
              paymentMethod === "eft"
                ? `
              <h3>EFT Payment Details:</h3>
              <p>Please use your reference number when making payment:</p>
              <p><strong>Bank:</strong> [Bank Name]</p>
              <p><strong>Account Holder:</strong> [Account Holder]</p>
              <p><strong>Account Number:</strong> [Account Number]</p>
              <p><strong>Branch Code:</strong> [Branch Code]</p>
              <p><strong>Reference:</strong> ${reference}</p>
              <p><strong>Amount Due:</strong> R${data.totalPrice?.toFixed(
                2
              )}</p>
            `
                : `
              <p>Your payment is being processed via card payment.</p>
            `
            }
            <hr>
            <p>If you have any questions, please contact us.</p>
          </body>
        </html>
      `;

        await fetch("/api/send-email", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: userEmail,
            title: `Registration Confirmation - ${reference}`,
            message: userHtml,
          }),
        });
      }
    } catch (error) {
      console.error("Failed to send emails:", error);
      throw new Error("Failed to send registration emails");
    }
  };

  return (
    <div className="space-y-6">
      {/* Price Summary */}
      <div className="border rounded-lg p-6 bg-gray-50">
        <h2 className="text-xl font-bold mb-4">Price Summary</h2>
        <div className="flex justify-between items-center text-lg">
          <span>Total Amount Due:</span>
          <span className="font-bold">R {totalPrice.toFixed(2)}</span>
        </div>
      </div>

      {/* Payment Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <button
          onClick={handlePayNow}
          disabled={isProcessing}
          className="bg-green-600 text-white py-3 px-8 rounded-md hover:bg-green-700 
                   text-lg font-medium disabled:bg-gray-400 disabled:cursor-not-allowed
                   flex items-center justify-center min-w-[200px]"
        >
          {isProcessing ? "Processing..." : "Pay Now with Card"}
        </button>

        <button
          onClick={handlePayLater}
          disabled={isProcessing}
          className="bg-blue-600 text-white py-3 px-8 rounded-md hover:bg-blue-700 
                   text-lg font-medium disabled:bg-gray-400 disabled:cursor-not-allowed
                   flex items-center justify-center min-w-[200px]"
        >
          Pay Later with EFT
        </button>
      </div>

      {/* Payment Instructions */}
      <div className="text-sm text-gray-600 text-center mt-4">
        <p>
          For EFT payments, banking details will be sent to your registered
          email address.
        </p>
        <p className="mt-2">
          Your registration will be confirmed once payment is received.
        </p>
      </div>
    </div>
  );
}
