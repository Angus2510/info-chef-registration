"use client";

import { useState } from "react";

// type BoothOption = {
//   id: string;
//   name: string;
//   price: string;
//   description: string;
// };

export default function BoothRegistration() {
  // State for form fields
  const [boothType, setBoothType] = useState<string>("");
  const [exhibitorSize, setExhibitorSize] = useState<string>("");
  const [partnerTier, setPartnerTier] = useState<string>("");
  const [educationOption, setEducationOption] = useState<string>("");
  const [industryOption, setIndustryOption] = useState<string>("");
  const [brandingOption, setBrandingOption] = useState<string>("");

  // Company details
  const [companyName, setCompanyName] = useState<string>("");
  const [companyAddress, setCompanyAddress] = useState<string>("");
  const [companyEmail, setCompanyEmail] = useState<string>("");
  const [companyContactNumber, setCompanyContactNumber] = useState<string>("");
  const [companyVAT, setCompanyVAT] = useState<string>("");
  const [companyContactPerson, setCompanyContactPerson] = useState<string>("");

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Handle form submission (API call, etc)
    console.log("Form submitted", {
      boothType,
      exhibitorSize,
      partnerTier,
      educationOption,
      industryOption,
      brandingOption,
      companyName,
      companyAddress,
      companyEmail,
      companyContactNumber,
      companyVAT,
      companyContactPerson,
    });
    alert("Registration submitted successfully!");
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Booth Type Selection */}
        <div className="border rounded-lg p-6 bg-gray-50">
          <h2 className="text-xl font-bold mb-4">Select Booth Type</h2>

          {/* Cocktail Sponsorship */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3">Cocktail Sponsorship</h3>
            <div className="bg-white p-4 rounded-md border mb-3">
              <label className="flex items-start">
                <input
                  type="radio"
                  name="boothType"
                  value="cocktail_sponsorship"
                  className="mt-1 mr-3"
                  onChange={() => setBoothType("cocktail_sponsorship")}
                />
                <div>
                  <p className="font-medium">Cocktail Area Sponsorship</p>
                  <p className="text-green-700 font-medium">R80,000.00</p>
                  <p className="text-gray-600 text-sm">
                    Includes branding valued at approx. R210,000
                  </p>
                </div>
              </label>
            </div>
          </div>

          {/* Exhibitor Opportunities */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3">
              Exhibitor Opportunities – Main Exhibition Hall
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              All packages include: Octanorm Shell Scheme (white walls,
              aluminium finish), Fascia board with company name, Carpet, 1 x 15
              amp plug point, 1 x Fluorescent light, Table with black tablecloth
              and 2 chairs, SA Chefs Cocktail tickets
            </p>

            <div className="grid gap-3">
              <div className="bg-white p-4 rounded-md border">
                <label className="flex items-start">
                  <input
                    type="radio"
                    name="exhibitorSize"
                    value="9sqm"
                    className="mt-1 mr-3"
                    onChange={() => setExhibitorSize("9sqm")}
                  />
                  <div>
                    <p className="font-medium">9 sqm</p>
                    <p className="text-green-700 font-medium">
                      R15,000.00 (2 Days)
                    </p>
                    <p className="text-gray-600 text-sm">
                      Includes 2 cocktail tickets
                    </p>
                  </div>
                </label>
              </div>

              <div className="bg-white p-4 rounded-md border">
                <label className="flex items-start">
                  <input
                    type="radio"
                    name="exhibitorSize"
                    value="6sqm"
                    className="mt-1 mr-3"
                    onChange={() => setExhibitorSize("6sqm")}
                  />
                  <div>
                    <p className="font-medium">6 sqm</p>
                    <p className="text-green-700 font-medium">
                      R12,000.00 (2 Days)
                    </p>
                    <p className="text-gray-600 text-sm">
                      Includes 2 cocktail tickets
                    </p>
                  </div>
                </label>
              </div>

              <div className="bg-white p-4 rounded-md border">
                <label className="flex items-start">
                  <input
                    type="radio"
                    name="exhibitorSize"
                    value="4sqm"
                    className="mt-1 mr-3"
                    onChange={() => setExhibitorSize("4sqm")}
                  />
                  <div>
                    <p className="font-medium">4 sqm</p>
                    <p className="text-green-700 font-medium">
                      R10,000.00 (2 Days)
                    </p>
                    <p className="text-gray-600 text-sm">
                      Includes 1 cocktail ticket
                    </p>
                  </div>
                </label>
              </div>

              <div className="bg-white p-4 rounded-md border">
                <label className="flex items-start">
                  <input
                    type="radio"
                    name="exhibitorSize"
                    value="2sqm"
                    className="mt-1 mr-3"
                    onChange={() => setExhibitorSize("2sqm")}
                  />
                  <div>
                    <p className="font-medium">2 sqm</p>
                    <p className="text-green-700 font-medium">
                      R6,000.00 (2 Days)
                    </p>
                    <p className="text-gray-600 text-sm">
                      Includes 1 cocktail ticket
                    </p>
                  </div>
                </label>
              </div>
            </div>
          </div>

          {/* Partner Discount Section */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3">
              Partner Discount Rates
            </h3>
            <p className="text-sm text-gray-600 mb-2">
              Applies to branding opportunities and areas
            </p>
            <div className="grid gap-3">
              <div className="bg-white p-4 rounded-md border">
                <label className="flex items-start">
                  <input
                    type="radio"
                    name="partnerTier"
                    value="premium"
                    className="mt-1 mr-3"
                    onChange={() => setPartnerTier("premium")}
                  />
                  <div>
                    <p className="font-medium">Premium</p>
                    <p className="text-gray-600 text-sm">
                      20% + FREE exhibition stand
                    </p>
                  </div>
                </label>
              </div>

              <div className="bg-white p-4 rounded-md border">
                <label className="flex items-start">
                  <input
                    type="radio"
                    name="partnerTier"
                    value="gold"
                    className="mt-1 mr-3"
                    onChange={() => setPartnerTier("gold")}
                  />
                  <div>
                    <p className="font-medium">Gold</p>
                    <p className="text-gray-600 text-sm">15% discount</p>
                  </div>
                </label>
              </div>

              <div className="bg-white p-4 rounded-md border">
                <label className="flex items-start">
                  <input
                    type="radio"
                    name="partnerTier"
                    value="silver_plus"
                    className="mt-1 mr-3"
                    onChange={() => setPartnerTier("silver_plus")}
                  />
                  <div>
                    <p className="font-medium">Silver Plus</p>
                    <p className="text-gray-600 text-sm">10% discount</p>
                  </div>
                </label>
              </div>

              <div className="bg-white p-4 rounded-md border">
                <label className="flex items-start">
                  <input
                    type="radio"
                    name="partnerTier"
                    value="silver"
                    className="mt-1 mr-3"
                    onChange={() => setPartnerTier("silver")}
                  />
                  <div>
                    <p className="font-medium">Silver</p>
                    <p className="text-gray-600 text-sm">7% discount</p>
                  </div>
                </label>
              </div>

              <div className="bg-white p-4 rounded-md border">
                <label className="flex items-start">
                  <input
                    type="radio"
                    name="partnerTier"
                    value="bronze"
                    className="mt-1 mr-3"
                    onChange={() => setPartnerTier("bronze")}
                  />
                  <div>
                    <p className="font-medium">Bronze</p>
                    <p className="text-gray-600 text-sm">5% discount</p>
                  </div>
                </label>
              </div>
            </div>
            <p className="text-sm text-gray-600 mt-2">*Prices exclude VAT</p>
          </div>

          {/* Village of Opportunity - Education Lane */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3">
              Village of Opportunity – Education Lane
            </h3>
            <p className="text-sm text-gray-600 mb-2">
              Space includes: 2 Tables with black tablecloths, 2 Chairs per
              school
            </p>

            <div className="grid gap-3">
              <div className="bg-white p-4 rounded-md border">
                <label className="flex items-start">
                  <input
                    type="radio"
                    name="educationOption"
                    value="member_one_day"
                    className="mt-1 mr-3"
                    onChange={() => setEducationOption("member_one_day")}
                  />
                  <div>
                    <p className="font-medium">
                      Registered Training Provider Member - One Day
                    </p>
                    <p className="text-green-700 font-medium">R4,000.00</p>
                  </div>
                </label>
              </div>

              <div className="bg-white p-4 rounded-md border">
                <label className="flex items-start">
                  <input
                    type="radio"
                    name="educationOption"
                    value="member_both_days"
                    className="mt-1 mr-3"
                    onChange={() => setEducationOption("member_both_days")}
                  />
                  <div>
                    <p className="font-medium">
                      Registered Training Provider Member - Both Days
                    </p>
                    <p className="text-green-700 font-medium">R7,000.00</p>
                    <p className="text-gray-600 text-sm">
                      Includes 2 x SA Chefs Cocktail tickets
                    </p>
                  </div>
                </label>
              </div>

              <div className="bg-white p-4 rounded-md border">
                <label className="flex items-start">
                  <input
                    type="radio"
                    name="educationOption"
                    value="non_member_one_day"
                    className="mt-1 mr-3"
                    onChange={() => setEducationOption("non_member_one_day")}
                  />
                  <div>
                    <p className="font-medium">Non-Member - One Day</p>
                    <p className="text-green-700 font-medium">R5,000.00</p>
                  </div>
                </label>
              </div>

              <div className="bg-white p-4 rounded-md border">
                <label className="flex items-start">
                  <input
                    type="radio"
                    name="educationOption"
                    value="non_member_both_days"
                    className="mt-1 mr-3"
                    onChange={() => setEducationOption("non_member_both_days")}
                  />
                  <div>
                    <p className="font-medium">Non-Member - Both Days</p>
                    <p className="text-green-700 font-medium">R9,000.00</p>
                    <p className="text-gray-600 text-sm">
                      Includes 2 x SA Chefs Cocktail tickets
                    </p>
                  </div>
                </label>
              </div>
            </div>
            <p className="text-sm text-gray-600 mt-2">*Prices exclude VAT</p>
          </div>

          {/* Village of Opportunity - Industry Way */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3">
              Village of Opportunity – Industry Way
            </h3>
            <p className="text-sm text-gray-600 mb-2">
              For financial institutions, insurance companies, medical aids,
              workplaces, recruitment agencies
            </p>
            <p className="text-sm text-gray-600 mb-4">
              Includes: 2 Tables with black tablecloths, 2 Chairs per school
            </p>

            <div className="bg-white p-4 rounded-md border">
              <label className="flex items-start">
                <input
                  type="radio"
                  name="industryOption"
                  value="industry_both_days"
                  className="mt-1 mr-3"
                  onChange={() => setIndustryOption("industry_both_days")}
                />
                <div>
                  <p className="font-medium">Industry Way - Both Days</p>
                  <p className="text-green-700 font-medium">R7,000.00</p>
                  <p className="text-gray-600 text-sm">
                    Includes 2 x SA Chefs Cocktail tickets
                  </p>
                </div>
              </label>
            </div>
            <p className="text-sm text-gray-600 mt-2">*Prices exclude VAT</p>
          </div>

          {/* Branding Opportunities */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3">
              Branding Opportunities
            </h3>
            <div className="grid gap-3">
              <div className="bg-white p-4 rounded-md border">
                <h4 className="font-medium mb-2">
                  Competition Pantry Sponsorship
                </h4>
                <p className="text-sm text-gray-600 mb-2">
                  Branding in a mini grocer-style pantry used in competitions
                </p>
                <div className="ml-4 space-y-2">
                  <label className="flex items-start">
                    <input
                      type="radio"
                      name="brandingOption"
                      value="pantry_exclusive"
                      className="mt-1 mr-3"
                      onChange={() => setBrandingOption("pantry_exclusive")}
                    />
                    <div>
                      <p className="font-medium">
                        Exclusive branding + 9 sqm stand
                      </p>
                      <p className="text-green-700 font-medium">R90,000.00</p>
                    </div>
                  </label>

                  <label className="flex items-start">
                    <input
                      type="radio"
                      name="brandingOption"
                      value="pantry_shared_6sqm"
                      className="mt-1 mr-3"
                      onChange={() => setBrandingOption("pantry_shared_6sqm")}
                    />
                    <div>
                      <p className="font-medium">
                        Shared branding + 6 sqm stand
                      </p>
                      <p className="text-green-700 font-medium">R45,000.00</p>
                    </div>
                  </label>

                  <label className="flex items-start">
                    <input
                      type="radio"
                      name="brandingOption"
                      value="pantry_shared_3sqm"
                      className="mt-1 mr-3"
                      onChange={() => setBrandingOption("pantry_shared_3sqm")}
                    />
                    <div>
                      <p className="font-medium">
                        Shared branding + 3 sqm stand
                      </p>
                      <p className="text-green-700 font-medium">R30,000.00</p>
                    </div>
                  </label>
                </div>
              </div>

              <div className="bg-white p-4 rounded-md border">
                <label className="flex items-start">
                  <input
                    type="radio"
                    name="brandingOption"
                    value="registration_area"
                    className="mt-1 mr-3"
                    onChange={() => setBrandingOption("registration_area")}
                  />
                  <div>
                    <p className="font-medium">Registration Area</p>
                    <p className="text-green-700 font-medium">R20,000.00</p>
                    <p className="text-gray-600 text-sm">
                      Branding at Welcome, Registration and Exit area
                    </p>
                  </div>
                </label>
              </div>

              <div className="bg-white p-4 rounded-md border">
                <label className="flex items-start">
                  <input
                    type="radio"
                    name="brandingOption"
                    value="seminar_area"
                    className="mt-1 mr-3"
                    onChange={() => setBrandingOption("seminar_area")}
                  />
                  <div>
                    <p className="font-medium">Seminar & Activation Areas</p>
                    <p className="text-green-700 font-medium">
                      R20,000.00 per venue
                    </p>
                    <p className="text-gray-600 text-sm">
                      Used for talks, seminars, product activations, and AGM (3
                      spots left)
                    </p>
                  </div>
                </label>
              </div>

              <div className="bg-white p-4 rounded-md border">
                <label className="flex items-start">
                  <input
                    type="radio"
                    name="brandingOption"
                    value="main_refreshment"
                    className="mt-1 mr-3"
                    onChange={() => setBrandingOption("main_refreshment")}
                  />
                  <div>
                    <p className="font-medium">
                      Main Refreshment & Catering Area
                    </p>
                    <p className="text-green-700 font-medium">R10,000.00</p>
                    <p className="text-gray-600 text-sm">2 spots available</p>
                  </div>
                </label>
              </div>

              <div className="bg-white p-4 rounded-md border">
                <label className="flex items-start">
                  <input
                    type="radio"
                    name="brandingOption"
                    value="popup_refreshment"
                    className="mt-1 mr-3"
                    onChange={() => setBrandingOption("popup_refreshment")}
                  />
                  <div>
                    <p className="font-medium">Pop-Up Refreshment Spots</p>
                    <p className="text-green-700 font-medium">R4,000.00</p>
                    <p className="text-gray-600 text-sm">3 spots left</p>
                  </div>
                </label>
              </div>

              <div className="bg-white p-4 rounded-md border">
                <label className="flex items-start">
                  <input
                    type="radio"
                    name="brandingOption"
                    value="lunch_pack"
                    className="mt-1 mr-3"
                    onChange={() => setBrandingOption("lunch_pack")}
                  />
                  <div>
                    <p className="font-medium">Lunch Pack & Catering Area</p>
                    <p className="text-green-700 font-medium">R55,000.00</p>
                    <p className="text-gray-600 text-sm">
                      Full sponsorship & branding of the scholar lunch pack area
                      and café
                    </p>
                  </div>
                </label>
              </div>
            </div>
          </div>
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

        <div className="flex justify-center">
          <button
            type="submit"
            className="bg-blue-600 text-white py-3 px-8 rounded-md hover:bg-blue-700 text-lg font-medium"
          >
            Submit Registration
          </button>
        </div>
      </form>
    </div>
  );
}
