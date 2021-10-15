import { Component, OnInit } from '@angular/core';
import { AdminService } from '@app/@shared/services/admin.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-new-room',
  templateUrl: './new-room.component.html',
  styleUrls: ['./new-room.component.scss'],
})
export class NewRoomComponent implements OnInit {
  roomName = '';
  maxSeats = '';
  location = '';
  roomId: any = null;
  constructor(public modal: NgbActiveModal, private adminService: AdminService) {}

  addRoom() {
    const body = {
      id: this.roomId,
      name: this.roomName,
      location: this.location,
      maxSeats: this.maxSeats,
    };
    this.adminService.addRoom(body).subscribe(
      (response) => {
        this.modal.close(true);
      },
      (error) => {}
    );
  }

  ngOnInit() {}
}
