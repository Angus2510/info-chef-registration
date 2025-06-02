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
  selectedDate?: string;
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
  disablePayment?: boolean;
}

export default function Submit({
  formData,
  totalPrice,
  formType,
  disablePayment = false,
}: SubmitProps) {
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePayNow = async () => {
    setIsProcessing(true);

    try {
      const reference = `REG-${Date.now()}`;
      const response = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: totalPrice,
          reference: reference,
          formData: formData,
          formType: formType,
          metadata: {
            reference: reference,
            formType: formType,
          },
        }),
      });

      const data = await response.json();

      if (data?.checkoutUrl) {
        // Send the initial email before redirecting
        await sendFormDataEmail(formData, formType, "card");
        window.location.href = data.checkoutUrl;
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
      const reference = `REG-${Date.now()}`;
      // Generate EFT instructions
      await sendFormDataEmail(formData, formType, "eft");

      // Encode the form data for URL
      const encodedData = btoa(JSON.stringify(formData));

      // Add method=eft to the URL
      window.location.href = `/payment/success?reference=${reference}&type=${formType}&data=${encodedData}&method=eft`;
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

      // Create formatted table rows from form data
      const formDataTable = Object.entries(data)
        .map(([key, value]) => {
          // Format the key to be more readable
          const formattedKey = key
            .replace(/([A-Z])/g, " $1") // Add space before capital letters
            .replace(/^./, (str) => str.toUpperCase()); // Capitalize first letter

          // Format the value based on its type
          let formattedValue = value;
          if (typeof value === "boolean") {
            formattedValue = value ? "Yes" : "No";
          } else if (typeof value === "number") {
            if (
              key.toLowerCase().includes("price") ||
              key.toLowerCase().includes("amount")
            ) {
              formattedValue = `R ${value.toFixed(2)}`;
            }
          }

          return `
            <tr style="border-bottom: 1px solid #ddd;">
              <td style="padding: 12px; font-weight: bold; background-color: #f8f9fa;">${formattedKey}</td>
              <td style="padding: 12px;">${formattedValue}</td>
            </tr>
          `;
        })
        .join("");

      // Create HTML content for admin email
      const adminHtml = `
        <html>
          <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
            <h2 style="color: #2c5282;">New Registration Submission</h2>
            <div style="background-color: #f8f9fa; padding: 15px; border-radius: 5px; margin-bottom: 20px;">
              <p><strong>Registration Type:</strong> ${
                type.charAt(0).toUpperCase() + type.slice(1)
              }</p>
              <p><strong>Payment Method:</strong> ${paymentMethod.toUpperCase()}</p>
              <p><strong>Reference:</strong> ${reference}</p>
              <p><strong>Submission Date:</strong> ${formattedDate}</p>
            </div>
            <h3 style="color: #2c5282;">Registration Details:</h3>
            <table style="width: 100%; border-collapse: collapse; margin-top: 10px;">
              ${formDataTable}
            </table>
          </body>
        </html>
      `;

      // Create HTML content for user email
      const userHtml = `
        <html>
          <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
            <h2 style="color: #2c5282;">Registration Confirmation</h2>
            <div style="background-color: #f8f9fa; padding: 15px; border-radius: 5px; margin-bottom: 20px;">
              <p>Thank you for your registration!</p>
              <p><strong>Reference Number:</strong> ${reference}</p>
              <p><strong>Registration Type:</strong> ${
                type.charAt(0).toUpperCase() + type.slice(1)
              }</p>
            </div>
            ${
              paymentMethod === "eft"
                ? `
              <div style="background-color: #e6f7ff; padding: 15px; border-radius: 5px; margin-bottom: 20px;">
              <h3 style="color: #2c5282;">Payment Information:</h3>
              <p>Thank you for choosing the EFT payment option.</p>
              <p>Our finance team will contact you shortly with an invoice containing our banking details.</p>
              <p><strong>Your Reference Number:</strong> ${reference}</p>
              <p><strong>Amount Due:</strong> R${data.totalPrice?.toFixed(
                2
              )}</p>
              <p>Please note: Your registration will be confirmed once payment is received.</p>
              </div>
            `
                : `
              <p>Your payment is being processed via card payment.</p>
            `
            }
            <h3 style="color: #2c5282;">Registration Details:</h3>
            <table style="width: 100%; border-collapse: collapse; margin-top: 10px;">
              ${formDataTable}
            </table>
            <div style="margin-top: 20px; padding: 15px; background-color: #f8f9fa; border-radius: 5px;">
              <p>If you have any questions, please contact us at  infochef@sachefs.co.za</p>
            </div>
          </body>
        </html>
      `;

      // Send emails
      await Promise.all([
        // Send to admin
        fetch("/api/send-email", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: "jason@sachefs.co.za, infochef@sachefs.co.za",
            title: `New ${
              type.charAt(0).toUpperCase() + type.slice(1)
            } Registration - ${reference}`,
            message: adminHtml,
          }),
        }),
        // Send to user if email exists
        userEmail &&
          fetch("/api/send-email", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: userEmail,
              title: `Registration Confirmation - ${reference}`,
              message: userHtml,
            }),
          }),
      ]);
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
      <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
        {!disablePayment ? (
          <button
            onClick={handlePayNow}
            disabled={isProcessing}
            className="bg-green-600 text-white py-3 px-8 rounded-md hover:bg-green-700 
                text-lg font-medium disabled:bg-gray-400 disabled:cursor-not-allowed
                flex items-center justify-center min-w-[200px]"
          >
            {isProcessing ? "Processing..." : "Pay Now with Card"}
          </button>
        ) : (
          <div className="text-gray-600 italic bg-gray-100 px-4 py-2 rounded-md">
            Card payment disabled - Partner tier selected
          </div>
        )}

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
