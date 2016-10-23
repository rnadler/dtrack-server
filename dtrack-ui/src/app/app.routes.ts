import { Routes } from '@angular/router';
import { Register } from './components/register/register';
import { Login } from './components/login/login';
import { MainComponent } from './components/main/main';
import { DataComponent } from "./components/dataComponent/dataComponent";
import { ActivateIfSignedIn } from "./services/activateIfSignedIn";
import { ActivateIfNotSignedIn } from "./services/activateIfNotSignedIn";
import { Logout } from "./components/login/logout";


export const ROUTES: Routes = [
  { path: '',         component: Login, canActivate: [ActivateIfNotSignedIn] },
  { path: 'register', component: Register },
  { path: 'logout',   component: Logout, },
  { path: 'login',    component: Login, canActivate: [ActivateIfNotSignedIn]  },
  { path: 'main',     component: MainComponent, canActivate: [ActivateIfSignedIn] },
  { path: 'data',     component: DataComponent, canActivate: [ActivateIfSignedIn] },
  { path: '**',       component: Login }
];
