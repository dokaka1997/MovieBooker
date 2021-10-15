import { MovieService } from './../../@shared/services/movie.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.scss'],
})
export class MovieDetailComponent implements OnInit {
  customOptions: OwlOptions = {
    loop: false,
    mouseDrag: true,
    touchDrag: false,
    pullDrag: true,
    dots: false,
    navSpeed: 1000,
    navText: ['<i class="fa fa-angle-left"></i>', '<i class="fa fa-angle-right"></i>'],
    animateOut: 'fadeOut',
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 2,
      },
      740: {
        items: 3,
      },
      940: {
        items: 4,
      },
    },
    nav: false,
  };
  customOptionsAuto: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: false,
    pullDrag: true,
    dots: false,
    navSpeed: 1000,
    autoplay: true,
    autoplayTimeout: 1500,
    animateOut: 'fadeOut',
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 2,
      },
      740: {
        items: 3,
      },
      940: {
        items: 4,
      },
    },
  };
  movie: any;
  movieId: any;
  constructor(private router: Router, private route: ActivatedRoute, private movieService: MovieService) {}

  bookTicket() {
    this.router.navigate(['/movies/movie-booking', this.movieId]);
  }

  getMovie() {
    this.route.params.subscribe((params) => {
      this.movieId = params.id;
      this.movieService.getMovieDetail(params.id).subscribe(
        (response) => {
          this.movie = response;
        },
        (error) => {}
      );
    });
  }

  ngOnInit() {
    this.getMovie();
  }
}
