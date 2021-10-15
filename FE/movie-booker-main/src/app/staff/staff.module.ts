import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '@app/@shared';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { StaffContainerComponent } from './staff-container/staff-container.component';
import { StaffRoutingModule } from './staff-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    SharedModule,
    NgbModule,
    StaffRoutingModule,
  ],
  declarations: [StaffContainerComponent],
})
export class StaffModule {}
