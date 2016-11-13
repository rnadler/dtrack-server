import {Component} from '@angular/core';
import {ShowAlertService} from "../../services/showAlertService";

@Component({
    selector: 'log-alert',
    templateUrl: './logAlert.html'
})

export class LogAlert {

    public successAlert = {enabled: false, type: 'success', message: ''};
    public failureAlert = {enabled: false, type: 'danger', message: ''};

    constructor(private showAlertService: ShowAlertService) {

    }
    showAlert(alert) {
        this.showAlertCallback(alert, null);
    }
    showAlertCallback(alert, callback) {
        let alertType = alert.type === 'success' ? this.successAlert : this.failureAlert;
        alertType.message = alert.message;
        this.showAlertService.showAlertCallback(alertType, callback);
    }
}

