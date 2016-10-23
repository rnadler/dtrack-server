import { Component } from '@angular/core';
import { LoginService } from '../../services/loginService';

@Component ({
    selector: 'main-component',
    templateUrl: './main.html'
})
export class MainComponent {

    public user: string;
    constructor(private loginService: LoginService) {
        this.user = loginService.getUser();
    }
}
