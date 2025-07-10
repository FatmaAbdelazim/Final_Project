export interface OpportuntyDetails  {
  image: string;
  title: string;
  description: string;
  location: string;
  startDate: string;
  endDate: string;
  totalHours: number;
  requiredSkills: string[]; 
  organizationName: string;
  organizationEmail: string | null;
  organizationPhone: string | null;
  organizationType: string;
  organizationImage: string | null;
  organizationDescription: string | null;
  volunteerCount: number;
  deadline: string;
}
