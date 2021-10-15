import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '@app/@shared';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { AccountRoutingModule } from './account-routing.module';
import { SettingComponent } from './setting/setting.component';

@NgModule({
  imports: [CommonModule, TranslateModule, SharedModule, NgbModule, AccountRoutingModule],
  declarations: [SettingComponent],
})
export class AccountModule {}
