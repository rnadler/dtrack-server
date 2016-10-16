import { Routes } from '@angular/router';
import { Register } from './components/register/register';
import { Login } from './components/login/login';
import { MainComponent } from './components/main/main';
import { DataComponent } from "./components/dataComponent/dataComponent";


export const ROUTES: Routes = [
  { path: '',         component: Login },
  { path: 'register', component: Register },
  { path: 'login',    component: Login },
  { path: 'main',     component: MainComponent },
  { path: 'data',     component: DataComponent },
  { path: '**',        component: Login }
];
