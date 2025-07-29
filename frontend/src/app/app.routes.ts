import { Routes } from '@angular/router';
import { HomePage } from './pages/home-page/home-page';
import { LoginComponent } from './pages/login/login';
import { RegisterComponent } from './pages/register/register';

export const routes: Routes = [
  {
    path: '',
    component: HomePage
  },

  {
    path: 'login',
    component: LoginComponent
  },

  {
    path: 'register',
    component: RegisterComponent
  }
];