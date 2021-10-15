import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ConfirmDialogComponent } from '@app/@shared/dialog/confirm-dialog/confirm-dialog.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

interface Ticket {
  code: string;
  room: number;
  movie: string;
  date: string;
  start: string;
  end: string;
  isPay: boolean;
}

function search(TICKETS: any[], text: string): Ticket[] {
  return TICKETS.filter((ticket) => {
    const term = text.toLowerCase();
    return ticket.code.toLowerCase().includes(term);
  });
}

@Component({
  selector: 'app-history-management',
  templateUrl: './history-management.component.html',
  styleUrls: ['./history-management.component.scss'],
})
export class HistoryManagementComponent implements OnInit {
  TICKETS: Ticket[] = [
    {
      code: 'ticket1',
      room: 1,
      movie: 'Aquaman',
      date: '5/9/2021',
      start: '6PM',
      end: '8PM',
      isPay: false,
    },
    {
      code: 'ticket2',
      room: 2,
      movie: 'Aquaman',
      date: '5/9/2021',
      start: '6PM',
      end: '8PM',
      isPay: true,
    },
    {
      code: 'ticket3',
      room: 3,
      movie: 'Aquaman',
      date: '5/9/2021',
      start: '6PM',
      end: '8PM',
      isPay: true,
    },
    {
      code: 'ticket4',
      room: 4,
      movie: 'Aquaman',
      date: '5/9/2021',
      start: '6PM',
      end: '8PM',
      isPay: false,
    },
  ];
  ticket$: Observable<Ticket[]>;
  filter = new FormControl('');

  constructor(private modalService: NgbModal) {
    this.ticket$ = this.filter.valueChanges.pipe(
      startWith(''),
      map((text) => search(this.TICKETS, text))
    );
  }

  deleteTicket(index: number) {
    const title = 'Are you sure you want to delete this booked ticket?';
    const modeRef = this.open();
    modeRef.componentInstance.title = title;
    modeRef.closed.subscribe((result) => {
      if (result) {
        this.TICKETS.splice(index, 1);
        this.filter.updateValueAndValidity();
      }
    });
  }

  open() {
    return this.modalService.open(ConfirmDialogComponent);
  }

  ngOnInit() {}
}
