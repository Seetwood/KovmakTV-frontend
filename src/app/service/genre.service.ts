import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Genre } from '../models/Genre';

@Injectable({
  providedIn: 'root'
})
export class GenreService {

  private genresUrl = 'api/film/genres';
  url: string;

  constructor(
    private http: HttpClient) { }

  getAllGenres(): Observable<Genre[]> {
  return this.http.get<Genre[]>(this.genresUrl);
  }
  createGenre(genre: Genre): Observable<Genre> {
    console.log(genre);
    return this.http.post<Genre>(this.genresUrl, genre);
  }
  updateGenre(genre: Genre): Observable<Genre>  {
    return this.http.put<Genre>(this.genresUrl, genre);
  }
  deleteGenre(id: number): Observable<Genre> {
    return this.http.delete<Genre>(this.genresUrl + `/${id}`);
  }
}
