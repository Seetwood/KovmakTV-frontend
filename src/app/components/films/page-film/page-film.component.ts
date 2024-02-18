import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { Film } from 'src/app/models/Film';
import { DialogUpdateDataFilmWrapperComponent } from '../../dialogUpdateDataFilmWrapper/dialog-update-data-film-wrapper/dialog-update-data-film-wrapper.component';
import { MatDialog } from '@angular/material/dialog';
import { Review } from 'src/app/models/Review';
import { ReviewService } from 'src/app/service/review.service';
import { DialogAddReviewWrapperComponent } from '../../dialogAddReviewWrapper/dialog-add-review-wrapper/dialog-add-review-wrapper.component';
import { MessageResponse } from 'src/app/models/MessageResponse';
import { DialogInformationWrapperComponent } from '../../dialogInformationWrapper/dialog-information-wrapper/dialog-information-wrapper.component';
import { FilmService } from 'src/app/service/film-service';

@Component({
  selector: 'app-page-film',
  templateUrl: './page-film.component.html',
  styleUrls: ['./page-film.component.less']
})
export class PageFilmComponent implements OnInit {

  filmId: number;
  film: Film;
  url: string;
  img: string;
  video: string;
  reviews: Review[];

  pageSizeReview: number;
  currentPageReview: number;
  totalPagesReview: number;

  constructor(private route: ActivatedRoute,
    private filmService: FilmService,
    private authService: AuthService,
    public dialog: MatDialog,
    private reviewService: ReviewService) { }

  isAuth(): boolean {
    return this.authService.isAuth();
  }

  isAdmin(): boolean {
    return this.authService.isAdmin();
  }

  ngOnInit() {
    this.film = new Film;
    this.loadData();
  }

  loadData() {
    this.filmId = Number(this.route.snapshot.paramMap.get('id'));
    this.filmService.getPageFilm(this.filmId).subscribe((film: Film) => {
      this.film = film;
      this.url = new Film().url;
      this.img = this.url + this.film.imagesList[0].imageUrl;
      this.video = this.url + this.film.videosList[0].traillerUrl;
      this.initializeVideoPlayer();
    });
    this.getReviewsForFilm();
  }

  initializeVideoPlayer() {
    const videoPlayer = document.getElementById('video-container');
    if (videoPlayer) {
      const video = document.createElement('video');
      const source = document.createElement('source');
      source.src = this.video;
      source.type = 'video/mp4';
      video.controls = true;
      video.appendChild(source);
      videoPlayer.appendChild(video);
      video.style.width = '282px';
      video.style.borderRadius = '10px';
    }
  }

  updateFilm(currentFilm: Film) {
    const dialogUpdateDataFilmWrapper = this.dialog.open(DialogUpdateDataFilmWrapperComponent, {
      width: '700px',
      height: '650px',
      data: currentFilm,
      autoFocus: false,
    });
    dialogUpdateDataFilmWrapper.afterClosed().subscribe(() => {
      this.filmService.getPageFilm(this.filmId).subscribe(updateFilm => {
        this.film = updateFilm;
      });
    });
  }

  getReviewsForFilm() {
    this.reviewService.getVerifiedReviewByFilm(this.filmId, this.currentPageReview = 0, this.pageSizeReview = 3).subscribe((reviews: any) => {
      this.reviews = reviews.content;
      this.totalPagesReview = reviews.totalPages;
    });
  }

  onScroll(): void {
    if (this.currentPageReview < this.totalPagesReview - 1) {
      this.currentPageReview++;
      this.reviewService.getVerifiedReviewByFilm(this.filmId, this.currentPageReview, this.pageSizeReview = 3).subscribe((reviews: any) => {
        this.reviews.push(...reviews.content);
      });
    }
  }

  createReview() {
    if (this.isAuth()) {
      const dialogAddReviewWrapper = this.dialog.open(DialogAddReviewWrapperComponent, {
        width: '420px',
        height: '390px',
        data: this.filmId,
        autoFocus: false,
      });
    }
    else {
      this.dialog.open(DialogInformationWrapperComponent, {
        width: '350px',
        height: '100px',
        data: new MessageResponse("Вы не авторизованы!"),
        autoFocus: false
      });
      return;
    }
  }

  toggleExpand(review: Review) {
    review.showFullReviewText = !review.showFullReviewText;
  }
}