export interface TeamModel {
  name: string;
  description: string;
  city: string;
  isLinkedToOpportunity: boolean;
  joinPermission: 'Anyone' | 'InviteOnly'; 
  maxMembers: number;
  internalNotes?: string;
  id?: string; 
  categoryName?: string;
  opportunityName?: string;
}
