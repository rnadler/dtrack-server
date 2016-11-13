import { Component, ViewChild } from '@angular/core';
import { LoginService } from '../../services/loginService';
import { LogAlert} from "../logAlert/logAlert";

@Component ({
    selector: 'main-component',
    templateUrl: './main.html'
})
export class MainComponent {

    @ViewChild(LogAlert) logAlert: LogAlert;
    public user: string;
    constructor(private loginService: LoginService) {
        this.user = loginService.getUser();
    }

    onMessage(event) {
        this.logAlert.showAlert(event);
    }
}
