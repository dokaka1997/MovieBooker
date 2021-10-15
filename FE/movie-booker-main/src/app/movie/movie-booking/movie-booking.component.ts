import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieService } from '@app/@shared/services/movie.service';

@Component({
  selector: 'app-movie-booking',
  templateUrl: './movie-booking.component.html',
  styleUrls: ['./movie-booking.component.scss'],
})
export class MovieBookingComponent implements OnInit {
  city = 'Hà Nội';
  date = '05/07/2021';
  cinema = 'CGV';
  movie: any;
  locationIndex = 0;
  dateIndex = 0;
  movieId: number;
  constructor(private router: Router, private route: ActivatedRoute, private movieService: MovieService) {}

  getMovie() {
    this.route.params.subscribe((params) => {
      this.movieId = params.id;
      this.movieService.bookingMovie(params.id).subscribe(
        (response) => {
          this.movie = response;
          this.city = this.movie.location[0].location;
          this.date = this.toDate(this.movie.location[0].schedule[0].date);
        },
        (error) => {}
      );
    });
  }
  setLocation(location: string, index: number) {
    this.locationIndex = index;
    this.city = location;
    this.date = this.toDate(this.movie.location[index].schedule[0].date);
  }
  setDate(date: any, index: number) {
    this.dateIndex = index;
    this.date = this.toDate(date);
  }
  toDate(date: any) {
    return new Date(date).toDateString();
  }

  ngOnInit() {
    this.getMovie();
  }
}
