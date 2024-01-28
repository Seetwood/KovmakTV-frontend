import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Genre } from 'src/app/models/Genre';
import { GenreService } from 'src/app/service/genre.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.less']

})
export class IndexComponent implements OnInit{

  genres: Genre[];

  constructor(private genreService: GenreService, private router: Router){}

  ngOnInit() {
    this.genreService.getAllGenres().subscribe((genres: Genre[]) => {
      this.genres = genres;
    });
  }

  slideConfigGenres = {
    "slidesToShow": 5,
    "slidesToScroll": 5,
    "dots": true,
    "infinite": true,
  };

  public movieFilter(filter: string)
  {
    this.router.navigate(['/film-filter', filter]);
  }
}