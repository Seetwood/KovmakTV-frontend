import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './components/index/index/index.component';
import { AuthGuard } from './auth/auth.guard';
import { MovieListComponent } from './components/films/movie-list/movie-list.component';
import { AuthorizationComponent } from './components/authentication/authorization/authorization.component';
import { RegistrationComponent } from './components/authentication/registration/registration.component';
import { MovieFilterComponent } from './components/index/index/movie_filter/movie-filter/movie-filter.component';
import { PageFilmComponent } from './components/films/page-film/page-film.component';
import { PersonalAccountComponent } from './components/Profile/personal-account/personal-account.component';
import { AdminComponent } from './components/admin/admin/admin.component';
import { ReviewsComponent } from './components/reviews/reviews/reviews.component';
import { PageReviewComponent } from './components/reviews/page-review/page-review.component';

const routes: Routes = [
  {
    path: '',
    component: IndexComponent,
  },
  {
    path: 'login',
    component: AuthorizationComponent,
  },
  {
    path: 'registration',
    component: RegistrationComponent,
  },
  {
    path: 'index',
    component: IndexComponent,
  },
  {
    path: 'film-filter/:filter',
    component: MovieFilterComponent
  },
  {
    path: 'filmsPoster',
    component: MovieListComponent,
  },
  {
    path: 'film/:id',
    component: PageFilmComponent,
  },
  {
    path: 'profile',
    component: PersonalAccountComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'admin-panel',
    component: AdminComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'reviews-user/:id',
    component: ReviewsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'review/:reviewId',
    component: PageReviewComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

