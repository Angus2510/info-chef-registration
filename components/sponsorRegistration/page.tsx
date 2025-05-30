"use client";

import { useState } from "react";

export default function SponsorRegistration() {
  // State for form fields
  const [sponsorshipType, setSponsorshipType] = useState<string>("");
  const [competitionPantryType, setCompetitionPantryType] =
    useState<string>("");
  const [partnerTier, setPartnerTier] = useState<string>("");

  // Company details states
  const [companyName, setCompanyName] = useState<string>("");
  const [companyAddress, setCompanyAddress] = useState<string>("");
  const [companyEmail, setCompanyEmail] = useState<string>("");
  const [companyContactNumber, setCompanyContactNumber] = useState<string>("");
  const [companyVAT, setCompanyVAT] = useState<string>("");
  const [companyContactPerson, setCompanyContactPerson] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted", {
      sponsorshipType,
      competitionPantryType,
      partnerTier,
      companyName,
      companyAddress,
      companyEmail,
      companyContactNumber,
      companyVAT,
      companyContactPerson,
    });
    alert("Sponsorship registration submitted successfully!");
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="border rounded-lg p-6 bg-gray-50">
          <h2 className="text-xl font-bold mb-4">Sponsorship Opportunities</h2>

          {/* Main Sponsorship Options */}
          <div className="space-y-4">
            {/* Cocktail Area */}
            <div className="bg-white p-4 rounded-md border">
              <label className="flex items-start">
                <input
                  type="radio"
                  name="sponsorshipType"
                  value="cocktail"
                  className="mt-1 mr-3"
                  onChange={() => setSponsorshipType("cocktail")}
                />
                <div>
                  <p className="font-medium">🥂 Cocktail Area Sponsorship</p>
                  <p className="text-green-700 font-medium">R80,000.00</p>
                  <p className="text-gray-600 text-sm">
                    Includes approx. R210,000 worth of branding
                  </p>
                </div>
              </label>
            </div>

            {/* Competition Pantry */}
            <div className="bg-white p-4 rounded-md border">
              <h4 className="font-medium mb-2">
                🛒 Competition Pantry Sponsorship
              </h4>
              <p className="text-sm text-gray-600 mb-2">
                Branding in the pantry used during competitions
              </p>
              <div className="space-y-2 ml-4">
                {[
                  {
                    type: "exclusive",
                    price: "90,000.00",
                    details: "Exclusive branding + 9 sqm stand",
                  },

                  {
                    type: "shared_small",
                    price: "30,000.00",
                    details: "Shared branding + 3 sqm stand",
                  },
                ].map((option) => (
                  <label key={option.type} className="flex items-start">
                    <input
                      type="radio"
                      name="competitionPantryType"
                      value={option.type}
                      className="mt-1 mr-3"
                      onChange={() => setCompetitionPantryType(option.type)}
                    />
                    <div>
                      <p className="text-green-700 font-medium">
                        R{option.price}
                      </p>
                      <p className="text-gray-600 text-sm">{option.details}</p>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Other Sponsorship Options */}
            {[
              {
                emoji: "🎤",
                title: "Seminar & Activation Area Sponsorship",
                price: "20,000.00",
                details:
                  "Branding of venues used for talks, product activations, and AGM",
              },
              {
                emoji: "☕",
                title: "Refreshment Area Sponsorship",
                price: "10,000.00",
                details: "Branding of main refreshment & catering areas (x2)",
              },
              {
                emoji: "🧃",
                title: "Pop-Up Refreshment Spots",
                price: "4,000.00",
                details: "Pop-up refreshment branding throughout venue ",
              },
              {
                emoji: "🍱",
                title: "Lunch Pack & Catering Area Sponsorship",
                price: "55,000.00",
                details:
                  "Full sponsorship and branding of the area where scholar lunch packs and café food are served",
              },
            ].map((option) => (
              <div
                key={option.title}
                className="bg-white p-4 rounded-md border"
              >
                <label className="flex items-start">
                  <input
                    type="radio"
                    name="sponsorshipType"
                    value={option.title.toLowerCase().replace(/\s+/g, "_")}
                    className="mt-1 mr-3"
                    onChange={() => setSponsorshipType(option.title)}
                  />
                  <div>
                    <p className="font-medium">
                      {option.emoji} {option.title}
                    </p>
                    <p className="text-green-700 font-medium">
                      R{option.price}
                    </p>
                    <p className="text-gray-600 text-sm">{option.details}</p>
                  </div>
                </label>
              </div>
            ))}
          </div>

          {/* Partner Tier Selection */}
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-3">
              🏅 SA Chefs Partner Discount on Sponsorships
            </h3>
            <div className="bg-white p-4 rounded-md border">
              <div className="space-y-2">
                {[
                  { tier: "Premium", discount: "20% + FREE exhibition stand" },
                  { tier: "Gold", discount: "15%" },
                  { tier: "Silver Plus", discount: "10%" },
                  { tier: "Silver", discount: "7%" },
                  { tier: "Bronze", discount: "5%" },
                ].map((tier) => (
                  <label key={tier.tier} className="flex items-start">
                    <input
                      type="radio"
                      name="partnerTier"
                      value={tier.tier.toLowerCase().replace(/\s+/g, "_")}
                      className="mt-1 mr-3"
                      onChange={() => setPartnerTier(tier.tier)}
                    />
                    <div>
                      <p className="font-medium">{tier.tier}</p>
                      <p className="text-gray-600 text-sm">
                        Discount: {tier.discount}
                      </p>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          </div>

          <p className="text-sm text-gray-600 mt-4">
            All sponsorship prices exclude VAT
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

        <div className="flex justify-center">
          <button
            type="submit"
            className="bg-blue-600 text-white py-3 px-8 rounded-md hover:bg-blue-700 text-lg font-medium"
          >
            Submit Sponsorship Registration
          </button>
        </div>
      </form>
    </div>
  );
}
