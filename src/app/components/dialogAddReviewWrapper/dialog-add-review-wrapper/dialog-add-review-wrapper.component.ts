import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogUpdateDataFilmWrapperComponent } from '../../dialogUpdateDataFilmWrapper/dialog-update-data-film-wrapper/dialog-update-data-film-wrapper.component';
import { ReviewService } from 'src/app/service/review.service';
import { SaveReview } from 'src/app/models/SaveReview';
import { MessageResponse } from 'src/app/models/MessageResponse';
import { DialogInformationWrapperComponent } from '../../dialogInformationWrapper/dialog-information-wrapper/dialog-information-wrapper.component';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-dialog-add-review-wrapper',
  templateUrl: './dialog-add-review-wrapper.component.html',
  styleUrls: ['./dialog-add-review-wrapper.component.less']
})
export class DialogAddReviewWrapperComponent implements OnInit {

  newReview: SaveReview;
  userId: number;
  filmId: number;
  name: string;
  surname: string;

  constructor(public dialogRef: MatDialogRef<DialogUpdateDataFilmWrapperComponent>,
    private reviewService: ReviewService,
    private userService: UserService,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,) {
      this.filmId = data;
    }
  ngOnInit(): void {
    this.newReview = new SaveReview;
    this.getCurrentUser();
  }
  createReview(): void {
    if (!this.newReview.header || !this.newReview.textReview) {
      const infoDialog = this.dialog.open(DialogInformationWrapperComponent, {
        width: '350px',
        height: '100px',
        data: new MessageResponse("Заполните все обязательные поля!"),
        autoFocus: false
      });
      return;
    }
    this.reviewService.createReview(this.filmId, this.newReview).subscribe(response => {
      console.log('Рецензия успешно создана');
      this.dialogRef.close();
    }, error => {
      console.error('Ошибка при создании рецензии:', error);
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