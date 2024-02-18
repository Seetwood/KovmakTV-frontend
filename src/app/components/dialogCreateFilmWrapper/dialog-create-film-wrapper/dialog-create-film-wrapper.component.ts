import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { MessageResponse } from 'src/app/models/MessageResponse';
import { DialogInformationWrapperComponent } from '../../dialogInformationWrapper/dialog-information-wrapper/dialog-information-wrapper.component';
import { GenreService } from 'src/app/service/genre.service';
import { Genre } from 'src/app/models/Genre';
import { FilmService } from 'src/app/service/film-service';

@Component({
  selector: 'app-dialog-create-film-wrapper',
  templateUrl: './dialog-create-film-wrapper.component.html',
  styleUrls: ['./dialog-create-film-wrapper.component.less']
})
export class DialogCreateFilmWrapperComponent {

  imagefile: string[] = [];
  videofile: string[] = [];
  files: File[];
  form: any = {};
  formData = new FormData();
  genres: Genre[];
  selectedGenre: Genre;
  newGenre: Genre;
  constructor(public dialogRef: MatDialogRef<DialogCreateFilmWrapperComponent>,
    private filmService: FilmService,
    private genreService: GenreService,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any) {
  }
  ngOnInit(): void {
    this.genreService.getAllGenres().subscribe(data => {
      this.genres = data;
    });
    this.newGenre = new Genre();
  };

  onImageSelected(event: any) {
    const file: File = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.imagefile.push(e.target.result);
      this.formData.append(`${e.target.result}`, file);
    };
    reader.readAsDataURL(file);
  }

  onVideoSelected(event: any) {
    const file: File = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.videofile.push(e.target.result);
      this.formData.append(`${e.target.result}`, file);
    };
    reader.readAsDataURL(file);
  }

  deleteImage(index: number): void {
    this.imagefile.splice(index, 1);
  }

  createFilm() {
    const filmDataForm = new FormData();
    if (!this.form.name || !this.form.yearOfRelease || !this.form.duration || !this.form.description || !this.form.country || !this.selectedGenre || !this.selectedGenre.id) {
      const infoDialog = this.dialog.open(DialogInformationWrapperComponent, {
        width: '350px',
        height: '100px',
        data: new MessageResponse("Заполните все обязательные поля!"),
        autoFocus: false
      });
      return;
    }
    this.imagefile.forEach((el) => {
      filmDataForm.append("images", this.formData.get(`${el}`) as File)
    });
    this.videofile.forEach((el) => {
      filmDataForm.append("videos", this.formData.get(`${el}`) as File)
    });
    filmDataForm.append('name', this.form.name);
    filmDataForm.append('yearOfRelease', String(this.form.yearOfRelease));
    filmDataForm.append('duration', String(this.form.duration));
    filmDataForm.append('description', this.form.description);
    filmDataForm.append('country', this.form.country);
    filmDataForm.append('genreId', String(this.selectedGenre.id));
    this.filmService.createFilm(filmDataForm).subscribe(() => {
      this.dialogRef.close();
    });
  }
  createGenre() {
    if (this.newGenre && this.newGenre.genreName) {
      this.genreService.createGenre(this.newGenre).subscribe(() => {
      });
    }
  }

}