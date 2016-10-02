import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class ShowAlertService {
    public showAlert(alert) {
        this.showAlertMsg(alert, undefined);
    }
    public showAlertMsg(alert, message) {
        alert.message = message;
        alert.enabled = true;
        Observable.timer(5000).subscribe((t) =>
        {
            alert.enabled = false;
            alert.message = undefined;
        })
    };
}