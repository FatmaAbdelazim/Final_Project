export interface OppManagment {
  id: string;
  title: string;
  organizationName: string;
  description: string;
  startDate: string;         // أو Date لو هتحوليها بـ new Date()
  status: 'Published' | 'Draft' | 'Closed' | string;
  statusDisplay: string;     // زي "نشطة"، "منتهية"، إلخ
  applicantsCount: number;
  averageRating: number;

}
