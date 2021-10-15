import { Component, OnInit } from '@angular/core';
import { AdminService } from '@app/@shared/services/admin.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-new-staff',
  templateUrl: './new-staff.component.html',
  styleUrls: ['./new-staff.component.scss'],
})
export class NewStaffComponent implements OnInit {
  name = '';
  email = '';
  username = '';
  password = '';
  age = '';
  staffId: any = null;
  constructor(public modal: NgbActiveModal, private adminService: AdminService) {}

  addStaff() {
    const body = {
      id: this.staffId,
      name: this.name,
      email: this.email,
      username: this.username,
      password: this.password,
      age: this.age,
    };
    this.adminService.addStaff(body).subscribe(
      (response) => {
        this.modal.close(true);
      },
      (error) => {}
    );
  }

  ngOnInit() {}
}
