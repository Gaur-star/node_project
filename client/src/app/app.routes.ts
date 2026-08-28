import {
  Routes
} from '@angular/router';

import {
  authGuard
} from './core/guards/auth.guard';

import {
  LoginComponent
} from './pages/login/login.component';

import {
  RegisterComponent
} from './pages/register/register.component';

import {
  VerifyCodeComponent
} from './pages/verify-code/verify-code.component';

import {
  ForgotPasswordComponent
} from './pages/forgot-password/forgot-password.component';

import {
  ResetPasswordComponent
} from './pages/reset-password/reset-password.component';

import {
  DashboardComponent
} from './pages/dashboard/dashboard.component';

export const routes: Routes = [

  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },

  {
    path: 'login',
    component: LoginComponent
  },

  {
    path: 'register',
    component: RegisterComponent
  },

  {
    path: 'verify-code',
    component: VerifyCodeComponent
  },

  {
    path: 'forgot-password',
    component: ForgotPasswordComponent
  },

  {
    path: 'reset-password',
    component: ResetPasswordComponent
  },

  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [authGuard]
  },

  {
    path: '**',
    redirectTo: 'login'
  }
];