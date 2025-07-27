import { Routes } from '@angular/router';
import { HomePage } from './pages/home-page/home-page'; // 1. Importe o seu componente de home

export const routes: Routes = [
  {
    path: '',
    component: HomePage
  }
];