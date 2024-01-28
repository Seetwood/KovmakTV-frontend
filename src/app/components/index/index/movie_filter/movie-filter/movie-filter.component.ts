import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Film } from 'src/app/models/Film';
import { FilmService } from 'src/app/service/film-service';

@Component({
  selector: 'app-movie-filter',
  templateUrl: './movie-filter.component.html',
  styleUrls: ['./movie-filter.component.less']
})
export class MovieFilterComponent implements OnInit {
  films: Film[];
  filterByGenre: string;
  url: string;

  pageSize = 4;
  currentPage = 0;
  totalPages: number;

  constructor(private route: ActivatedRoute,
    private filmsService: FilmService,
    private router: Router) {}

  ngOnInit() {
    this.filterByGenre = this.route.snapshot.paramMap.get('filter')!;
    this.filmsService.getFilmsByGenre(this.currentPage, this.pageSize, this.filterByGenre).subscribe((films: any) => {
    this.films = films.content;
    this.totalPages = films.totalPages;
    this.url = new Film().url;
  });
  }

  onScroll(): void {
    if (this.currentPage < this.totalPages - 1) {
      this.currentPage++;
      this.filmsService.getFilmsByGenre(this.currentPage, this.pageSize, this.filterByGenre).subscribe((films: any) => {
        this.films.push(...films.content);
      });
    }
  }

  getFilmImageUrl(film: Film): string {
    return this.url + film.imagesList[0].imageUrl;
  }

  navigateToFilmPage(film: Film) {
    this.router.navigate(['/film', film.id]);
  }
}
