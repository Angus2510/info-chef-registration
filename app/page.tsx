"use client";

import { useState } from "react";
import Image from "next/image";
import SingleRegistration from "@/components/individual/page";
import BulkRegistration from "@/components/bulkRegistration/page";
import BoothRegistration from "@/components/boothRegistration/page";
import SponsorRegistration from "@/components/sponsorRegistration/page";

export default function Home() {
  const [registrationType, setRegistrationType] = useState<
    "visitor" | "visitor-bulk" | "exhibitor" | "sponsor" | null
  >(null);

  const handleTypeSelection = (
    type: "visitor" | "visitor-bulk" | "exhibitor" | "sponsor"
  ) => {
    setRegistrationType(type);
  };

  const backToSelection = () => {
    setRegistrationType(null);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#243d8e]">
      {/* Logo Section */}
      <div className="w-full flex justify-center mb-6">
        <Image
          src="/logo-2.png"
          alt="Info Chef Logo"
          width={400}
          height={400}
          priority
          className="object-contain"
        />
      </div>

      {/* Event Details Section */}
      <div className="w-full flex justify-center mb-8">
        <div className="text-center text-white">
          <h2 className="text-3xl font-bold mb-2">29 - 30 July 2025</h2>
          <h3 className="text-2xl">The Wanderers Club</h3>
          <h3 className="text-2xl">9am until 4pm</h3>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-grow flex flex-col items-center px-8 pb-8">
        <div className="max-w-5xl w-full shadow-2xl mb-8">
          {/* Registration type selection */}
          {!registrationType && (
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-6 text-center">
                Choose Registration Type
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button
                  onClick={() => handleTypeSelection("visitor")}
                  className="p-6 border-2 rounded-lg hover:border-red-500 hover:bg-red-50 transition-all"
                >
                  <h3 className="text-lg font-medium">Visitor Registration</h3>
                  <p className="text-gray-600 mt-2">
                    Register as an individual visitor
                  </p>
                </button>

                <button
                  onClick={() => handleTypeSelection("visitor-bulk")}
                  className="p-6 border-2 rounded-lg hover:border-red-500 hover:bg-red-50 transition-all"
                >
                  <h3 className="text-lg font-medium">
                    Visitor Bulk Registration
                  </h3>
                  <p className="text-gray-600 mt-2">
                    Register multiple visitors
                  </p>
                </button>

                <button
                  onClick={() => handleTypeSelection("exhibitor")}
                  className="p-6 border-2 rounded-lg hover:border-red-500 hover:bg-red-50 transition-all"
                >
                  <h3 className="text-lg font-medium">
                    Exhibitor Registration
                  </h3>
                  <p className="text-gray-600 mt-2">Register as an exhibitor</p>
                </button>

                <button
                  onClick={() => handleTypeSelection("sponsor")}
                  className="p-6 border-2 rounded-lg hover:border-red-500 hover:bg-red-50 transition-all"
                >
                  <h3 className="text-lg font-medium">Sponsor Registration</h3>
                  <p className="text-gray-600 mt-2">Register as a sponsor</p>
                </button>
              </div>
            </div>
          )}

          {/* Form Components */}
          {registrationType === "visitor" && (
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-6">
                Visitor Registration
              </h2>
              <SingleRegistration />
              <button
                onClick={backToSelection}
                className="mt-4 text-blue-600 hover:underline"
              >
                ← Back to registration options
              </button>
            </div>
          )}

          {registrationType === "visitor-bulk" && (
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-6">
                Visitor Bulk Registration
              </h2>
              <BulkRegistration />
              <button
                onClick={backToSelection}
                className="mt-4 text-blue-600 hover:underline"
              >
                ← Back to registration options
              </button>
            </div>
          )}

          {registrationType === "exhibitor" && (
            <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-5xl mx-auto">
              <h2 className="text-xl font-semibold mb-6">
                Exhibitor Registration
              </h2>
              <BoothRegistration />
              <button
                onClick={backToSelection}
                className="mt-4 text-blue-600 hover:underline"
              >
                ← Back to registration options
              </button>
            </div>
          )}

          {registrationType === "sponsor" && (
            <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-5xl mx-auto">
              <h2 className="text-xl font-semibold mb-6">
                Sponsor Registration
              </h2>
              <SponsorRegistration />
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

      {/* Bottom Banner */}
      <div className="w-full shadow-lg">
        <Image
          src="/banner.png"
          alt="Event Banner"
          width={1920}
          height={200}
          className="w-full object-cover"
        />
      </div>
    </div>
  );
}
