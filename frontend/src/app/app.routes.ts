import { Routes } from '@angular/router';
import { HomePage } from './pages/home-page/home-page';
import { Login } from './pages/login/login';
import { Register } from './pages/register/register';
import { authGuard } from './shared/guards/auth-guard';

export const routes: Routes = [
  {
    path: '',
    component: HomePage,
    canActivate: [authGuard]
  },

  {
    path: 'login',
    component: Login
  },

  {
    path: 'register',
    component: Register
  }
];