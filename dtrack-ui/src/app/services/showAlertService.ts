import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class ShowAlertService {
    public showAlert(alert) {
        this.showAlertMsg(alert, undefined);
    }
    public showAlertCallback(alert, callback) {
        this.showAlertMsgCallback(alert, undefined, callback);
    }
    public showAlertMsg(alert, message) {
        this.showAlertMsgCallback(alert, message, undefined);
    }
    public showAlertMsgCallback(alert, message, callback) {
        alert.message = message;
        alert.enabled = true;
        Observable.timer(5000).subscribe((t) =>
        {
            alert.enabled = false;
            alert.message = undefined;
            if (callback) {
                callback();
            }
        })
    };
}