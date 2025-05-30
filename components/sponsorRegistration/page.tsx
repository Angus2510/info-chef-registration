"use client";

import { useState } from "react";
import Submit from "@/components/submit/page";

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

  // Price calculation function
  const calculatePrices = (): {
    basePrice: number;
    discount: number;
    priceBeforeVAT: number;
    vatAmount: number;
    totalPrice: number;
  } => {
    let basePrice = 0;

    // Sponsorship prices
    if (sponsorshipType === "cocktail") basePrice = 80000;
    if (sponsorshipType === "seminar_&_activation_area_sponsorship")
      basePrice = 20000;
    if (sponsorshipType === "refreshment_area_sponsorship") basePrice = 10000;
    if (sponsorshipType === "pop-up_refreshment_spots") basePrice = 4000;
    if (sponsorshipType === "lunch_pack_&_catering_area_sponsorship")
      basePrice = 55000;

    // Competition Pantry prices
    if (competitionPantryType === "exclusive") basePrice = 90000;
    if (competitionPantryType === "shared_small") basePrice = 30000;

    // Calculate partner discount
    let discountPercentage = 0;
    switch (partnerTier.toLowerCase()) {
      case "premium":
        discountPercentage = 0.2;
        break;
      case "gold":
        discountPercentage = 0.15;
        break;
      case "silver_plus":
        discountPercentage = 0.1;
        break;
      case "silver":
        discountPercentage = 0.07;
        break;
      case "bronze":
        discountPercentage = 0.05;
        break;
    }

    const discount = basePrice * discountPercentage;
    const priceBeforeVAT = basePrice - discount;
    const vatAmount = priceBeforeVAT * 0.15;
    const totalPrice = priceBeforeVAT + vatAmount;

    return { basePrice, discount, priceBeforeVAT, vatAmount, totalPrice };
  };

  // Calculate prices
  const { basePrice, discount, priceBeforeVAT, vatAmount, totalPrice } =
    calculatePrices();

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
      basePrice,
      discount,
      priceBeforeVAT,
      vatAmount,
      totalPrice,
    });
    alert("Sponsorship registration submitted successfully!");
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="border rounded-lg p-6 bg-gray-50">
          <h2 className="text-xl font-bold mb-4">Select Sponsorship Options</h2>

          {/* Sponsorship Options */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3">
              🤝 Sponsorship Opportunities
            </h3>
            <div className="space-y-3">
              <div className="bg-white p-4 rounded-md border">
                <label className="flex items-start">
                  <input
                    type="radio"
                    name="sponsorshipType"
                    value="cocktail"
                    className="mt-1 mr-3"
                    onChange={(e) => setSponsorshipType(e.target.value)}
                  />
                  <div>
                    <p className="font-medium">Cocktail Event</p>
                    <p className="text-green-700 font-medium">R80,000.00</p>
                    <p className="text-gray-600 text-sm">
                      Exclusive sponsorship of the networking cocktail event
                    </p>
                  </div>
                </label>
              </div>

              <div className="bg-white p-4 rounded-md border">
                <label className="flex items-start">
                  <input
                    type="radio"
                    name="sponsorshipType"
                    value="seminar_&_activation_area_sponsorship"
                    className="mt-1 mr-3"
                    onChange={(e) => setSponsorshipType(e.target.value)}
                  />
                  <div>
                    <p className="font-medium">Seminar & Activation Area</p>
                    <p className="text-green-700 font-medium">R20,000.00</p>
                    <p className="text-gray-600 text-sm">
                      Branding rights for seminar and activation spaces
                    </p>
                  </div>
                </label>
              </div>

              <div className="bg-white p-4 rounded-md border">
                <label className="flex items-start">
                  <input
                    type="radio"
                    name="sponsorshipType"
                    value="refreshment_area_sponsorship"
                    className="mt-1 mr-3"
                    onChange={(e) => setSponsorshipType(e.target.value)}
                  />
                  <div>
                    <p className="font-medium">Refreshment Area</p>
                    <p className="text-green-700 font-medium">R10,000.00</p>
                    <p className="text-gray-600 text-sm">
                      Branding rights for refreshment areas
                    </p>
                  </div>
                </label>
              </div>

              <div className="bg-white p-4 rounded-md border">
                <label className="flex items-start">
                  <input
                    type="radio"
                    name="sponsorshipType"
                    value="pop-up_refreshment_spots"
                    className="mt-1 mr-3"
                    onChange={(e) => setSponsorshipType(e.target.value)}
                  />
                  <div>
                    <p className="font-medium">Pop-up Refreshment Spots</p>
                    <p className="text-green-700 font-medium">R4,000.00</p>
                    <p className="text-gray-600 text-sm">
                      Branding for pop-up refreshment locations
                    </p>
                  </div>
                </label>
              </div>

              <div className="bg-white p-4 rounded-md border">
                <label className="flex items-start">
                  <input
                    type="radio"
                    name="sponsorshipType"
                    value="lunch_pack_&_catering_area_sponsorship"
                    className="mt-1 mr-3"
                    onChange={(e) => setSponsorshipType(e.target.value)}
                  />
                  <div>
                    <p className="font-medium">Lunch Pack & Catering Area</p>
                    <p className="text-green-700 font-medium">R55,000.00</p>
                    <p className="text-gray-600 text-sm">
                      Exclusive branding for lunch pack and catering areas
                    </p>
                  </div>
                </label>
              </div>
            </div>
          </div>

          {/* Competition Pantry Options */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3">
              🏆 Competition Pantry Sponsorship
            </h3>
            <div className="space-y-3">
              <div className="bg-white p-4 rounded-md border">
                <label className="flex items-start">
                  <input
                    type="radio"
                    name="competitionPantryType"
                    value="exclusive"
                    className="mt-1 mr-3"
                    onChange={(e) => setCompetitionPantryType(e.target.value)}
                  />
                  <div>
                    <p className="font-medium">Exclusive Pantry Sponsorship</p>
                    <p className="text-green-700 font-medium">R90,000.00</p>
                    <p className="text-gray-600 text-sm">
                      Exclusive branding rights for competition pantry
                    </p>
                  </div>
                </label>
              </div>

              <div className="bg-white p-4 rounded-md border">
                <label className="flex items-start">
                  <input
                    type="radio"
                    name="competitionPantryType"
                    value="shared_small"
                    className="mt-1 mr-3"
                    onChange={(e) => setCompetitionPantryType(e.target.value)}
                  />
                  <div>
                    <p className="font-medium">Shared Small Pantry</p>
                    <p className="text-green-700 font-medium">R30,000.00</p>
                    <p className="text-gray-600 text-sm">
                      Shared branding rights for small pantry section
                    </p>
                  </div>
                </label>
              </div>
            </div>
          </div>

          {/* Partner Tier Selection */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3">
              🌟 Partner Tier Selection
            </h3>
            <div className="space-y-3">
              <div className="bg-white p-4 rounded-md border">
                <label className="flex items-start">
                  <input
                    type="radio"
                    name="partnerTier"
                    value="premium"
                    className="mt-1 mr-3"
                    onChange={(e) => setPartnerTier(e.target.value)}
                  />
                  <div>
                    <p className="font-medium">Premium Partner</p>
                    <p className="text-green-700 font-medium">20% Discount</p>
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
                    onChange={(e) => setPartnerTier(e.target.value)}
                  />
                  <div>
                    <p className="font-medium">Gold Partner</p>
                    <p className="text-green-700 font-medium">15% Discount</p>
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
                    onChange={(e) => setPartnerTier(e.target.value)}
                  />
                  <div>
                    <p className="font-medium">Silver Plus Partner</p>
                    <p className="text-green-700 font-medium">10% Discount</p>
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
                    onChange={(e) => setPartnerTier(e.target.value)}
                  />
                  <div>
                    <p className="font-medium">Silver Partner</p>
                    <p className="text-green-700 font-medium">7% Discount</p>
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
                    onChange={(e) => setPartnerTier(e.target.value)}
                  />
                  <div>
                    <p className="font-medium">Bronze Partner</p>
                    <p className="text-green-700 font-medium">5% Discount</p>
                  </div>
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Company Details */}
        <div className="border rounded-lg p-6 bg-gray-50">
          <h2 className="text-xl font-bold mb-4">Company Details</h2>
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
        {basePrice > 0 && (
          <div className="border rounded-lg p-6 bg-gray-50">
            <h2 className="text-xl font-bold mb-4">Price Summary</h2>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Base Price:</span>
                <span className="font-medium">R{basePrice.toFixed(2)}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-red-600">
                  <span>Partner Discount:</span>
                  <span>-R{discount.toFixed(2)}</span>
                </div>
              )}
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
            formData={FormData}
            totalPrice={totalPrice}
            formType="sponsor" // or "bulk", "booth", "sponsor"
          />
        </div>
      </form>
    </div>
  );
}
