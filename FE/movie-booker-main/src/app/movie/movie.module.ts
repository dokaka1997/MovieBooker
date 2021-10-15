import { MovieDetailComponent } from './movie-detail/movie-detail.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { MovieRoutingModule } from './movie-routing.module';
import { SharedModule } from '@app/@shared';
import { MovieBookingComponent } from './movie-booking/movie-booking.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SeatBookingComponent } from './seat-booking/seat-booking.component';
import { MovieHomeComponent } from './movie-home/movie-home.component';

@NgModule({
  imports: [CommonModule, TranslateModule, SharedModule, NgbModule, MovieRoutingModule],
  declarations: [MovieHomeComponent, MovieDetailComponent, MovieBookingComponent, SeatBookingComponent],
})
export class MovieModule {}
