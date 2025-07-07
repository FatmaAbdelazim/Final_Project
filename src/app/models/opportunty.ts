export interface Opportunity {
  id: string;
  title: string;
  description: string;
  image: string;
  startDate: string;
  ratingCount: number;
  location: string;
}

export interface UpdateOpp {
    title: string,
    description: string,
    location : string,
    startDate : string,
    endDate :string,
    requiredVolunteers : number,
    categoryName : string,
    organizationName :string,
    teamName :string,
    timeAttend : string,
    isAttendanceTracked : boolean,
    isCertificateAvailable : boolean,
    totalHours : number,
    genderRequirement : string,
    requiredSkills : string[]
}
