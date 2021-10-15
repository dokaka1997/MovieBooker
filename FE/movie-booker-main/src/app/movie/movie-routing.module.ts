import { NgModule } from '@angular/core';
import { RouterModule, Routes, CanActivate } from '@angular/router';
import { AuthenticationGuard } from '@app/auth';
import { marker } from '@biesbjerg/ngx-translate-extract-marker';
import { MovieBookingComponent } from './movie-booking/movie-booking.component';
import { MovieDetailComponent } from './movie-detail/movie-detail.component';
import { MovieHomeComponent } from './movie-home/movie-home.component';
import { SeatBookingComponent } from './seat-booking/seat-booking.component';

const routes: Routes = [
  // Module is lazy loaded, see app-routing.module.ts
  { path: '', component: MovieHomeComponent, data: { title: marker('Movie Home') } },
  { path: 'movie-detail/:id', component: MovieDetailComponent, data: { title: marker('Movie Detail') } },
  { path: 'movie-booking/:id', component: MovieBookingComponent, data: { title: marker('Movie Booking') } },
  {
    path: 'seat-booking/:id',
    component: SeatBookingComponent,
    data: { title: marker('Seat Booking') },
    canActivate: [AuthenticationGuard],
  },
  // { path: '', redirectTo: 'movie', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [],
})
export class MovieRoutingModule {}
