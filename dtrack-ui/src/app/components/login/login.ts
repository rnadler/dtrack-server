import { Component} from '@angular/core';
import {AppState} from "../../app.service";


@Component({
    selector: 'login',
    templateUrl: './login.html',
})

export class Login {
    public login = {
        username: null,
        password: null
   };
    constructor(public appState: AppState) {
    }

    submit() {
        console.log("Login submit " + this.login.username);
        this.appState.set('value', this.login.username);
    }

}