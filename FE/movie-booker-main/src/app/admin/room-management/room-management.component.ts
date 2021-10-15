import { NewRoomComponent } from './new-room/new-room.component';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ConfirmDialogComponent } from '@app/@shared/dialog/confirm-dialog/confirm-dialog.component';
import { AdminService } from '@app/@shared/services/admin.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

function search(ROOMS: any[], text: string): any[] {
  return ROOMS.filter((room) => {
    const term = text.toLowerCase();
    if (room.name) {
      return room.name.toLowerCase().includes(term);
    } else {
      return true;
    }
  });
}

@Component({
  selector: 'app-room-management',
  templateUrl: './room-management.component.html',
  styleUrls: ['./room-management.component.scss'],
})
export class RoomManagementComponent implements OnInit {
  ROOMS: any = [];
  rooms$: Observable<any[]>;
  filter = new FormControl('');

  constructor(private modalService: NgbModal, private adminService: AdminService) {
    this.rooms$ = this.filter.valueChanges.pipe(
      startWith(''),
      map((text) => search(this.ROOMS, text))
    );
  }

  getListRoom() {
    this.adminService.getManagerRoom().subscribe(
      (response) => {
        this.ROOMS = response;
        this.filter.updateValueAndValidity();
      },
      (error) => {}
    );
  }

  addRoom() {
    const newRoom = this.modalService.open(NewRoomComponent);
    newRoom.closed.subscribe((result) => {
      if (result) {
        this.getListRoom();
      }
    });
  }

  editRoom(room: any) {
    const newMovie = this.modalService.open(NewRoomComponent);
    newMovie.componentInstance.roomName = room.name;
    newMovie.componentInstance.location = room.location;
    newMovie.componentInstance.maxSeats = room.maxSeats;
    newMovie.componentInstance.roomId = room.id;
    newMovie.closed.subscribe((result) => {
      if (result) {
        this.getListRoom();
      }
    });
  }

  deleteRoom(id: number) {
    const title = 'Are you sure you want to delete this booked ticket?';
    const modeRef = this.open();
    modeRef.componentInstance.title = title;
    modeRef.closed.subscribe((result) => {
      if (result) {
        this.adminService.deleteRoom(id).subscribe(
          (response) => {
            this.getListRoom();
          },
          (error) => {}
        );
      }
    });
  }

  open() {
    return this.modalService.open(ConfirmDialogComponent);
  }

  ngOnInit() {
    this.getListRoom();
  }
}
