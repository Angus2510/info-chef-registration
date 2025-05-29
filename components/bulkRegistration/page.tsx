"use client";

import { useState, useEffect } from "react";

export default function BulkRegistration() {
  // State for organization type selection
  const [organizationType, setOrganizationType] = useState<string>("");

  // State for form fields
  const [schoolName, setSchoolName] = useState<string>("");
  const [contactPersonName, setContactPersonName] = useState<string>("");
  const [contactPersonEmail, setContactPersonEmail] = useState<string>("");
  const [contactPersonPhone, setContactPersonPhone] = useState<string>("");
  const [numberOfAttendees, setNumberOfAttendees] = useState<number>(0);
  const [isMember, setIsMember] = useState<boolean>(false);
  const [numberOfDays, setNumberOfDays] = useState<"one" | "two">("one");

  // State for total calculation
  const [totalCost, setTotalCost] = useState<number>(0);

  // Calculate total cost when relevant fields change
  useEffect(() => {
    if (numberOfAttendees <= 0) {
      setTotalCost(0);
      return;
    }

    let pricePerPerson = 0;

    if (organizationType === "highschool") {
      pricePerPerson = 110; // R110 per day for high school students

      if (numberOfDays === "two") {
        pricePerPerson = pricePerPerson * 2; // Double for two days
      }
    } else if (
      organizationType === "culinary" ||
      organizationType === "company"
    ) {
      if (isMember) {
        pricePerPerson = numberOfDays === "one" ? 110 : 200; // Member rates
      } else {
        pricePerPerson = numberOfDays === "one" ? 150 : 250; // Non-member rates
      }
    }

    setTotalCost(pricePerPerson * numberOfAttendees);
  }, [organizationType, numberOfAttendees, isMember, numberOfDays]);

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted", {
      organizationType,
      schoolName,
      contactPersonName,
      contactPersonEmail,
      contactPersonPhone,
      numberOfAttendees,
      isMember,
      numberOfDays,
      totalCost,
    });
    alert("Bulk registration submitted successfully!");
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Organization Type Selection */}
        <div className="border rounded-lg p-6 bg-gray-50">
          <h2 className="text-xl font-bold mb-4">Select Organization Type</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-white p-4 rounded-md border">
              <label className="flex items-start">
                <input
                  type="radio"
                  name="organizationType"
                  value="highschool"
                  className="mt-1 mr-3"
                  onChange={() => setOrganizationType("highschool")}
                  required
                />
                <div>
                  <p className="font-medium">High School</p>
                  <p className="text-green-700 font-medium">R110.00 per day</p>
                  <p className="text-gray-600 text-sm">
                    For high school scholars
                  </p>
                </div>
              </label>
            </div>

            <div className="bg-white p-4 rounded-md border">
              <label className="flex items-start">
                <input
                  type="radio"
                  name="organizationType"
                  value="culinary"
                  className="mt-1 mr-3"
                  onChange={() => setOrganizationType("culinary")}
                />
                <div>
                  <p className="font-medium">Culinary School</p>
                  <p className="text-gray-600 text-sm">
                    For culinary and hospitality students
                  </p>
                </div>
              </label>
            </div>

            <div className="bg-white p-4 rounded-md border">
              <label className="flex items-start">
                <input
                  type="radio"
                  name="organizationType"
                  value="company"
                  className="mt-1 mr-3"
                  onChange={() => setOrganizationType("company")}
                />
                <div>
                  <p className="font-medium">Company</p>
                  <p className="text-gray-600 text-sm">
                    For professionals and general admission
                  </p>
                </div>
              </label>
            </div>
          </div>

          {/* Pricing Information - Shows after selection */}
          {organizationType && (
            <div className="mt-6 bg-blue-50 p-4 rounded-md border border-blue-200">
              <h3 className="text-lg font-semibold mb-2">
                Pricing Information
              </h3>

              {organizationType === "highschool" && (
                <div className="text-sm">
                  <p className="font-medium">Scholar (High School)</p>
                  <p>R110.00 per person, per day</p>
                </div>
              )}

              {(organizationType === "culinary" ||
                organizationType === "company") && (
                <div className="text-sm">
                  <p className="font-medium">
                    {organizationType === "culinary"
                      ? "Culinary and Hospitality Student"
                      : "General Admission"}
                  </p>
                  <ul className="list-disc ml-5 mt-1">
                    <li>R110.00 per day (SA Chefs member rate)</li>
                    <li>R150.00 per day (non-member rate)</li>
                    <li>R200.00 for two days (SA Chefs member rate)</li>
                    <li>R250.00 for two days (non-member rate)</li>
                  </ul>
                </div>
              )}

              <div className="mt-3 pt-3 border-t border-blue-200">
                <p className="font-medium">Entry Fee Includes:</p>
                <ul className="list-disc ml-5 mt-1 text-sm">
                  <li>Goodie bag</li>
                  <li>Lunch pack</li>
                </ul>
              </div>
            </div>
          )}
        </div>

        {/* Organization Details - Only shown after organization type is selected */}
        {organizationType && (
          <div className="border rounded-lg p-6 bg-gray-50">
            <h2 className="text-xl font-bold mb-4">Organization Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label
                  htmlFor="schoolName"
                  className="block text-sm font-medium mb-1"
                >
                  {organizationType === "company"
                    ? "Company Name"
                    : "School Name"}
                </label>
                <input
                  type="text"
                  id="schoolName"
                  value={schoolName}
                  onChange={(e) => setSchoolName(e.target.value)}
                  className="w-full p-2 border rounded-md"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="contactPersonName"
                  className="block text-sm font-medium mb-1"
                >
                  Contact Person Name
                </label>
                <input
                  type="text"
                  id="contactPersonName"
                  value={contactPersonName}
                  onChange={(e) => setContactPersonName(e.target.value)}
                  className="w-full p-2 border rounded-md"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="contactPersonEmail"
                  className="block text-sm font-medium mb-1"
                >
                  Contact Email
                </label>
                <input
                  type="email"
                  id="contactPersonEmail"
                  value={contactPersonEmail}
                  onChange={(e) => setContactPersonEmail(e.target.value)}
                  className="w-full p-2 border rounded-md"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="contactPersonPhone"
                  className="block text-sm font-medium mb-1"
                >
                  Contact Phone
                </label>
                <input
                  type="tel"
                  id="contactPersonPhone"
                  value={contactPersonPhone}
                  onChange={(e) => setContactPersonPhone(e.target.value)}
                  className="w-full p-2 border rounded-md"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="numberOfAttendees"
                  className="block text-sm font-medium mb-1"
                >
                  Number of Attendees
                </label>
                <input
                  type="number"
                  id="numberOfAttendees"
                  min="1"
                  value={numberOfAttendees}
                  onChange={(e) =>
                    setNumberOfAttendees(parseInt(e.target.value) || 0)
                  }
                  className="w-full p-2 border rounded-md"
                  required
                />
              </div>
            </div>
          </div>
        )}

        {/* Attendance Options - Only shown for culinary and company groups */}
        {(organizationType === "culinary" ||
          organizationType === "company") && (
          <div className="border rounded-lg p-6 bg-gray-50">
            <h2 className="text-xl font-bold mb-4">Attendance Options</h2>

            <div className="mb-4">
              <p className="block text-sm font-medium mb-2">
                SA Chefs Association Membership Status
              </p>
              <div className="flex gap-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="membershipStatus"
                    checked={isMember}
                    onChange={() => setIsMember(true)}
                    className="mr-2"
                  />
                  <span>Member</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="membershipStatus"
                    checked={!isMember}
                    onChange={() => setIsMember(false)}
                    className="mr-2"
                  />
                  <span>Non-member</span>
                </label>
              </div>
            </div>

            <div>
              <p className="block text-sm font-medium mb-2">Number of Days</p>
              <div className="flex gap-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="days"
                    checked={numberOfDays === "one"}
                    onChange={() => setNumberOfDays("one")}
                    className="mr-2"
                  />
                  <span>One Day</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="days"
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

        {/* Order Summary - Only shown when attendees are selected */}
        {numberOfAttendees > 0 && (
          <div className="border rounded-lg p-6 bg-blue-50 shadow-sm">
            <h2 className="text-xl font-bold mb-4">Order Summary</h2>
            <div className="flex justify-between items-center text-lg">
              <span>
                {numberOfAttendees}{" "}
                {numberOfAttendees === 1 ? "attendee" : "attendees"} ×{" "}
                {numberOfDays === "two" ? "two days" : "one day"}
              </span>
              <span className="font-bold">R{totalCost.toFixed(2)}</span>
            </div>
            <p className="text-sm text-gray-600 mt-2">
              Includes goodie bag and lunch pack for each attendee.
            </p>
          </div>
        )}

        {/* Submit Button */}
        <div className="flex justify-center">
          <button
            type="submit"
            className="bg-blue-600 text-white py-3 px-8 rounded-md hover:bg-blue-700 text-lg font-medium disabled:bg-gray-400"
            disabled={!organizationType || numberOfAttendees <= 0}
          >
            Submit Registration
          </button>
        </div>
      </form>
    </div>
  );
}
