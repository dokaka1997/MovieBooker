import { HttpClient } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from './api';

@Injectable({
  providedIn: 'root',
})
export class StaffService extends ApiService {
  constructor(private http: HttpClient, public injector: Injector, private router: Router) {
    super(http, injector);
  }

  getAllTicket() {
    return this.get('staff/ticket');
  }

  payTicket(id: number) {
    return this.post(`staff/payment-ticket/${id}`);
  }
}
