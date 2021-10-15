import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminRoutingModule } from './admin-routing.module';
import { RoomManagementComponent } from './room-management/room-management.component';
import { HistoryManagementComponent } from './history-management/history-management.component';
import { AdminContainerComponent } from './admin-container/admin-container.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovieManagementComponent } from './movie-management/movie-management.component';
import { StaffMamangementComponent } from './staff-mamangement/staff-mamangement.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NewMovieComponent } from './movie-management/new-movie/new-movie.component';
import { NewRoomComponent } from './room-management/new-room/new-room.component';
import { NewStaffComponent } from './staff-mamangement/new-staff/new-staff.component';

@NgModule({
  imports: [CommonModule, FormsModule, NgbModule, ReactiveFormsModule, AdminRoutingModule],
  declarations: [
    AdminContainerComponent,
    HistoryManagementComponent,
    MovieManagementComponent,
    RoomManagementComponent,
    StaffMamangementComponent,
    NewMovieComponent,
    NewRoomComponent,
    NewStaffComponent,
  ],
})
export class AdminModule {}
