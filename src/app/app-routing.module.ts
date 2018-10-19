import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AdminLoginComponent } from './component/admin-login/admin-login.component';
import { AdminDashboardComponent } from './component/admin-dashboard/admin-dashboard.component';
import { AuthGuardGuard } from './auth-guard.guard';
const routes: Routes = 
[

  { path: 'adminLogin',component: AdminLoginComponent },
  { path: 'adminDashboard',component: AdminDashboardComponent,canActivate:[AuthGuardGuard] },
  { path: '', component: AdminDashboardComponent, pathMatch: 'full', canActivate:[AuthGuardGuard] } 
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
