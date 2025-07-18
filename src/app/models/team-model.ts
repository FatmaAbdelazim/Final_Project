export interface TeamModel {
  name: string;
  description: string;
  categoryId: string;
  city: string;
  isLinkedToOpportunity: boolean;
  joinPermission: 'Anyone' | 'InviteOnly' | number; 
  //  joinPermission: string; 
  maxMembers: number;
  internalNotes?: string;
  organizationID: string;
  opportunityTitle?: string;
  id?: string; 
  categoryName?: string;
  opportunityName?: string;
}
