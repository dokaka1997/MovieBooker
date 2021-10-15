import { StaffContainerComponent } from './staff/staff-container/staff-container.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { Shell } from '@app/shell/shell.service';

const routes: Routes = [
  Shell.childRoutes([
    { path: 'about', loadChildren: () => import('./about/about.module').then((m) => m.AboutModule) },
    { path: 'movies', loadChildren: () => import('./movie/movie.module').then((m) => m.MovieModule) },
    { path: 'account', loadChildren: () => import('./account/account.module').then((m) => m.AccountModule) },
    { path: 'staff', loadChildren: () => import('./staff/staff.module').then((m) => m.StaffModule) },
    { path: 'admin', loadChildren: () => import('./admin/admin.module').then((m) => m.AdminModule) },
  ]),
  // Fallback when no prior route is matched
  { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule],
  providers: [],
})
export class AppRoutingModule {}
