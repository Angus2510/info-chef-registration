"use client";

import { useState } from "react";
import Submit from "@/components/submit/page";

export default function BoothRegistration() {
  // State for form fields

  const [exhibitorSize, setExhibitorSize] = useState<
    "2sqm" | "4sqm" | "6sqm" | ""
  >("");
  const [educationOption, setEducationOption] = useState<string>("");
  const [industryOption, setIndustryOption] = useState<string>("");

  // Company details states
  const [companyName, setCompanyName] = useState<string>("");
  const [companyAddress, setCompanyAddress] = useState<string>("");
  const [companyEmail, setCompanyEmail] = useState<string>("");
  const [companyContactNumber, setCompanyContactNumber] = useState<string>("");
  const [companyVAT, setCompanyVAT] = useState<string>("");
  const [companyContactPerson, setCompanyContactPerson] = useState<string>("");

  // Price calculation function
  const calculatePriceBeforeVAT = (): number => {
    let price = 0;

    // Main Exhibition Hall prices
    if (exhibitorSize === "6sqm") price = 12000;
    if (exhibitorSize === "4sqm") price = 10000;
    if (exhibitorSize === "2sqm") price = 6000;

    // Education Lane prices
    if (educationOption === "member_one_day") price = 4000;
    if (educationOption === "member_two_days") price = 7000;
    if (educationOption === "non_member_one_day") price = 5000;
    if (educationOption === "non_member_two_days") price = 9000;

    // Industry Way prices
    if (industryOption === "industry_two_days") price = 7000;

    return price;
  };

  // Calculate prices
  const priceBeforeVAT = calculatePriceBeforeVAT();
  const vatAmount = priceBeforeVAT * 0.15;
  const totalPrice = priceBeforeVAT + vatAmount;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted", {
      exhibitorSize: exhibitorSize === "" ? undefined : exhibitorSize,
      educationOption,
      industryOption,
      companyName,
      companyAddress,
      companyEmail,
      companyContactNumber,
      companyVAT,
      companyContactPerson,
      priceBeforeVAT,
      vatAmount,
      totalPrice,
    });
    alert("Registration submitted successfully!");
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="border rounded-lg p-6 bg-gray-50">
          <h2 className="text-xl font-bold mb-4">Select Exhibition Space</h2>

          {/* Main Exhibition Hall */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3">
              🏛️ Main Exhibition Hall – Shell Packages
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              All packages include:
              <br />
              • Octanorm shell scheme (white walls, aluminium frame)
              <br />
              • Fascia board with your company name (2 if corner stand)
              <br />
              • Carpet, 1 x 15 amp plug point, 1 x fluorescent light
              <br />
              • Table with black tablecloth, 2 chairs
              <br />• SA Chefs Cocktail tickets (valued at R550 each)
            </p>

            <div className="grid gap-3">
              {[
                { size: "6sqm", price: "12,000.00", tickets: 2 },
                { size: "4sqm", price: "10,000.00", tickets: 1 },
                { size: "2sqm", price: "6,000.00", tickets: 1 },
              ].map((option) => (
                <div
                  key={option.size}
                  className="bg-white p-4 rounded-md border"
                >
                  <label className="flex items-start">
                    <input
                      type="checkbox"
                      name="exhibitorSize"
                      value={option.size}
                      className="mt-1 mr-3"
                      onChange={() =>
                        setExhibitorSize(
                          option.size as "2sqm" | "4sqm" | "6sqm"
                        )
                      }
                    />
                    <div>
                      <p className="font-medium">{option.size}</p>
                      <p className="text-green-700 font-medium">
                        R{option.price}
                      </p>
                      <p className="text-gray-600 text-sm">
                        Includes {option.tickets} cocktail ticket
                        {option.tickets > 1 ? "s" : ""}
                      </p>
                    </div>
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Education Lane */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3">
              🎓 Village of Opportunity – Education Lane
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              For training providers
              <br />
              Includes: 2 tables, black tablecloths, 2 chairs
            </p>

            <div className="space-y-3">
              <div className="bg-white p-4 rounded-md border">
                <h4 className="font-medium mb-2">
                  Registered Training Provider Members
                </h4>
                <div className="space-y-2 ml-4">
                  <label className="flex items-start">
                    <input
                      type="checkbox"
                      name="educationOption"
                      value="member_one_day"
                      className="mt-1 mr-3"
                      onChange={() => setEducationOption("member_one_day")}
                    />
                    <div>
                      <p className="font-medium">One Day</p>
                      <p className="text-green-700 font-medium">R4,000.00</p>
                    </div>
                  </label>
                  <label className="flex items-start">
                    <input
                      type="checkbox"
                      name="educationOption"
                      value="member_two_days"
                      className="mt-1 mr-3"
                      onChange={() => setEducationOption("member_two_days")}
                    />
                    <div>
                      <p className="font-medium">Two Days</p>
                      <p className="text-green-700 font-medium">R7,000.00</p>
                      <p className="text-gray-600 text-sm">
                        Includes 2 x Cocktail tickets
                      </p>
                    </div>
                  </label>
                </div>
              </div>

              <div className="bg-white p-4 rounded-md border">
                <h4 className="font-medium mb-2">Non-Members</h4>
                <div className="space-y-2 ml-4">
                  <label className="flex items-start">
                    <input
                      type="checkbox"
                      name="educationOption"
                      value="non_member_one_day"
                      className="mt-1 mr-3"
                      onChange={() => setEducationOption("non_member_one_day")}
                    />
                    <div>
                      <p className="font-medium">One Day</p>
                      <p className="text-green-700 font-medium">R5,000.00</p>
                    </div>
                  </label>
                  <label className="flex items-start">
                    <input
                      type="checkbox"
                      name="educationOption"
                      value="non_member_two_days"
                      className="mt-1 mr-3"
                      onChange={() => setEducationOption("non_member_two_days")}
                    />
                    <div>
                      <p className="font-medium">Two Days</p>
                      <p className="text-green-700 font-medium">R9,000.00</p>
                      <p className="text-gray-600 text-sm">
                        Includes 2 x Cocktail tickets
                      </p>
                    </div>
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Industry Way */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3">
              💼 Village of Opportunity – Industry Way
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              For: Financial Institutions, Insurance Companies, Medical Aids,
              Workplaces, Recruitment Agencies
              <br />
              Includes: 2 tables, black tablecloths, 2 chairs
            </p>

            <div className="bg-white p-4 rounded-md border">
              <label className="flex items-start">
                <input
                  type="checkbox"
                  name="industryOption"
                  value="industry_two_days"
                  className="mt-1 mr-3"
                  onChange={() => setIndustryOption("industry_two_days")}
                />
                <div>
                  <p className="font-medium">Two Days</p>
                  <p className="text-green-700 font-medium">R7,000.00</p>
                  <p className="text-gray-600 text-sm">
                    Includes 2 x Cocktail tickets
                  </p>
                </div>
              </label>
            </div>
          </div>

          <p className="text-sm text-gray-600 mt-4">
            All exhibition prices exclude VAT
          </p>
        </div>

        {/* Company Details */}
        <div className="border rounded-lg p-6 bg-gray-50">
          <h2 className="text-xl font-bold mb-4">Company Invoicing Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="companyName"
                className="block text-sm font-medium mb-1"
              >
                Company Name
              </label>
              <input
                type="text"
                id="companyName"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                className="w-full p-2 border rounded-md"
                required
              />
            </div>

            <div>
              <label
                htmlFor="companyEmail"
                className="block text-sm font-medium mb-1"
              >
                Company Email
              </label>
              <input
                type="email"
                id="companyEmail"
                value={companyEmail}
                onChange={(e) => setCompanyEmail(e.target.value)}
                className="w-full p-2 border rounded-md"
                required
              />
            </div>

            <div>
              <label
                htmlFor="companyContact"
                className="block text-sm font-medium mb-1"
              >
                Company Contact Number
              </label>
              <input
                type="tel"
                id="companyContact"
                value={companyContactNumber}
                onChange={(e) => setCompanyContactNumber(e.target.value)}
                className="w-full p-2 border rounded-md"
                required
              />
            </div>

            <div>
              <label
                htmlFor="companyVAT"
                className="block text-sm font-medium mb-1"
              >
                Company VAT Number
              </label>
              <input
                type="text"
                id="companyVAT"
                value={companyVAT}
                onChange={(e) => setCompanyVAT(e.target.value)}
                className="w-full p-2 border rounded-md"
                required
              />
            </div>

            <div className="md:col-span-2">
              <label
                htmlFor="companyAddress"
                className="block text-sm font-medium mb-1"
              >
                Company Address
              </label>
              <textarea
                id="companyAddress"
                value={companyAddress}
                onChange={(e) => setCompanyAddress(e.target.value)}
                className="w-full p-2 border rounded-md"
                rows={3}
                required
              />
            </div>

            <div className="md:col-span-2">
              <label
                htmlFor="contactPerson"
                className="block text-sm font-medium mb-1"
              >
                Contact Person (Name and Surname)
              </label>
              <input
                type="text"
                id="contactPerson"
                value={companyContactPerson}
                onChange={(e) => setCompanyContactPerson(e.target.value)}
                className="w-full p-2 border rounded-md"
                required
              />
            </div>
          </div>
        </div>

        {/* Price Summary */}
        {priceBeforeVAT > 0 && (
          <div className="border rounded-lg p-6 bg-gray-50">
            <h2 className="text-xl font-bold mb-4">Price Summary</h2>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Price (excl. VAT):</span>
                <span className="font-medium">
                  R{priceBeforeVAT.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>VAT (15%):</span>
                <span>R{vatAmount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-bold text-lg border-t pt-2 mt-2">
                <span>Total Price (incl. VAT):</span>
                <span>R{totalPrice.toFixed(2)}</span>
              </div>
            </div>
          </div>
        )}

        <div className="flex justify-center">
          <Submit
            formData={{
              exhibitorSize,
              educationOption,
              industryOption,
              companyName,
              companyAddress,
              companyEmail,
              companyContactNumber,
              companyVAT,
              companyContactPerson,
              priceBeforeVAT,
              vatAmount,
              totalPrice,
            }}
            totalPrice={totalPrice}
            formType="booth"
          />
        </div>
      </form>
    </div>
  );
}
