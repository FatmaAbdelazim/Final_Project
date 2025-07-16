export interface Organization {
  id: string;
  organizationName:string;
  email : string;
  phoneNumber :string;
  city :string;
  logoFile : string;
}
export interface VolunteerApplications{
    id: string,
    opportunityTitle: string,
    profileImage: string|null,
    volunteerId: string,
    fullName: string|null,
    status: string,
    appliedAt: Date
}
