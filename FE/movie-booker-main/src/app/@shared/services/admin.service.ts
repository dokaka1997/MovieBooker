import { HttpClient } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from './api';

@Injectable({
  providedIn: 'root',
})
export class AdminService extends ApiService {
  constructor(private http: HttpClient, public injector: Injector, private router: Router) {
    super(http, injector);
  }

  getTicketsSold() {
    return this.get('manager/ticket');
  }

  geManagerMovie() {
    return this.get('manager/film');
  }

  addMovie(body: any) {
    return this.post('manager/film', body);
  }

  deleteMovie(id: number) {
    return this.delete(`manager/film/${id}`);
  }

  getLocation() {
    return this.get('manager/location');
  }

  getManagerRoom() {
    return this.get('manager/room');
  }

  addRoom(body: any) {
    return this.post('manager/room', body);
  }

  deleteRoom(id: number) {
    return this.delete(`manager/room/${id}`);
  }

  getManagerStaff() {
    return this.get('manager/staff');
  }

  addStaff(body: any) {
    return this.post('manager/staff', body);
  }

  deleteStaff(id: number) {
    return this.delete(`manager/staff/${id}`);
  }
}
