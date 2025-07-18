export interface volunteersForAdmin {
  id: string;
  fullName: string;
  email: string;
  image: string;
  joinDate: Date;
  status: 'Pending' | 'Approved' | 'Rejected'; 
  city: string;
  opportunitiesAppliedCount: number;
  teamsJoinedCount: number;
  volunteerHours: number;
  isBanned: boolean;
}
