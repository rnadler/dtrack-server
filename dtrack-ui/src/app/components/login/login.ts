import { Component, ViewChild } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';
import { AppState } from "../../app.service";
import { LogAlert } from '../../components/logAlert/logAlert';
import { Subscription } from "rxjs";


@Component({
    selector: 'login',
    templateUrl: './login.html'
})

export class Login {
    @ViewChild(LogAlert) logAlert: LogAlert;
    private sub: Subscription;
    public login = {
        username: null,
        password: null
   };
    constructor(private appState: AppState, private router: Router, private route: ActivatedRoute) {
    }

    submit() {
        console.log("Login submit " + this.login.username);
        this.appState.setUser(this.login.username);
        if (this.appState.isLoggedIn()) {
            this.router.navigate(['/main']);
        } else {
            this.logAlert.showError();
        }
    }

    private ngOnInit() {
        if (this.appState.isLoggedIn()) {
            this.router.navigate(['/main']);
            return;
        }
        this.sub = this.route.params.subscribe(params => {
            if (params['param'] === 'logout') {
                this.logAlert.showLogout();
            }
        });
    }
    private ngOnDestroy() {
        if (this.sub) {
            this.sub.unsubscribe();
        }
    }
}