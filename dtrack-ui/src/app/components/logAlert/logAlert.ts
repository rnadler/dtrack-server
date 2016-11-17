import { Component, Input } from '@angular/core';
import { ShowAlertService } from "../../services/showAlertService";

@Component({
    selector: 'log-alert',
    templateUrl: './logAlert.html'
})
export class LogAlert {

    public successAlert = {enabled: false, type: 'success', message: '', id: 'successMessage'};
    public failureAlert = {enabled: false, type: 'danger', message: '', id: 'failureMessage'};

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
    setPrefix(prefix) {
        this.successAlert.id = prefix + this.successAlert.id;
        this.failureAlert.id = prefix + this.failureAlert.id;
    }
}

