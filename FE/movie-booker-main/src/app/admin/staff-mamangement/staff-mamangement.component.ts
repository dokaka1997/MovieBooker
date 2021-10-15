import { NewStaffComponent } from './new-staff/new-staff.component';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ConfirmDialogComponent } from '@app/@shared/dialog/confirm-dialog/confirm-dialog.component';
import { AdminService } from '@app/@shared/services/admin.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

function search(STAFFS: any[], text: string): any[] {
  return STAFFS.filter((staff) => {
    const term = text.toLowerCase();
    if (staff.name) {
      return staff.name.toLowerCase().includes(term);
    } else {
      return true;
    }
  });
}

@Component({
  selector: 'app-staff-mamangement',
  templateUrl: './staff-mamangement.component.html',
  styleUrls: ['./staff-mamangement.component.scss'],
})
export class StaffMamangementComponent implements OnInit {
  staffs$: Observable<any[]>;
  filter = new FormControl('');
  STAFFS: any = [];

  constructor(private modalService: NgbModal, private adminService: AdminService) {
    this.staffs$ = this.filter.valueChanges.pipe(
      startWith(''),
      map((text) => search(this.STAFFS, text))
    );
  }

  getListStaff() {
    this.adminService.getManagerStaff().subscribe(
      (response) => {
        this.STAFFS = response;
        this.filter.updateValueAndValidity();
      },
      (error) => {}
    );
  }

  addStaff() {
    const newStaff = this.modalService.open(NewStaffComponent);
    newStaff.closed.subscribe((result) => {
      if (result) {
        this.getListStaff();
      }
    });
  }

  editStaff(staff: any) {
    const newMovie = this.modalService.open(NewStaffComponent);
    newMovie.componentInstance.name = staff.name;
    newMovie.componentInstance.email = staff.email;
    newMovie.componentInstance.username = staff.username;
    newMovie.componentInstance.password = staff.password;
    newMovie.componentInstance.age = staff.age;
    newMovie.componentInstance.staffId = staff.id;
    newMovie.closed.subscribe((result) => {
      if (result) {
        this.getListStaff();
      }
    });
  }

  deleteStaff(id: number) {
    const title = 'Are you sure you want to delete this booked ticket?';
    const modeRef = this.open();
    modeRef.componentInstance.title = title;
    modeRef.closed.subscribe((result) => {
      if (result) {
        this.adminService.deleteStaff(id).subscribe(
          (response) => {
            this.getListStaff();
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
    this.getListStaff();
  }
}
