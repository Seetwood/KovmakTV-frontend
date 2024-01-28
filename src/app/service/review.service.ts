import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Review } from '../models/Review';
import { SaveReview } from '../models/SaveReview';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  private reviewsUrl = 'api/reviews/';
  url: string;

  constructor(
    private http: HttpClient) { }

  getVerifiedReviewByFilm(filmId: number, pageIndex: number, pageSize: number): Observable<Review[]> {
  return this.http.get<Review[]>(this.reviewsUrl + "film/" + `${filmId}?pageIndex=${pageIndex}&pageSize=${pageSize}`);
  }

  getAllReviews(): Observable<Review[]> {
    return this.http.get<Review[]>(this.reviewsUrl);
  }

  getAllReviewForUser(status: string): Observable<Review[]> {
    return this.http.get<Review[]>("/api/profile/reviews/" + `${status}`);
  }

  getPageReview(reviewId: number): Observable<Review> {
    return this.http.get<Review>("/api/reviews/reviews-user/" + `${reviewId}`);
  }

  createReview(filmId: number, review: SaveReview): Observable<SaveReview> {
    return this.http.post<SaveReview>(this.reviewsUrl + "film/" + `${filmId}`, review);
  }

  updateStatusReview(userId: number, filmId: number, status: string, review: Review): Observable<Review>{
    return this.http.put<any>(this.reviewsUrl + `${filmId}/${userId}/${status}`, review);
  }

  updateReview(userId: number, filmId: number, review: Review): Observable<Review>{
    return this.http.put<any>("/api/profile/review/" + `${filmId}/${userId}`, review);
  }

}
