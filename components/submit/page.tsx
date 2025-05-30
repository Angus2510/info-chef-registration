"use client";

import { useState } from "react";

interface SubmitProps {
  formData: any; // Replace with proper type based on your form data structure
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
      // Implement payment gateway integration here
      console.log("Processing card payment", { formData, totalPrice });

      // Send email with form data
      await sendFormDataEmail(formData, formType, "card");

      alert("Payment processed successfully!");
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
    data: any,
    type: string,
    paymentMethod: "card" | "eft"
  ) => {
    // Implement email sending logic here
    console.log("Sending email with form data", {
      data,
      type,
      paymentMethod,
    });
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
