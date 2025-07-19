export interface Participant{
  volunteerId: string,
  profileImage : string,
  fullName: string,
  email: string,
  participationId: string,
  attendanceStatus: string,
  approvedHours: number,
  comment: string
}
export interface VolunteerParticipationForCertificates {
  id: string;
  volunteerId: string;
  profileImage: string;
  fullName: string;
  email: string;
  totalHours: number;
  opportunityTitle: string;
  opp_id: string;
  participationDate: Date;
  certificateId: string | null;
}
