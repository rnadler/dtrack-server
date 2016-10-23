import { Component } from '@angular/core';
import { LoginService } from '../../services/loginService';


@Component({
    selector: 'logout',
    template: '<div></div>'
})

export class Logout {

    constructor(private loginService: LoginService) {
    }

    private ngOnInit() {
        console.log("Logout: Logout");
        this.loginService.successLogout();
    };
}
