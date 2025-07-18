export interface Review {
  reviewId: string;
  opportunityId: string;
  comment: string;
  rating: number;
  createdAt: Date;
  userName: string;
  userImage: string;
  opportunityName: string;
}
export interface ReviewStats {
  totalReviews: number;
  averageRating: number;
  deletedReviews: number;
}
