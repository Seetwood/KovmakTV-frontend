import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Comments } from '../models/Comment';
import { SaveComment } from '../models/SaveComment';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  private commentUrl = 'api/reviews/comments';
  url: string;

  constructor(
    private http: HttpClient) { }

  getCommentsForReview(reviewId: number): Observable<Comments[]> {
  return this.http.get<Comments[]>(this.commentUrl + `/${reviewId}`);
  }
  createCommentForReview(reviewId: number, comment: SaveComment): Observable<SaveComment> {
    return this.http.post<SaveComment>(this.commentUrl + `/${reviewId}`, comment);
  }

  createCommentForComment(reviewId: number, id: number, comment: SaveComment): Observable<SaveComment> {
    return this.http.post<SaveComment>(this.commentUrl + `/${reviewId}/?parentCommentId=${id}`, comment);
  }
}
