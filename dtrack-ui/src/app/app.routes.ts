import { Routes} from '@angular/router';
import {Register} from "./components/register/register";
import {Login} from "./components/login/login"


export const ROUTES: Routes = [
  { path: '',      component: Login },
  { path: 'register', component: Register },
  { path: 'login', component: Login },
  { path: '**',    component: Login },
];
