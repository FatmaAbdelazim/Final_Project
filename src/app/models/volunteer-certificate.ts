export interface VolunteerCertificate {
    id: string;
    title: string;
    totalHours: number;
    issueDate: string;
    organizationName: string;
    downloadUrl: string;
}
export interface Volunteer{
  image : string,
  fullName : string,
  email : string,
  date : string,
  status  :string,
  city : string,
  numOfOpps : number,
  numOfHours : number
}
