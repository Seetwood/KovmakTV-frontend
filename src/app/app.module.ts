import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { HttpClientModule } from '@angular/common/http';
import { MatInputModule } from '@angular/material/input';
import { MatSortModule } from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button';
import { SessionStorageService } from 'angular-web-storage';
import { MatSelectModule } from '@angular/material/select';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { MatDialogModule } from '@angular/material/dialog';
import { DialogInformationWrapperComponent } from './components/dialogInformationWrapper/dialog-information-wrapper/dialog-information-wrapper.component';
import { DialogUpdateDataFilmWrapperComponent } from './components/dialogUpdateDataFilmWrapper/dialog-update-data-film-wrapper/dialog-update-data-film-wrapper.component';
import { DialogAddReviewWrapperComponent } from './components/dialogAddReviewWrapper/dialog-add-review-wrapper/dialog-add-review-wrapper.component';
import { DialogCreateFilmWrapperComponent } from './components/dialogCreateFilmWrapper/dialog-create-film-wrapper/dialog-create-film-wrapper.component';
import { DialogUpdateTextReviewWpapperComponent } from './components/dialog-update-text-review-wpapper/dialog-update-text-review-wpapper.component';
import { AuthorizationComponent } from './components/authentication/authorization/authorization.component';
import { RegistrationComponent } from './components/authentication/registration/registration.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { IndexComponent } from './components/index/index/index.component';
import { MovieFilterComponent } from './components/index/index/movie_filter/movie-filter/movie-filter.component';
import { MovieCardComponent } from './components/films/movie-card/movie-card.component';
import { MovieListComponent } from './components/films/movie-list/movie-list.component';
import { PageFilmComponent } from './components/films/page-film/page-film.component';
import { ReviewsComponent } from './components/reviews/reviews/reviews.component';
import { PageReviewComponent } from './components/reviews/page-review/page-review.component';
import { PersonalAccountComponent } from './components/Profile/personal-account/personal-account.component';
import { AdminComponent } from './components/admin/admin/admin.component';

@NgModule({
  declarations: [
    AppComponent,
    MovieCardComponent,
    MovieListComponent,
    NavigationComponent,
    AuthorizationComponent,
    RegistrationComponent,
    IndexComponent,
    MovieFilterComponent,
    PageFilmComponent,
    PersonalAccountComponent,
    ReviewsComponent,
    AdminComponent,
    DialogInformationWrapperComponent,
    DialogUpdateDataFilmWrapperComponent,
    DialogAddReviewWrapperComponent,
    DialogCreateFilmWrapperComponent,
    DialogUpdateTextReviewWpapperComponent,
    PageReviewComponent,
  ],
  imports: [
    ReactiveFormsModule,
    MatDialogModule,
    InfiniteScrollModule,
    SlickCarouselModule,
    MatMenuModule,
    MatIconModule,
    MatSelectModule,
    BrowserModule,
    FormsModule, MatFormFieldModule, MatInputModule,
    BrowserModule,
    MatSortModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    HttpClientModule,
    MatInputModule,
  ],
  providers: [SessionStorageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
