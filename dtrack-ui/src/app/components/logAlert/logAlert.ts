import {Component} from '@angular/core';
import {ShowAlertService} from "../../services/showAlertService";

@Component({
    selector: 'log-alert',
    templateUrl: './logAlert.html'
})

export class LogAlert {

    public alert = {enabled: false, type: 'success', message: ''};

    constructor(private showAlertService: ShowAlertService) {

    }
    showAlert(alert) {
        this.showAlertCallback(alert, null);
    }
    showAlertCallback(alert, callback) {
        this.alert.type = alert.type;
        this.alert.message = alert.message;
        this.showAlertService.showAlertCallback(this.alert, callback);
    }
}

