import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageDialogComponent } from '@app/@shared/dialog/message-dialog/message-dialog.component';
import { MovieService } from '@app/@shared/services/movie.service';
import { CredentialsService } from '@app/auth';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-seat-booking',
  templateUrl: './seat-booking.component.html',
  styleUrls: ['./seat-booking.component.scss'],
})
export class SeatBookingComponent implements OnInit {
  roomId: number;
  room: any;
  time: any;
  bookedSeats: number[] = [];
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private movieService: MovieService,
    private credentialsService: CredentialsService,
    private modalService: NgbModal
  ) {
    const state = this.router.getCurrentNavigation().extras.state;
    this.time = state.time;
  }

  getRoom() {
    this.route.params.subscribe((params) => {
      this.roomId = params.id;
      this.movieService.getRoom(params.id, this.time).subscribe(
        (response) => {
          this.room = response;
          // this.city = this.movie.location[0].location;
          // this.date = this.toDate(this.movie.location[0].schedule[0].date);
        },
        (error) => {}
      );
    });
  }

  selectSeat(isPick: boolean, seat: number, isBooked: boolean) {
    if (!isBooked) {
      const index = this.bookedSeats.findIndex((b) => b === seat);
      if (isPick && index === -1) {
        this.bookedSeats.push(seat);
      }
      if (!isPick && index !== -1) {
        this.bookedSeats.splice(index, 1);
      }
    }
  }

  bookTicket() {
    const userInfo = this.credentialsService.credentials;

    const body = {
      roomId: this.roomId,
      startTime: this.time,
      seats: this.bookedSeats,
      userId: userInfo.userId,
    };
    this.movieService.bookTicket(body).subscribe(
      (response) => {
        this.showMessage(response);
      },
      (error) => {}
    );
  }

  showMessage(response: any) {
    const title = `Booked success movie: ${response.film}, in ${response.room}, on seat(s): ${response.seatsNumber}, at ${response.timeStart}`;
    const modeRef = this.open();
    modeRef.componentInstance.title = title;
    modeRef.closed.subscribe(() => {
      this.router.navigate(['/'], { replaceUrl: true });
    });
  }

  open() {
    return this.modalService.open(MessageDialogComponent);
  }

  ngOnInit() {
    this.getRoom();
  }
}
