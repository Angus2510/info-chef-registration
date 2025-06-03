"use server";
import prisma from "./prisma";

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

type RegistrationFormData =
  | IndividualFormData
  | BulkFormData
  | BoothFormData
  | SponsorFormData;
type RegistrationType = "individual" | "bulk" | "booth" | "sponsor";
type PaymentMethod = "card" | "eft";

export async function saveRegistrationToDatabase(
  formData: RegistrationFormData,
  formType: RegistrationType,
  reference: string,
  paymentMethod: PaymentMethod
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
      case "individual": {
        const data = formData as IndividualFormData;
        await prisma.individualRegistration.create({
          data: {
            baseRegistrationId: baseRegistration.id,
            name: data.name,
            idNumber: data.idNumber,
            email: data.email,
            contactNumber: data.contactNumber,
            invoicingDetails: data.invoicingDetails,
            attendeeType: data.attendeeType,
            isMember: data.isMember,
            numberOfDays: data.numberOfDays,
            selectedDate: data.selectedDate,
            selectedPricing: data.selectedPricing,
          },
        });
        break;
      }

      case "bulk": {
        const data = formData as BulkFormData;
        await prisma.bulkRegistration.create({
          data: {
            baseRegistrationId: baseRegistration.id,
            organizationType: data.organizationType,
            schoolName: data.schoolName,
            vatNumber: data.vatNumber,
            contactPersonName: data.contactPersonName,
            contactPersonEmail: data.contactPersonEmail,
            contactPersonPhone: data.contactPersonPhone,
            memberStudents: data.memberStudents,
            nonMemberStudents: data.nonMemberStudents,
            memberTeachers: data.memberTeachers,
            nonMemberTeachers: data.nonMemberTeachers,
            numberOfDays: data.numberOfDays,
            selectedDate: data.selectedDate,
          },
        });
        break;
      }

      case "booth": {
        const data = formData as BoothFormData;
        await prisma.boothRegistration.create({
          data: {
            baseRegistrationId: baseRegistration.id,
            exhibitorSize: data.exhibitorSize,
            educationOption: data.educationOption,
            industryOption: data.industryOption,
            exhibitorType: data.exhibitorType,
            companyName: data.companyName,
            companyAddress: data.companyAddress,
            companyEmail: data.companyEmail,
            companyContactNumber: data.companyContactNumber,
            companyVAT: data.companyVAT,
            companyContactPerson: data.companyContactPerson,
            priceBeforeVAT: data.priceBeforeVAT,
            vatAmount: data.vatAmount,
          },
        });
        break;
      }

      case "sponsor": {
        const data = formData as SponsorFormData;
        await prisma.sponsorRegistration.create({
          data: {
            baseRegistrationId: baseRegistration.id,
            sponsorshipType: data.sponsorshipType,
            competitionPantryType: data.competitionPantryType,
            partnerTier: data.partnerTier,
            companyName: data.companyName,
            companyAddress: data.companyAddress,
            companyEmail: data.companyEmail,
            companyContactNumber: data.companyContactNumber,
            companyVAT: data.companyVAT,
            companyContactPerson: data.companyContactPerson,
            basePrice: data.basePrice,
            discount: data.discount,
            priceBeforeVAT: data.priceBeforeVAT,
            vatAmount: data.vatAmount,
          },
        });
        break;
      }
    }

    return baseRegistration;
  } catch (error) {
    if (error instanceof Error) {
      console.error("Failed to save registration:", error.message);
    } else {
      console.error("Failed to save registration:", error);
    }
    throw error;
  }
}
