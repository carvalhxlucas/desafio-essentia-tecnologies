import { Routes } from '@angular/router';
import { HomePage } from './pages/home-page/home-page';
import { LoginComponent } from './pages/login/login.service';
import { RegisterComponent } from './pages/register/register.service';

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