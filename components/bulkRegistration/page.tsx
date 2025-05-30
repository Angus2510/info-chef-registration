"use client";

import { useState, useEffect } from "react";

export default function BulkRegistration() {
  // State for organization type selection
  const [organizationType, setOrganizationType] = useState<string>("");

  // State for form fields
  const [schoolName, setSchoolName] = useState<string>("");
  const [vatNumber, setVatNumber] = useState<string>(""); // Added VAT number state
  const [contactPersonName, setContactPersonName] = useState<string>("");
  const [contactPersonEmail, setContactPersonEmail] = useState<string>("");
  const [contactPersonPhone, setContactPersonPhone] = useState<string>("");

  const [selectedDate, setSelectedDate] = useState<string>("");

  // Member and non-member states
  const [memberStudents, setMemberStudents] = useState<number>(0);
  const [nonMemberStudents, setNonMemberStudents] = useState<number>(0);
  const [memberTeachers, setMemberTeachers] = useState<number>(0);
  const [nonMemberTeachers, setNonMemberTeachers] = useState<number>(0);

  const [numberOfDays, setNumberOfDays] = useState<"one" | "two">("one");
  const [totalCost, setTotalCost] = useState<number>(0);

  useEffect(() => {
    let totalCost = 0;

    if (organizationType === "highschool") {
      const studentCost = 110 * memberStudents;
      const teacherCost = 150 * memberTeachers;
      totalCost =
        (studentCost + teacherCost) * (numberOfDays === "two" ? 2 : 1);
    } else if (organizationType === "culinary") {
      // Member students
      const memberStudentCost =
        memberStudents * (numberOfDays === "one" ? 110 : 200);
      // Non-member students
      const nonMemberStudentCost =
        nonMemberStudents * (numberOfDays === "one" ? 150 : 250);
      // Member teachers
      const memberTeacherCost =
        memberTeachers * (numberOfDays === "one" ? 150 : 250);
      // Non-member teachers
      const nonMemberTeacherCost =
        nonMemberTeachers * (numberOfDays === "one" ? 200 : 300);

      totalCost =
        memberStudentCost +
        nonMemberStudentCost +
        memberTeacherCost +
        nonMemberTeacherCost;
    } else if (organizationType === "company") {
      const memberCost = memberStudents * (numberOfDays === "one" ? 110 : 200);
      const nonMemberCost =
        nonMemberStudents * (numberOfDays === "one" ? 150 : 250);
      totalCost = memberCost + nonMemberCost;
    }

    setTotalCost(totalCost);
  }, [
    organizationType,
    memberStudents,
    nonMemberStudents,
    memberTeachers,
    nonMemberTeachers,
    numberOfDays,
  ]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate date selection for one day option
    if (numberOfDays === "one" && !selectedDate) {
      alert("Please select a date");
      return;
    }

    console.log("Form submitted", {
      organizationType,
      schoolName,
      vatNumber,
      contactPersonName,
      contactPersonEmail,
      contactPersonPhone,
      memberStudents,
      nonMemberStudents,
      memberTeachers,
      nonMemberTeachers,
      numberOfDays,
      selectedDate:
        numberOfDays === "one" ? `${selectedDate} May 2025` : "Both days",
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

          {/* Pricing Information */}
          {organizationType && (
            <div className="mt-6 bg-blue-50 p-4 rounded-md border border-blue-200">
              <h3 className="text-lg font-semibold mb-2">
                Pricing Information
              </h3>

              {organizationType === "highschool" && (
                <div className="text-sm">
                  <p className="font-medium">Scholar (High School)</p>
                  <p>R110.00 per person, per day</p>
                  <p className="font-medium">Teachers</p>
                  <p>R150.00 per person, per day</p>
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
                  {organizationType === "culinary" && (
                    <>
                      <p className="font-medium mt-2">Supervisors/Teachers</p>
                      <ul className="list-disc ml-5 mt-1">
                        <li>R150.00 per day (SA Chefs member rate)</li>
                        <li>R200.00 per day (non-member rate)</li>
                        <li>R250.00 for two days (SA Chefs member rate)</li>
                        <li>R300.00 for two days (non-member rate)</li>
                      </ul>
                    </>
                  )}
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

        {/* Organization Details */}
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

              {organizationType === "company" && (
                <div className="md:col-span-2">
                  <label
                    htmlFor="vatNumber"
                    className="block text-sm font-medium mb-1"
                  >
                    VAT Number
                  </label>
                  <input
                    type="text"
                    id="vatNumber"
                    value={vatNumber}
                    onChange={(e) => setVatNumber(e.target.value)}
                    className="w-full p-2 border rounded-md"
                    required
                  />
                </div>
              )}

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

              {organizationType === "highschool" ? (
                <>
                  <div>
                    <label
                      htmlFor="memberStudents"
                      className="block text-sm font-medium mb-1"
                    >
                      Number of Scholars attending
                    </label>
                    <input
                      type="number"
                      id="memberStudents"
                      min="0"
                      value={memberStudents}
                      onChange={(e) =>
                        setMemberStudents(parseInt(e.target.value) || 0)
                      }
                      className="w-full p-2 border rounded-md"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="memberTeachers"
                      className="block text-sm font-medium mb-1"
                    >
                      Number of Teachers/Staff Members attending
                    </label>
                    <input
                      type="number"
                      id="memberTeachers"
                      min="0"
                      value={memberTeachers}
                      onChange={(e) =>
                        setMemberTeachers(parseInt(e.target.value) || 0)
                      }
                      className="w-full p-2 border rounded-md"
                    />
                  </div>
                </>
              ) : organizationType === "culinary" ? (
                <>
                  <div>
                    <label
                      htmlFor="memberStudents"
                      className="block text-sm font-medium mb-1"
                    >
                      Number of Students attending (SA Chefs member)
                    </label>
                    <input
                      type="number"
                      id="memberStudents"
                      min="0"
                      value={memberStudents}
                      onChange={(e) =>
                        setMemberStudents(parseInt(e.target.value) || 0)
                      }
                      className="w-full p-2 border rounded-md"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="nonMemberStudents"
                      className="block text-sm font-medium mb-1"
                    >
                      Number of Students attending (non-member)
                    </label>
                    <input
                      type="number"
                      id="nonMemberStudents"
                      min="0"
                      value={nonMemberStudents}
                      onChange={(e) =>
                        setNonMemberStudents(parseInt(e.target.value) || 0)
                      }
                      className="w-full p-2 border rounded-md"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="memberTeachers"
                      className="block text-sm font-medium mb-1"
                    >
                      Number of Staff attending (SA Chefs member)
                    </label>
                    <input
                      type="number"
                      id="memberTeachers"
                      min="0"
                      value={memberTeachers}
                      onChange={(e) =>
                        setMemberTeachers(parseInt(e.target.value) || 0)
                      }
                      className="w-full p-2 border rounded-md"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="nonMemberTeachers"
                      className="block text-sm font-medium mb-1"
                    >
                      Number of Staff attending (non-member)
                    </label>
                    <input
                      type="number"
                      id="nonMemberTeachers"
                      min="0"
                      value={nonMemberTeachers}
                      onChange={(e) =>
                        setNonMemberTeachers(parseInt(e.target.value) || 0)
                      }
                      className="w-full p-2 border rounded-md"
                    />
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <label
                      htmlFor="memberStudents"
                      className="block text-sm font-medium mb-1"
                    >
                      Number of attendees (SA Chefs Member)
                    </label>
                    <input
                      type="number"
                      id="memberStudents"
                      min="0"
                      value={memberStudents}
                      onChange={(e) =>
                        setMemberStudents(parseInt(e.target.value) || 0)
                      }
                      className="w-full p-2 border rounded-md"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="nonMemberStudents"
                      className="block text-sm font-medium mb-1"
                    >
                      Number of attendees (non-member)
                    </label>
                    <input
                      type="number"
                      id="nonMemberStudents"
                      min="0"
                      value={nonMemberStudents}
                      onChange={(e) =>
                        setNonMemberStudents(parseInt(e.target.value) || 0)
                      }
                      className="w-full p-2 border rounded-md"
                    />
                  </div>
                </>
              )}
            </div>
          </div>
        )}

        {/* Number of Days Selection */}
        {organizationType && (
          <div className="border rounded-lg p-6 bg-gray-50">
            <h2 className="text-xl font-bold mb-4">Attendance Options</h2>
            <div className="space-y-4">
              <div>
                <p className="block text-sm font-medium mb-2">Number of Days</p>
                <div className="flex gap-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="days"
                      checked={numberOfDays === "one"}
                      onChange={() => {
                        setNumberOfDays("one");
                        setSelectedDate("");
                      }}
                      className="mr-2"
                    />
                    <span>One Day</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="days"
                      checked={numberOfDays === "two"}
                      onChange={() => {
                        setNumberOfDays("two");
                        setSelectedDate("");
                      }}
                      className="mr-2"
                    />
                    <span>Two Days</span>
                  </label>
                </div>
              </div>

              {/* Date Selection for One Day Option */}
              {numberOfDays === "one" && (
                <div>
                  <p className="block text-sm font-medium mb-2">Select Date</p>
                  <div className="flex gap-4">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="date"
                        value="29"
                        checked={selectedDate === "29"}
                        onChange={(e) => setSelectedDate(e.target.value)}
                        className="mr-2"
                        required
                      />
                      <span>29 May 2025</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="date"
                        value="30"
                        checked={selectedDate === "30"}
                        onChange={(e) => setSelectedDate(e.target.value)}
                        className="mr-2"
                        required
                      />
                      <span>30 May 2025</span>
                    </label>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Order Summary */}
        {(memberStudents > 0 ||
          nonMemberStudents > 0 ||
          memberTeachers > 0 ||
          nonMemberTeachers > 0) && (
          <div className="border rounded-lg p-6 bg-blue-50 shadow-sm">
            <h2 className="text-xl font-bold mb-4">Order Summary</h2>
            <div className="space-y-2">
              {memberStudents > 0 && (
                <div className="flex justify-between items-center">
                  <span>
                    {memberStudents}{" "}
                    {organizationType === "highschool"
                      ? "Scholar"
                      : organizationType === "culinary"
                      ? "Student (SA Chefs member)"
                      : "Attendee (SA Chefs member)"}
                    {memberStudents !== 1 && "s"}
                  </span>
                  <span className="font-medium">
                    R
                    {(
                      memberStudents * (numberOfDays === "one" ? 110 : 200)
                    ).toFixed(2)}
                  </span>
                </div>
              )}

              {nonMemberStudents > 0 && (
                <div className="flex justify-between items-center">
                  <span>
                    {nonMemberStudents}{" "}
                    {organizationType === "culinary"
                      ? "Student (non-member)"
                      : "Attendee (non-member)"}
                    {nonMemberStudents !== 1 && "s"}
                  </span>
                  <span className="font-medium">
                    R
                    {(
                      nonMemberStudents * (numberOfDays === "one" ? 150 : 250)
                    ).toFixed(2)}
                  </span>
                </div>
              )}

              {memberTeachers > 0 && (
                <div className="flex justify-between items-center">
                  <span>
                    {memberTeachers}{" "}
                    {organizationType === "highschool"
                      ? "Teacher/Staff Member"
                      : "Staff (SA Chefs member)"}
                    {memberTeachers !== 1 && "s"}
                  </span>
                  <span className="font-medium">
                    R
                    {(
                      memberTeachers * (numberOfDays === "one" ? 150 : 250)
                    ).toFixed(2)}
                  </span>
                </div>
              )}

              {nonMemberTeachers > 0 && (
                <div className="flex justify-between items-center">
                  <span>
                    {nonMemberTeachers}{" "}
                    {organizationType === "highschool"
                      ? "Teacher/Staff Member"
                      : "Staff (non-member)"}
                    {nonMemberTeachers !== 1 && "s"}
                  </span>
                  <span className="font-medium">
                    R
                    {(
                      nonMemberTeachers * (numberOfDays === "one" ? 200 : 300)
                    ).toFixed(2)}
                  </span>
                </div>
              )}

              <div className="flex justify-between items-center pt-2 border-t border-blue-200 text-lg">
                <span>
                  Total (
                  {numberOfDays === "two"
                    ? "two days"
                    : selectedDate
                    ? `${selectedDate} May 2025`
                    : "one day"}
                  )
                </span>
                <span className="font-bold">R{totalCost.toFixed(2)}</span>
              </div>
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
            disabled={
              !organizationType ||
              (memberStudents <= 0 &&
                nonMemberStudents <= 0 &&
                memberTeachers <= 0 &&
                nonMemberTeachers <= 0)
            }
          >
            Submit Registration
          </button>
        </div>
      </form>
    </div>
  );
}
