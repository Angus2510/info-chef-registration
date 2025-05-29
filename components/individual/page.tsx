"use client";

import { useState, useEffect } from "react";

export default function IndividualRegistration() {
  // Personal information
  const [name, setName] = useState<string>("");
  const [idNumber, setIdNumber] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [contactNumber, setContactNumber] = useState<string>("");
  const [invoicingDetails, setInvoicingDetails] = useState<string>("");

  // Ticket selection
  const [attendeeType, setAttendeeType] = useState<string>("");
  const [isMember, setIsMember] = useState<boolean>(false);
  const [numberOfDays, setNumberOfDays] = useState<"one" | "two">("one");

  // Total price
  const [totalPrice, setTotalPrice] = useState<number>(0);

  // Calculate price when selections change
  useEffect(() => {
    let price = 0;

    if (attendeeType === "scholar") {
      price = 110; // R110 per day for scholars
      if (numberOfDays === "two") {
        price *= 2;
      }
    } else if (attendeeType === "student" || attendeeType === "general") {
      if (isMember) {
        price = numberOfDays === "one" ? 110 : 200; // Member rates
      } else {
        price = numberOfDays === "one" ? 150 : 250; // Non-member rates
      }
    }

    setTotalPrice(price);
  }, [attendeeType, isMember, numberOfDays]);

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Registration submitted", {
      name,
      idNumber,
      email,
      contactNumber,
      invoicingDetails,
      attendeeType,
      isMember,
      numberOfDays,
      totalPrice,
    });
    alert("Registration submitted successfully!");
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Personal Information */}
        <div className="border rounded-lg p-6 bg-gray-50">
          <h2 className="text-xl font-bold mb-4">Personal Information</h2>
          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-1">
                Name and Surname <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-2 border rounded-md"
                required
              />
            </div>

            <div>
              <label
                htmlFor="idNumber"
                className="block text-sm font-medium mb-1"
              >
                ID Number <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="idNumber"
                value={idNumber}
                onChange={(e) => setIdNumber(e.target.value)}
                className="w-full p-2 border rounded-md"
                required
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-1">
                Email Address <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 border rounded-md"
                required
              />
            </div>

            <div>
              <label
                htmlFor="contactNumber"
                className="block text-sm font-medium mb-1"
              >
                Contact Number <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                id="contactNumber"
                value={contactNumber}
                onChange={(e) => setContactNumber(e.target.value)}
                className="w-full p-2 border rounded-md"
                required
              />
            </div>

            <div>
              <label
                htmlFor="invoicingDetails"
                className="block text-sm font-medium mb-1"
              >
                Invoicing Details <span className="text-red-500">*</span>
              </label>
              <textarea
                id="invoicingDetails"
                value={invoicingDetails}
                onChange={(e) => setInvoicingDetails(e.target.value)}
                rows={3}
                className="w-full p-2 border rounded-md"
                placeholder="Enter company name or personal details for invoicing"
                required
              />
            </div>
          </div>
        </div>

        {/* Ticket Selection */}
        <div className="border rounded-lg p-6 bg-gray-50">
          <h2 className="text-xl font-bold mb-4">Ticket Selection</h2>

          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3">Select Attendee Type</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white p-4 rounded-md border">
                <label className="flex items-start">
                  <input
                    type="radio"
                    name="attendeeType"
                    value="scholar"
                    className="mt-1 mr-3"
                    onChange={() => setAttendeeType("scholar")}
                    required
                  />
                  <div>
                    <p className="font-medium">High School Scholar</p>
                    <p className="text-green-700 font-medium">
                      R110.00 per day
                    </p>
                  </div>
                </label>
              </div>

              <div className="bg-white p-4 rounded-md border">
                <label className="flex items-start">
                  <input
                    type="radio"
                    name="attendeeType"
                    value="student"
                    className="mt-1 mr-3"
                    onChange={() => setAttendeeType("student")}
                  />
                  <div>
                    <p className="font-medium">Culinary Student</p>
                    <p className="text-gray-600 text-sm">
                      Rate depends on membership
                    </p>
                  </div>
                </label>
              </div>

              <div className="bg-white p-4 rounded-md border">
                <label className="flex items-start">
                  <input
                    type="radio"
                    name="attendeeType"
                    value="general"
                    className="mt-1 mr-3"
                    onChange={() => setAttendeeType("general")}
                  />
                  <div>
                    <p className="font-medium">General Admission</p>
                    <p className="text-gray-600 text-sm">
                      Professionals and public
                    </p>
                  </div>
                </label>
              </div>
            </div>
          </div>

          {/* Additional options for student and general */}
          {(attendeeType === "student" || attendeeType === "general") && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-3">
                  Membership Status
                </h3>
                <div className="flex gap-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="memberStatus"
                      checked={isMember}
                      onChange={() => setIsMember(true)}
                      className="mr-2"
                    />
                    <span>SA Chefs Member</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="memberStatus"
                      checked={!isMember}
                      onChange={() => setIsMember(false)}
                      className="mr-2"
                    />
                    <span>Non-member</span>
                  </label>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3">Number of Days</h3>
                <div className="flex gap-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="daysAttending"
                      checked={numberOfDays === "one"}
                      onChange={() => setNumberOfDays("one")}
                      className="mr-2"
                    />
                    <span>One Day</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="daysAttending"
                      checked={numberOfDays === "two"}
                      onChange={() => setNumberOfDays("two")}
                      className="mr-2"
                    />
                    <span>Two Days</span>
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* Days selection for scholars */}
          {attendeeType === "scholar" && (
            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-3">Number of Days</h3>
              <div className="flex gap-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="daysAttending"
                    checked={numberOfDays === "one"}
                    onChange={() => setNumberOfDays("one")}
                    className="mr-2"
                  />
                  <span>One Day</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="daysAttending"
                    checked={numberOfDays === "two"}
                    onChange={() => setNumberOfDays("two")}
                    className="mr-2"
                  />
                  <span>Two Days</span>
                </label>
              </div>
            </div>
          )}

          {/* Pricing Information */}
          <div className="mt-8 bg-blue-50 p-4 rounded-md border border-blue-200">
            <h3 className="text-lg font-semibold mb-2">
              InfoChef Gauteng 2025 Pricing
            </h3>

            <div className="space-y-3 text-sm">
              <div>
                <p className="font-medium">1. Scholar (High School)</p>
                <p>R110.00 per day</p>
              </div>

              <div>
                <p className="font-medium">
                  2. Culinary and Hospitality Student
                </p>
                <ul className="list-disc ml-5">
                  <li>R110.00 per day (SA Chefs member rate)</li>
                  <li>R150.00 per day (non-member rate)</li>
                  <li>R200.00 for two days (SA Chefs member rate)</li>
                  <li>R250.00 for two days (non-member rate)</li>
                </ul>
              </div>

              <div>
                <p className="font-medium">3. General Admission</p>
                <ul className="list-disc ml-5">
                  <li>R110.00 per day (SA Chefs member rate)</li>
                  <li>R150.00 per day (non-member rate)</li>
                  <li>R200.00 for two days (SA Chefs member rate)</li>
                  <li>R250.00 for two days (non-member rate)</li>
                </ul>
              </div>

              <div className="pt-2 border-t border-blue-200">
                <p className="font-medium">Entry Fee Includes:</p>
                <ul className="list-disc ml-5">
                  <li>Goodie bag</li>
                  <li>Lunch pack</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Order Summary */}
        {attendeeType && (
          <div className="border rounded-lg p-6 bg-blue-50 shadow-sm">
            <h2 className="text-xl font-bold mb-4">Order Summary</h2>
            <div className="flex justify-between items-center text-lg">
              <span>
                {attendeeType === "scholar"
                  ? "High School Scholar"
                  : attendeeType === "student"
                  ? "Culinary Student"
                  : "General Admission"}
                {" - "}
                {numberOfDays === "two" ? "Two Days" : "One Day"}
                {(attendeeType === "student" || attendeeType === "general") &&
                  (isMember ? " (Member)" : " (Non-member)")}
              </span>
              <span className="font-bold">R{totalPrice.toFixed(2)}</span>
            </div>
            <p className="text-sm text-gray-600 mt-2">
              Includes goodie bag and lunch pack.
            </p>
          </div>
        )}

        {/* Submit Button */}
        <div className="flex justify-center">
          <button
            type="submit"
            className="bg-blue-600 text-white py-3 px-8 rounded-md hover:bg-blue-700 text-lg font-medium disabled:bg-gray-400"
            disabled={!attendeeType}
          >
            Submit Registration
          </button>
        </div>
      </form>
    </div>
  );
}
