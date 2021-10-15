import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { marker } from '@biesbjerg/ngx-translate-extract-marker';
import { SettingComponent } from './setting/setting.component';

const routes: Routes = [
  // Module is lazy loaded, see app-routing.module.ts
  { path: 'setting', component: SettingComponent, data: { title: marker('Settings Account') } },
  // { path: '', redirectTo: 'movie', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [],
})
export class AccountRoutingModule {}
