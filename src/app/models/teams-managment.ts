export interface TeamsManagment {
    id: string;
    name: string;
    description: string;
    creationDate: string;
    status: 'Pending' | 'Approved' | 'Rejected';
    organizationName: string;
    actualMembersCount: number;
}
