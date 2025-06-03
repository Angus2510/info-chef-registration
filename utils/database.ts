"use server";
import { PrismaClient } from "@prisma/client";

// Prevent multiple instances of Prisma Client in development
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

interface IndividualFormData {
  name: string;
  idNumber: string;
  email: string;
  contactNumber: string;
  invoicingDetails: string;
  attendeeType: "student" | "general" | "scholar";
  isMember: boolean;
  numberOfDays: "one" | "two";
  selectedDate?: string;
  selectedPricing: string;
  totalPrice: number;
}

interface BulkFormData {
  organizationType: "highschool" | "culinary" | "company";
  schoolName: string;
  vatNumber?: string;
  contactPersonName: string;
  contactPersonEmail: string;
  contactPersonPhone: string;
  memberStudents: number;
  nonMemberStudents: number;
  memberTeachers: number;
  nonMemberTeachers: number;
  numberOfDays: "one" | "two";
  selectedDate?: string;
  totalPrice: number;
}

interface BoothFormData {
  exhibitorSize?: "2sqm" | "4sqm" | "6sqm" | "";
  educationOption?: string;
  industryOption?: string;
  exhibitorType?: string;
  companyName: string;
  companyAddress: string;
  companyEmail: string;
  companyContactNumber: string;
  companyVAT: string;
  companyContactPerson: string;
  priceBeforeVAT: number;
  vatAmount: number;
  totalPrice: number;
}

interface SponsorFormData {
  sponsorshipType: string;
  competitionPantryType: string;
  partnerTier: string;
  companyName: string;
  companyAddress: string;
  companyEmail: string;
  companyContactNumber: string;
  companyVAT: string;
  companyContactPerson: string;
  basePrice: number;
  discount: number;
  priceBeforeVAT: number;
  vatAmount: number;
  totalPrice: number;
}

export async function saveRegistrationToDatabase(
  formData: IndividualFormData | BulkFormData | BoothFormData | SponsorFormData,
  formType: "individual" | "bulk" | "booth" | "sponsor",
  reference: string,
  paymentMethod: "card" | "eft"
) {
  try {
    // Create base registration first
    const baseRegistration = await prisma.baseRegistration.create({
      data: {
        reference,
        formType,
        paymentStatus: "pending",
        paymentMethod,
        totalPrice: formData.totalPrice,
      },
    });

    // Based on form type, create specific registration
    switch (formType) {
      case "individual":
        if ("name" in formData) {
          await prisma.individualRegistration.create({
            data: {
              baseRegistrationId: baseRegistration.id,
              name: formData.name,
              idNumber: formData.idNumber,
              email: formData.email,
              contactNumber: formData.contactNumber,
              invoicingDetails: formData.invoicingDetails,
              attendeeType: formData.attendeeType,
              isMember: formData.isMember,
              numberOfDays: formData.numberOfDays,
              selectedDate: formData.selectedDate,
              selectedPricing: formData.selectedPricing,
            },
          });
        }
        break;

      case "bulk":
        if ("organizationType" in formData) {
          await prisma.bulkRegistration.create({
            data: {
              baseRegistrationId: baseRegistration.id,
              organizationType: formData.organizationType,
              schoolName: formData.schoolName,
              vatNumber: formData.vatNumber,
              contactPersonName: formData.contactPersonName,
              contactPersonEmail: formData.contactPersonEmail,
              contactPersonPhone: formData.contactPersonPhone,
              memberStudents: formData.memberStudents,
              nonMemberStudents: formData.nonMemberStudents,
              memberTeachers: formData.memberTeachers,
              nonMemberTeachers: formData.nonMemberTeachers,
              numberOfDays: formData.numberOfDays,
              selectedDate: formData.selectedDate,
            },
          });
        }
        break;

      case "booth":
        if ("companyName" in formData && "exhibitorSize" in formData) {
          await prisma.boothRegistration.create({
            data: {
              baseRegistrationId: baseRegistration.id,
              exhibitorSize: formData.exhibitorSize,
              educationOption: formData.educationOption,
              industryOption: formData.industryOption,
              exhibitorType: formData.exhibitorType,
              companyName: formData.companyName,
              companyAddress: formData.companyAddress,
              companyEmail: formData.companyEmail,
              companyContactNumber: formData.companyContactNumber,
              companyVAT: formData.companyVAT,
              companyContactPerson: formData.companyContactPerson,
              priceBeforeVAT: formData.priceBeforeVAT,
              vatAmount: formData.vatAmount,
            },
          });
        }
        break;

      case "sponsor":
        if ("sponsorshipType" in formData) {
          await prisma.sponsorRegistration.create({
            data: {
              baseRegistrationId: baseRegistration.id,
              sponsorshipType: formData.sponsorshipType,
              competitionPantryType: formData.competitionPantryType,
              partnerTier: formData.partnerTier,
              companyName: formData.companyName,
              companyAddress: formData.companyAddress,
              companyEmail: formData.companyEmail,
              companyContactNumber: formData.companyContactNumber,
              companyVAT: formData.companyVAT,
              companyContactPerson: formData.companyContactPerson,
              basePrice: formData.basePrice,
              discount: formData.discount,
              priceBeforeVAT: formData.priceBeforeVAT,
              vatAmount: formData.vatAmount,
            },
          });
        }
        break;
    }

    return baseRegistration;
  } catch (error) {
    console.error("Failed to save registration:", error);
    throw error;
  }
}
