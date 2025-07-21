import { Component, Input } from '@angular/core';
import { Review } from '../../../models/review';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-comment-card',
  imports: [CommonModule],
  templateUrl: './comment-card.component.html',
  styleUrl: './comment-card.component.css'
})
export class CommentCardComponent {
  @Input() CommentObject !: Review;
    getStarsArray(rating: number): number[] {
    return Array(rating).fill(0);
  }
}
