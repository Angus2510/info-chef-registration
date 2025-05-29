"use client"; // Enable client-side functionality

import { useState } from "react";
// Import your custom components (to be created)
import SingleRegistration from "@/components/individual/page";
import BulkRegistration from "@/components/bulkRegistration/page";
import BoothRegistration from "@/components/boothRegistration/page";

export default function Home() {
  // Updated to include booth registration
  const [registrationType, setRegistrationType] = useState<
    "single" | "bulk" | "booth" | null
  >(null);

  // Handle registration type selection
  const handleTypeSelection = (type: "single" | "bulk" | "booth") => {
    setRegistrationType(type);
  };

  // Back to selection button
  const backToSelection = () => {
    setRegistrationType(null);
  };

  return (
    <main className="flex min-h-screen flex-col items-center p-8">
      <div className="max-w-2xl w-full">
        <h1 className="text-3xl font-bold text-center mb-8">
          SA Chefs Association Registration
        </h1>

        {/* Registration type selection */}
        {!registrationType && (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-6">
              Choose Registration Type:
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <button
                onClick={() => handleTypeSelection("single")}
                className="p-6 border-2 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all"
              >
                <h3 className="text-lg font-medium">Single Registration</h3>
                <p className="text-gray-600 mt-2">Register as an individual</p>
              </button>

              <button
                onClick={() => handleTypeSelection("bulk")}
                className="p-6 border-2 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all"
              >
                <h3 className="text-lg font-medium">Bulk Registration</h3>
                <p className="text-gray-600 mt-2">
                  Register multiple attendees
                </p>
              </button>

              <button
                onClick={() => handleTypeSelection("booth")}
                className="p-6 border-2 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all"
              >
                <h3 className="text-lg font-medium">Booth Registration</h3>
                <p className="text-gray-600 mt-2">
                  Register for exhibition booth
                </p>
              </button>
            </div>
          </div>
        )}

        {/* Render the appropriate component based on registration type */}
        {registrationType === "single" && (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-6">Single Registration</h2>
            <SingleRegistration />
            <p className="text-gray-600">
              Your single registration form component will go here
            </p>
            <button
              onClick={backToSelection}
              className="mt-4 text-blue-600 hover:underline"
            >
              ← Back to registration options
            </button>
          </div>
        )}

        {registrationType === "bulk" && (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-6">Bulk Registration</h2>
            <BulkRegistration />
            <p className="text-gray-600">
              Your bulk registration form component will go here
            </p>
            <button
              onClick={backToSelection}
              className="mt-4 text-blue-600 hover:underline"
            >
              ← Back to registration options
            </button>
          </div>
        )}

        {registrationType === "booth" && (
          <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-5xl mx-auto">
            <h2 className="text-xl font-semibold mb-6">Booth Registration</h2>
            <BoothRegistration />
            <button
              onClick={backToSelection}
              className="mt-4 text-blue-600 hover:underline"
            >
              ← Back to registration options
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
