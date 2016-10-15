import { Component, ViewEncapsulation } from '@angular/core';
import { LoginService } from './services/loginService';

/*
 * App Component
 * Top Level Component
 */
@Component({
  selector: 'app',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './app.template.html'
})
export class App {

  constructor(
      private loginService: LoginService) {

  }

}
