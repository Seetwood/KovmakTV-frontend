import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Film } from 'src/app/models/Film';
import { FilmService } from 'src/app/service/film-service';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.less']
})
export class MovieListComponent implements OnInit {
  films: Film[];
  pageSize = 15;
  currentPage = 0;
  totalPages: number;

  constructor(private filmsService: FilmService, private router: Router) { }

  ngOnInit() {
    this.filmsService.getAllFilms(this.currentPage, this.pageSize).subscribe((films: any) => {
      this.films = films.content;
      this.totalPages = films.totalPages;
    });
  }

  onScroll(): void {
    if (this.currentPage < this.totalPages - 1) {
      this.currentPage++;
      this.filmsService.getAllFilms(this.currentPage, this.pageSize).subscribe((films: any) => {
        this.films.push(...films.content);
      });
    }
  }

  navigateToFilmPage(film: Film) {
    this.router.navigate(['/film', film.id]);
  }

}