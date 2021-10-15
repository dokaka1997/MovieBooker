import { AdminService } from '@app/@shared/services/admin.service';
import { MovieService } from '@app/@shared/services/movie.service';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ConfirmDialogComponent } from '@app/@shared/dialog/confirm-dialog/confirm-dialog.component';
import { NgbModal, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { NewMovieComponent } from './new-movie/new-movie.component';

function search(MOVIES: any[], text: string): any[] {
  return MOVIES.filter((movie) => {
    const term = text.toLowerCase();
    if (movie.name) {
      return movie.name.toLowerCase().includes(term);
    } else {
      return true;
    }
  });
}

@Component({
  selector: 'app-movie-management',
  templateUrl: './movie-management.component.html',
  styleUrls: ['./movie-management.component.scss'],
})
export class MovieManagementComponent implements OnInit {
  MOVIES: any = [];
  movie$: Observable<any[]>;
  filter = new FormControl('');

  constructor(private modalService: NgbModal, private adminService: AdminService) {
    this.movie$ = this.filter.valueChanges.pipe(
      startWith(''),
      map((text) => search(this.MOVIES, text))
    );
  }

  getListMovie() {
    this.adminService.geManagerMovie().subscribe(
      (response) => {
        this.MOVIES = response;
        this.filter.updateValueAndValidity();
      },
      (error) => {}
    );
  }

  deleteMovie(id: number) {
    const title = 'Are you sure you want to delete this booked ticket?';
    const modeRef = this.open();
    modeRef.componentInstance.title = title;
    modeRef.closed.subscribe((result) => {
      if (result) {
        this.adminService.deleteMovie(id).subscribe(
          (response) => {
            this.getListMovie();
          },
          (error) => {}
        );
      }
    });
  }

  addMovie() {
    const newMovie = this.modalService.open(NewMovieComponent, { windowClass: 'new-movie-modal' });
    newMovie.closed.subscribe((result) => {
      if (result) {
        this.getListMovie();
      }
    });
  }

  editMovie(movie: any) {
    const newMovie = this.modalService.open(NewMovieComponent, { windowClass: 'new-movie-modal' });
    newMovie.componentInstance.movieName = movie.name;
    newMovie.componentInstance.ACTORS = movie.actor;
    newMovie.componentInstance.CREWS = movie.crew;
    newMovie.componentInstance.type = movie.filmType;
    newMovie.componentInstance.image = movie.image;
    newMovie.componentInstance.price = movie.price;
    newMovie.componentInstance.duration = movie.time;
    newMovie.componentInstance.language = movie.language;
    newMovie.componentInstance.poster = movie.poster;
    newMovie.componentInstance.imageInFilm = movie.imageInFilm;
    newMovie.componentInstance.introduce = movie.introduce;
    newMovie.componentInstance.movieId = movie.id;
    newMovie.componentInstance.roomId = movie.roomId;
    newMovie.componentInstance.datePub = this.toNgDate(movie.dateOfpublication);
    newMovie.componentInstance.timeShow = movie.startTime;
    newMovie.componentInstance.location = movie.location;
    newMovie.componentInstance.linkTrailer = movie.link;
    newMovie.closed.subscribe((result) => {
      if (result) {
        this.getListMovie();
      }
    });
  }

  toNgDate(date: any) {
    const d = new Date(date);
    const nD: NgbDateStruct = {
      year: d.getFullYear(),
      month: d.getMonth() + 1,
      day: d.getDate(),
    };

    return nD;
  }

  open() {
    return this.modalService.open(ConfirmDialogComponent);
  }

  toDate(date: any) {
    return new Date(date).toDateString();
  }

  ngOnInit() {
    this.getListMovie();
  }
}
