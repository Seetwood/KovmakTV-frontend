import { Component, Input, OnInit } from '@angular/core';
import { Film } from 'src/app/models/Film';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.less']
})
export class MovieCardComponent implements OnInit {

   @Input() film: {
    id: number;
    name: string;
    yearOfRelease:number;
    duration:number;
    description:string;
    country:string;
    genre:{id: number, genreName: string};
    imagesList:{imageName: string, imageUrl: string}[];
  };
  img: String;
  url: string;
  ngOnInit() {
    this.url = new Film().url;
    this.img = this.url + this.film.imagesList[0].imageUrl;
  }

}
