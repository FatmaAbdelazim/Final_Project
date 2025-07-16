export interface Team {
  id: string;
  name: string;
  description: string;
  organizationName: string;
  maxMembers: number;
  city: string;
  categoryName: string;
}

export interface createTeam {
  name: string;
  description: string;
  maxMembers: number;
  city: string;
  categoryName: string;
  isLinkedToOpportunity: boolean;
  internalNotes: string;
  organizationID: string;
  joinPermission : string;
  opportunityTitle : string
}
