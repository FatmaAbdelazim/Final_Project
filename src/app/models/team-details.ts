export interface TeamDetails {
  id: string,
  name: string,
  description: string,
  status: string,
  creationDate: string,
  city: string,
  categoryName:string,
  organizationName: string,
  teamGoals: string,
  members : members[],
  opportunities: opportunities[],
  totalMembers: number,
  totalProjects: number,
  availableOpportunities: number,
  completionRate: number
}
export interface members {
  fullName: string,
  role:string,
  image:string
}
export interface opportunities {
  id: string,
  title: string,
  description:string,
  status:string
}
