import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Review } from 'src/app/models/Review';
import { ReviewService } from 'src/app/service/review.service';
import { DialogCreateFilmWrapperComponent } from '../../dialogCreateFilmWrapper/dialog-create-film-wrapper/dialog-create-film-wrapper.component';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.less']
})
export class AdminComponent implements OnInit {

  reviews: Review[];
  constructor(public dialog: MatDialog, private reviewService: ReviewService) {}

  ngOnInit(): void {
    this.getReviewsForFilm();
  }

  getReviewsForFilm() {
    this.reviewService.getAllReviews().subscribe((reviews: Review[]) => {
      this.reviews = reviews;
    });
  }

  verifiedReview(userId: number, filmId: number, review: Review) {
    this.reviewService.updateStatusReview(userId, filmId, 'VERIFIED', review).subscribe((review: Review) => {
      console.log('Review status updated to VERIFIED:', review);
      this.getReviewsForFilm();
    });
  }

  rejectedReview(userId: number, filmId: number, review: Review) {
    this.reviewService.updateStatusReview(userId, filmId, 'REJECTED', review).subscribe((review: Review) => {
      console.log('Review status updated to REJECTED:', review);
      this.getReviewsForFilm();
    });
  }

  createFilm() {
    const dialogUpdateDataFilmWrapper = this.dialog.open(DialogCreateFilmWrapperComponent, {
      width: '700px',
      height: '715px',
      data: null,
      autoFocus: false,
    });
    dialogUpdateDataFilmWrapper.afterClosed().subscribe(() => {});
  }
}
