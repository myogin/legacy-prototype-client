import { PrefixNot } from '@angular/compiler';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
  NbAuthComponent,
  NbLoginComponent,
  NbRegisterComponent,
  NbLogoutComponent,
  NbRequestPasswordComponent,
  NbResetPasswordComponent,
} from '@nebular/auth';
import { AuthGuard } from './core/guards/auth.guard';
import { RoleGuard } from './core/guards/role.guard';
import { DashboardLayoutComponent } from './layouts/dashboard-layout/dashboard-layout.component';
import { LoginLayoutComponent } from './layouts/login-layout/login-layout.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'prefix',
      },
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./features/page/dashboard/dashboard.module').then(
            (m) => m.DashboardModule
          ),
      },
      {
        path: 'agent',
        loadChildren: () =>
          import('./features/page/agent/agent.module').then(
            (m) => m.AgentModule
          ),
        canActivate: [RoleGuard],
        data: { permission: ['admin', 'agent'] },
      },
      {
        path: 'payroll',
        loadChildren: () =>
          import('./features/page/payroll/payroll.module').then(
            (m) => m.PayrollModule
          ),
        canActivate: [RoleGuard],
        data: { permission: ['admin', 'staff'] },
      },
      {
        path: 'staff',
        loadChildren: () =>
          import('./features/page/staff/staff.module').then(
            (m) => m.StaffModule
          ),
        canActivate: [RoleGuard],
        data: { permission: ['admin'] },
      },
    ],
  },
  {
    path: '',
    component: LoginLayoutComponent,
    children: [
      {
        path: 'auth',
        component: NbAuthComponent,
        children: [
          {
            path: '',
            redirectTo: 'login',
            pathMatch: 'prefix',
          },
          {
            path: 'login',
            component: NbLoginComponent,
          },
          {
            path: 'register',
            component: NbRegisterComponent,
          },
          {
            path: 'logout',
            component: NbLogoutComponent,
          },
          {
            path: 'request-password',
            component: NbRequestPasswordComponent,
          },
          {
            path: 'reset-password',
            component: NbResetPasswordComponent,
          },
        ],
      },
    ],
  },
  {
    path: '**',
    component: DashboardLayoutComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
