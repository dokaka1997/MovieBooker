import { AdminService } from '@app/@shared/services/admin.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-container',
  templateUrl: './admin-container.component.html',
  styleUrls: ['./admin-container.component.scss'],
})
export class AdminContainerComponent implements OnInit {
  ticketSold: any = 0;
  constructor(private adminService: AdminService) {}

  getTicketsSold() {
    this.adminService.getTicketsSold().subscribe(
      (response) => {
        this.ticketSold = response;
      },
      () => {}
    );
  }

  ngOnInit() {
    this.getTicketsSold();
  }
}
