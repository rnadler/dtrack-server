import { Component, Inject } from '@angular/core';
import {AlertComponent} from 'ng2-bootstrap/ng2-bootstrap';

@Component({
    selector: 'log-alert',
    directives: [AlertComponent],
    templateUrl: 'scripts/app/components/logAlert/logAlert.html'
})

export class LogAlert implements OnInit {

    public logoutAlert = {enabled: false, type: "success", msg: 'You have been logged out.'};
    public errorAlert = {enabled: false, type: "danger", msg: 'Invalid username and password.'};

    constructor(@Inject('$timeout') public timeout, @Inject('$location') public location,
                @Inject('User') public user) {
        this.url = this.location.absUrl();
    }
    ngOnInit() {
        if (this.url.indexOf('error') > -1) {
            showAlert(this.timeout, this.errorAlert);
        } else if (this.url.indexOf('logout') > -1) {
            this.user.clearUser();
            showAlert(this.timeout, this.logoutAlert);
        }
    }
}
