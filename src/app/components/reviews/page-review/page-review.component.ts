import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Comments } from 'src/app/models/Comment';
import { MessageResponse } from 'src/app/models/MessageResponse';
import { Review } from 'src/app/models/Review';
import { ReviewService } from 'src/app/service/review.service';
import { DialogInformationWrapperComponent } from '../../dialogInformationWrapper/dialog-information-wrapper/dialog-information-wrapper.component';
import { CommentService } from 'src/app/service/comment.service';
import { MatDialog } from '@angular/material/dialog';
import { SaveComment } from 'src/app/models/SaveComment';

@Component({
  selector: 'app-page-review',
  templateUrl: './page-review.component.html',
  styleUrls: ['./page-review.component.less']
})
export class PageReviewComponent implements OnInit {

  review: Review;
  comments: Comments[];
  showForm = false;
  newCommentForComment: SaveComment = new SaveComment();
  newCommentForReview: SaveComment = new SaveComment();
  reviewId: number;

  constructor(
    private dialog: MatDialog,
    private reviewService: ReviewService,
    private commentService: CommentService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.reviewId = Number(this.route.snapshot.paramMap.get('reviewId')!);
    this.refreshComments();
  }

  refreshComments() {
    this.reviewService.getPageReview(this.reviewId).subscribe((review: Review) => {
      this.review = review;
      this.comments = review.comments;
    });
  }

  createComment(id: number | null = null) {
    if (id === null) {
      this.commentService.createCommentForReview(this.reviewId, this.newCommentForReview).subscribe(() => {
        this.refreshComments();
      });
    } else {
      this.commentService.createCommentForComment(this.reviewId, id, this.newCommentForComment).subscribe(() => {
        this.refreshComments();
      });
    }
  }

  createCommentForComment(id: number) {
    this.createComment(id);
    if (!this.newCommentForComment.textComment) {
      const infoDialog = this.dialog.open(DialogInformationWrapperComponent, {
        width: '350px',
        height: '100px',
        data: new MessageResponse('Пожалуйста, заполните все поля!'),
        autoFocus: false
      });
      return;
    }
    this.newCommentForComment.textComment = '';
  }

  createCommentForReview() {
    this.createComment();
    if (!this.newCommentForReview.textComment) {
      const infoDialog = this.dialog.open(DialogInformationWrapperComponent, {
        width: '350px',
        height: '100px',
        data: new MessageResponse('Пожалуйста, заполните все поля!'),
        autoFocus: false
      });
      return;
    }
    this.newCommentForReview.textComment = '';
  }

  openForm(comment: any) {
    comment.showForm = true;
  }

  closeForm(comment: any) {
    comment.showForm = false;
  }
}