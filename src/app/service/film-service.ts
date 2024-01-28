import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Film } from '../models/Film';

@Injectable({
  providedIn: 'root'
})
export class FilmService {

  url: string;

  constructor(
    private http: HttpClient) {
      this.url = 'api/film/';
     }
  
  getPageFilm(id = 1): Observable<Film> {
    return this.http.get<Film>(this.url + `id=${id}`);
  }

  getAllFilms(pageIndex: number, pageSize: number): Observable<Film[]> {
    return this.http.get<Film[]>(this.url + `shortFilmsInfo?pageIndex=${pageIndex}&pageSize=${pageSize}`);
  }

  getFilmsByGenre(pageIndex: number, pageSize: number, filter = ""): Observable<Film[]> {
    return this.http.get<Film[]>(this.url + `shortFilmsInfo?pageIndex=${pageIndex}&pageSize=${pageSize}&filter=${filter}`);
  }

  createFilm(form:FormData):Observable<any>{
    return this.http.post<any>( this.url, form);
  }
  updateFilm(form:FormData, filmId:number):Observable<any>{
    return this.http.put<any>( this.url + `${filmId}`, form);
  }
}
