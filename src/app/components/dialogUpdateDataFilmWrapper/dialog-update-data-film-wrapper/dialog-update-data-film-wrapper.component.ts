import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { MessageResponse } from 'src/app/models/MessageResponse';
import { Film } from 'src/app/models/Film';
import { DialogInformationWrapperComponent } from '../../dialogInformationWrapper/dialog-information-wrapper/dialog-information-wrapper.component';
import { GenreService } from 'src/app/service/genre.service';
import { Genre } from 'src/app/models/Genre';
import { FilmService } from 'src/app/service/film-service';

@Component({
  selector: 'app-dialog-update-data-film-wrapper',
  templateUrl: './dialog-update-data-film-wrapper.component.html',
  styleUrls: ['./dialog-update-data-film-wrapper.component.less']
})

export class DialogUpdateDataFilmWrapperComponent implements OnInit {

  updateFilm: Film;
  formData = new FormData();
  genres: Genre[];
  selectedGenre: Genre;

  constructor(public dialogRef: MatDialogRef<DialogUpdateDataFilmWrapperComponent>,
    private filmService: FilmService,
    private genreService: GenreService,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public oldFilm: any) {
    this.updateFilm = { ...oldFilm };
  }
  ngOnInit(): void {
    this.genreService.getAllGenres().subscribe(genres => {
      this.genres = genres;
    });
    this.selectedGenre = this.updateFilm.genre;
  }

  updateFilmData() {
    if (!this.updateFilm.name || !this.updateFilm.yearOfRelease || !this.updateFilm.duration || !this.updateFilm.description) {
      const infoDialog = this.dialog.open(DialogInformationWrapperComponent, {
        width: '350px',
        height: '100px',
        data: new MessageResponse("Заполните все обязательные поля!"),
        autoFocus: false
      });
      return;
    }
    const formData = new FormData();
    formData.append('name', this.updateFilm.name);
    formData.append('yearOfRelease', String(this.updateFilm.yearOfRelease));
    formData.append('duration', String(this.updateFilm.duration));
    formData.append('description', this.updateFilm.description);
    formData.append('country', this.updateFilm.country);
    formData.append('genreId', String(this.selectedGenre.id));
    this.filmService.updateFilm(formData, this.updateFilm.id).subscribe(() => {
      this.dialogRef.close();
    });
  }
}