import {Component, OnInit} from '@angular/core';
import {Location} from '@angular/common';
import {ShowAlertService} from "../../services/showAlertService";
import {AppState} from "../../app.service";

@Component({
    selector: 'log-alert',
    templateUrl: './logAlert.html'
})

export class LogAlert implements OnInit {

    public logoutAlert = {enabled: false, type: "success", msg: 'You have been logged out.'};
    public errorAlert = {enabled: false, type: "danger", msg: 'Invalid username and password.'};

    constructor(public appState: AppState, private showAlertService: ShowAlertService, public location : Location) {

    }
    ngOnInit() {
        let url = this.location.path(false);
        console.log('LogAlert: url=' + url);
        if (url.indexOf('error') > -1) {
            this.showAlertService.showAlert(this.errorAlert);
        } else if (url.indexOf('logout') > -1) {
            this.appState.set('value', '');
            this.showAlertService.showAlert(this.logoutAlert);
        }
    }
}

