import {Component} from '@angular/core';
import {ShowAlertService} from "../../services/showAlertService";

@Component({
    selector: 'log-alert',
    templateUrl: './logAlert.html'
})

export class LogAlert {

    public logoutAlert = {enabled: false, type: "success", msg: 'You have been logged out.'};
    public errorAlert = {enabled: false, type: "danger", msg: 'Invalid username and password.'};

    constructor(private showAlertService: ShowAlertService) {

    }
    showLogout(callback) {
        this.showAlertService.showAlertCallback(this.logoutAlert, callback);
    }
    showError(callback) {
        this.showAlertService.showAlertCallback(this.errorAlert, callback);
    }
}

