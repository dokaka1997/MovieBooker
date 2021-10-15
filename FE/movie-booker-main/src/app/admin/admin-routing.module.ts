import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { marker } from '@biesbjerg/ngx-translate-extract-marker';
import { AdminContainerComponent } from './admin-container/admin-container.component';
import { HistoryManagementComponent } from './history-management/history-management.component';
import { MovieManagementComponent } from './movie-management/movie-management.component';
import { RoomManagementComponent } from './room-management/room-management.component';
import { StaffMamangementComponent } from './staff-mamangement/staff-mamangement.component';

const routes: Routes = [
  // Module is lazy loaded, see app-routing.module.ts
  {
    path: '',
    component: AdminContainerComponent,
    data: { title: marker('Admin Container') },
    children: [
      { path: 'movie-management', component: MovieManagementComponent, data: { title: marker('Movie Management') } },
      { path: 'room-management', component: RoomManagementComponent, data: { title: marker('Room Management') } },
      { path: 'staff-management', component: StaffMamangementComponent, data: { title: marker('Staff Management') } },
      {
        path: 'history-management',
        component: HistoryManagementComponent,
        data: { title: marker('History Management') },
      },
      { path: '', redirectTo: 'movie-management', pathMatch: 'full' },
    ],
  },
  // { path: 'movie-management', component: MovieManagementComponent, data: { title: marker('Movie Management') } },
  // { path: 'room-management', component: RoomManagementComponent, data: { title: marker('Room Management') } },
  // { path: 'staff-management', component: StaffMamangementComponent, data: { title: marker('Staff Management') } },
  // { path: 'hitory-management', component: HistoryManagementComponent, data: { title: marker('History Management') } },
  // { path: '', redirectTo: 'movie', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [],
})
export class AdminRoutingModule {}
