import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ReviewService } from 'src/app/service/review.service';
import { MessageResponse } from 'src/app/models/MessageResponse';
import { DialogInformationWrapperComponent } from '../dialogInformationWrapper/dialog-information-wrapper/dialog-information-wrapper.component';
import { UserService } from 'src/app/service/user.service';
import { Review } from 'src/app/models/Review';

@Component({
  selector: 'app-dialog-update-text-review-wpapper',
  templateUrl: './dialog-update-text-review-wpapper.component.html',
  styleUrls: ['./dialog-update-text-review-wpapper.component.less']
})
export class DialogUpdateTextReviewWpapperComponent implements OnInit {

  userId: number;
  filmId: number;
  name: string;
  surname: string;
  updateReview: Review;

  constructor(public dialogRef: MatDialogRef<DialogUpdateTextReviewWpapperComponent>,
    private reviewService: ReviewService,
    private userService: UserService,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      this.updateReview = {...data};
      this.filmId = data.filmId;
      this.userId = data.userId;
    }
  ngOnInit(): void {
    this.getCurrentUser();
  }
  updateReviewText(): void {
    if (!this.updateReview.header || !this.updateReview.textReview) {
      const infoDialog = this.dialog.open(DialogInformationWrapperComponent, {
        width: '350px',
        height: '100px',
        data: new MessageResponse("Заполните все обязательные поля!"),
        autoFocus: false
      });
      return;
    }
    this.reviewService.updateReview( this.userId,  this.filmId, this.updateReview).subscribe(() => {
      console.log('Рецензия успешно создана');
      this.dialogRef.close();
    });
  }

  getCurrentUser() {
    this.userService.getUser().subscribe(data => {
      this.userId = data.id;
      this.name = data.name;
      this.surname = data.surname;
    });
  }
}
