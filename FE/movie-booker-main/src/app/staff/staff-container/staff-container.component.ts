import { StaffService } from './../../@shared/services/staff.service';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ConfirmDialogComponent } from '@app/@shared/dialog/confirm-dialog/confirm-dialog.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

function search(TICKETS: any[], text: string): any[] {
  return TICKETS.filter((ticket) => {
    const term = text.toLowerCase();
    if (ticket.id) {
      return ticket.id.toString().toLowerCase().includes(term);
    } else {
      return true;
    }
  });
}

@Component({
  selector: 'app-staff-container',
  templateUrl: './staff-container.component.html',
  styleUrls: ['./staff-container.component.scss'],
})
export class StaffContainerComponent implements OnInit {
  TICKETS: any = [];
  ticket$: Observable<any[]>;
  filter = new FormControl('');

  constructor(private modalService: NgbModal, private staffService: StaffService) {
    this.ticket$ = this.filter.valueChanges.pipe(
      startWith(''),
      map((text) => search(this.TICKETS, text))
    );
  }

  getAllTicket() {
    this.staffService.getAllTicket().subscribe(
      (response) => {
        this.TICKETS = response;
        this.filter.updateValueAndValidity();
      },
      () => {}
    );
  }

  toDate(date: any) {
    return new Date(date).toDateString();
  }

  pay(id: number) {
    const title = 'Are you sure you want to pay this booked ticket?';
    const modeRef = this.open();
    modeRef.componentInstance.title = title;
    modeRef.closed.subscribe((result) => {
      if (result) {
        this.staffService.payTicket(id).subscribe(
          () => {
            this.getAllTicket();
          },
          () => {}
        );
      }
    });
  }

  open() {
    return this.modalService.open(ConfirmDialogComponent);
  }

  refresh() {
    this.getAllTicket();
  }

  ngOnInit() {
    this.getAllTicket();
  }
}
