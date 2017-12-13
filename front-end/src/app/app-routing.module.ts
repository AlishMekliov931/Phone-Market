import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { NotFoundComponent } from './components/sheard/not-found/not-found.component';
import { LogoutComponent } from './components/auth/logout/logout';
import { AdminGuard } from './core/guards/admin/admin.guard';

const routes: Routes = [
  {path: '',  redirectTo:'home', pathMatch: 'full'},
  {path: 'home',  component: HomeComponent},
  {path: 'logout',  component: LogoutComponent},
  {path: 'phone',  loadChildren: "app/components/phone/phone.module#PhoneModule"},
  {path: '**',  component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
