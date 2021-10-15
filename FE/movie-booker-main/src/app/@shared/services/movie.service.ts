import { HttpClient } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from './api';

@Injectable({
  providedIn: 'root',
})
export class MovieService extends ApiService {
  constructor(private http: HttpClient, public injector: Injector, private router: Router) {
    super(http, injector);
  }

  createAccount(body: any) {
    return this.post(`user/create-account`, body);
  }

  login(body: any) {
    return this.post(`login`, body);
  }

  getAllMovie() {
    return this.get('user/get-all-film');
  }

  getMovieDetail(id: number) {
    return this.get(`user/get-film-by-id/${id}`);
  }

  bookingMovie(id: number) {
    return this.get(`user/booking-film/${id}`);
  }

  getRoom(id: number, time: string) {
    return this.post('user/seat-booking', { idRoom: id, time });
  }

  bookTicket(body: any) {
    // return this
    return this.post('user/order', body);
  }
}
