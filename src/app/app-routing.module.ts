import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AdminLoginComponent } from './component/admin-login/admin-login.component';
import { AdminDashboardComponent } from './component/admin-dashboard/admin-dashboard.component';
import { AuthGuardGuard } from './auth-guard.guard';
import { QuestionAdminComponent } from './component/question-admin/question-admin.component';



const routes: Routes = 
[
  { path: '', component: AdminDashboardComponent, pathMatch: 'full', canActivate:[AuthGuardGuard] },
  { path: 'adminLogin',component: AdminLoginComponent },
  { path: 'adminDashboard',component: AdminDashboardComponent,canActivate:[AuthGuardGuard]},
  { path: 'questions',component:QuestionAdminComponent}
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
