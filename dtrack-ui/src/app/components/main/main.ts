import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AppState } from "../../app.service";

@Component ({
    selector: 'main-component',
    templateUrl: './main.html'
})
export class MainComponent {

    public user: string;
    constructor(private appState: AppState, private router: Router) {
        this.user = appState.getUser();
    }

    logout() {
        console.log("Logout");
        this.appState.setUser('');
        this.router.navigate(['/login', 'logout']);
    }
}
