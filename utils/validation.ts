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

type RegistrationData =
  | IndividualFormData
  | BulkFormData
  | BoothFormData
  | SponsorFormData;
type RegistrationType = "individual" | "bulk" | "booth" | "sponsor";

export const validateRegistrationData = (
  data: RegistrationData,
  type: RegistrationType
): boolean => {
  const isValidString = (value: string | undefined): boolean =>
    value !== undefined && typeof value === "string" && value.trim().length > 0;

  const isValidNumber = (value: number): boolean =>
    typeof value === "number" && !isNaN(value) && value >= 0;

  switch (type) {
    case "individual": {
      const formData = data as IndividualFormData;
      return !!(
        isValidString(formData.name) &&
        isValidString(formData.idNumber) &&
        isValidString(formData.email) &&
        isValidString(formData.contactNumber) &&
        isValidString(formData.invoicingDetails) &&
        ["student", "general", "scholar"].includes(formData.attendeeType) &&
        typeof formData.isMember === "boolean" &&
        ["one", "two"].includes(formData.numberOfDays) &&
        isValidString(formData.selectedPricing) &&
        isValidNumber(formData.totalPrice) &&
        (formData.numberOfDays === "two" ||
          isValidString(formData.selectedDate))
      );
    }

    case "bulk": {
      const formData = data as BulkFormData;
      return !!(
        ["highschool", "culinary", "company"].includes(
          formData.organizationType
        ) &&
        isValidString(formData.schoolName) &&
        isValidString(formData.contactPersonName) &&
        isValidString(formData.contactPersonEmail) &&
        isValidString(formData.contactPersonPhone) &&
        ["one", "two"].includes(formData.numberOfDays) &&
        isValidNumber(formData.memberStudents) &&
        isValidNumber(formData.nonMemberStudents) &&
        isValidNumber(formData.memberTeachers) &&
        isValidNumber(formData.nonMemberTeachers) &&
        isValidNumber(formData.totalPrice) &&
        (formData.numberOfDays === "two" ||
          isValidString(formData.selectedDate))
      );
    }

    case "booth": {
      const formData = data as BoothFormData;

      // Check that at least one exhibition option is selected AND price is greater than 0
      const hasValidExhibition = !!(
        (formData.exhibitorSize ||
          formData.educationOption ||
          formData.industryOption) &&
        formData.priceBeforeVAT > 0
      );

      return !!(
        hasValidExhibition &&
        isValidString(formData.companyName) &&
        isValidString(formData.companyAddress) &&
        isValidString(formData.companyEmail) &&
        isValidString(formData.companyContactNumber) &&
        isValidString(formData.companyVAT) &&
        isValidString(formData.companyContactPerson) &&
        isValidNumber(formData.priceBeforeVAT) &&
        isValidNumber(formData.vatAmount) &&
        isValidNumber(formData.totalPrice)
      );
    }

    case "sponsor": {
      const formData = data as SponsorFormData;

      // Check that either sponsorshipType OR competitionPantryType is selected, but not both
      const hasValidSelection =
        (!!formData.sponsorshipType && !formData.competitionPantryType) ||
        (!formData.sponsorshipType && !!formData.competitionPantryType);

      return !!(
        hasValidSelection && // New validation check
        isValidString(formData.companyName) &&
        isValidString(formData.companyAddress) &&
        isValidString(formData.companyEmail) &&
        isValidString(formData.companyContactNumber) &&
        isValidString(formData.companyVAT) &&
        isValidString(formData.companyContactPerson) &&
        isValidNumber(formData.basePrice) &&
        isValidNumber(formData.discount) &&
        isValidNumber(formData.priceBeforeVAT) &&
        isValidNumber(formData.vatAmount) &&
        isValidNumber(formData.totalPrice)
      );
    }

    default:
      return false;
  }
};
