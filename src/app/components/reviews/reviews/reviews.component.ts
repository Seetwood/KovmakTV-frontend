import { Component} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Review } from 'src/app/models/Review';
import { ReviewService } from 'src/app/service/review.service';
import { DialogUpdateTextReviewWpapperComponent } from '../../dialog-update-text-review-wpapper/dialog-update-text-review-wpapper.component';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.less']
})
export class ReviewsComponent {
  reviews: Review[];
  selectedStatus: string = "";

  constructor(public dialog: MatDialog, private reviewService: ReviewService) { }

  getAllReviewForUser(): void {
    this.reviewService.getAllReviewForUser(this.selectedStatus).subscribe((reviews: Review[]) => {
      this.reviews = reviews;
    });
  }

  updateReview(review: Review): void {
    const dialogAddReviewWrapper = this.dialog.open(DialogUpdateTextReviewWpapperComponent, {
      width: '420px',
      height: '390px',
      data: review,
      autoFocus: false,
    });
    dialogAddReviewWrapper.afterClosed().subscribe(() => {
    });
  }

  onStatusChange(status: string): void {
    this.selectedStatus = status;
    this.getAllReviewForUser();
  }
}