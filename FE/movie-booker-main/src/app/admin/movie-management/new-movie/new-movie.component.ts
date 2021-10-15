import { Component, OnInit } from '@angular/core';
import { AdminService } from '@app/@shared/services/admin.service';
import { NgbActiveModal, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

interface actor {
  name: string;
  image: string;
  nameInFilm: string;
}

interface crew {
  name: string;
  image: string;
  role: string;
}

interface image {
  id: string;
  linkImage: string;
}

@Component({
  selector: 'app-new-movie',
  templateUrl: './new-movie.component.html',
  styleUrls: ['./new-movie.component.scss'],
})
export class NewMovieComponent implements OnInit {
  movieId: any = null;
  ACTORS: actor[] = [];
  CREWS: crew[] = [];
  movieName = '';
  type = '';
  image = '';
  price = 0;
  duration = '';
  language = '';
  introduce = '';
  poster = '';
  datePub: NgbDateStruct;
  timeShow = 0;
  roomId = 0;
  location = 0;
  imageInFilm: image[] = [];
  listLocation: any = [];
  listRoom: any = [];
  linkTrailer = '';

  constructor(public modal: NgbActiveModal, private adminService: AdminService) {}

  addActor() {
    this.ACTORS.push({
      name: '',
      image: '',
      nameInFilm: '',
    });
  }
  removeActor(index: number) {
    this.ACTORS.splice(index, 1);
  }
  addCrew() {
    this.CREWS.push({
      name: '',
      image: '',
      role: '',
    });
  }
  removeCrew(index: number) {
    this.CREWS.splice(index, 1);
  }

  addFilmImage() {
    this.imageInFilm.push({
      id: '',
      linkImage: '',
    });
  }

  removeFilmImage(index: number) {
    this.imageInFilm.splice(index, 1);
  }

  addMovie() {
    const body = {
      id: this.movieId,
      name: this.movieName,
      filmType: this.type,
      image: this.image,
      price: this.price,
      time: this.duration,
      language: this.language,
      introduce: this.introduce,
      poster: this.poster,
      imageInFilm: this.imageInFilm,
      actor: this.ACTORS,
      crew: this.CREWS,
      roomId: this.roomId,
      date: this.dateToNumber(this.datePub),
      startTime: this.timeShow,
      location: this.location,
      link: this.linkTrailer,
    };
    this.adminService.addMovie(body).subscribe(
      (response) => {
        this.modal.close(true);
      },
      (error) => {}
    );
  }
  dateToNumber(date: NgbDateStruct) {
    const d = date.year + '-' + date.month + '-' + date.day;
    return new Date(d).getTime();
  }

  limitTime(event: any) {
    if (parseInt(event.target.value, 10) > 23) {
      this.timeShow = 23;
      event.target.value = 23;
    } else {
      this.timeShow = parseInt(event.target.value, 10);
    }
    if (parseInt(event.target.value, 10) < 0) {
      this.timeShow = 0;
      event.target.value = 0;
    } else {
      this.timeShow = parseInt(event.target.value, 10);
    }
  }

  getLocation() {
    this.adminService.getLocation().subscribe(
      (response) => {
        this.listLocation = response;

        this.location = this.listLocation[0].id;
      },
      (error) => {}
    );
  }
  getRoom() {
    this.adminService.getManagerRoom().subscribe(
      (response) => {
        this.listRoom = response;
        this.roomId = this.listRoom[0].id;
      },
      (error) => {}
    );
  }

  ngOnInit() {
    this.getRoom();
    this.getLocation();
  }
}
