import { Component, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LogAlert } from '../../components/logAlert/logAlert';
import { Subscription } from "rxjs";
import { LoginService } from '../../services/loginService';
import { AppState } from '../../app.service'


@Component({
    selector: 'login',
    templateUrl: './login.html'
})

export class Login {
    private static readonly USERNAME_PROP = 'username';
    private static readonly PASSWORD_PROP = 'password';
    private logoutAlert = {type: 'success', message: 'You have been logged out.'};
    private errorAlert = {type: 'danger', message: 'Invalid username and password.'};

    @ViewChild(LogAlert) logAlert: LogAlert;
    private sub: Subscription;
    public login = {
        username: null,
        password: null
   };
    constructor(private router: Router, private route: ActivatedRoute, private loginService: LoginService,
        private appState: AppState) {
    }

    submit() {
        console.log("Login submit " + this.login.username);
        this.loginService.login(this.login.username, this.login.password)
            .subscribe(
                data => {
                    this.router.navigate(['/main']);
                },
                error => {
                    this.loginService.errorLogout();
                }
            );
    }

    private ngOnInit() {
        this.sub = this.route.queryParams.subscribe(params => {
            let param = params['param'];
            console.log("Login param: " + param);
            if (param === 'logout') {
                this.logAlert.showAlertCallback(this.logoutAlert, this.callback)
            } else if (param === 'error') {
                this.logAlert.showAlertCallback(this.errorAlert, this.callback);
            }
            this.getState();
        });
    };
    private callback = () => {
        this.setState();
        this.router.navigate(['/']);
    };
    private setState = () => {
        this.setLoginProp(Login.USERNAME_PROP);
        this.setLoginProp(Login.PASSWORD_PROP);
    };
    private getState = () => {
        this.getLoginProp(Login.USERNAME_PROP);
        this.getLoginProp(Login.PASSWORD_PROP);
        this.clearState();
    };
    private clearState = () => {
        this.appState.set(Login.USERNAME_PROP, null);
        this.appState.set(Login.PASSWORD_PROP, null);
    };
    private setLoginProp = (prop) => {
        this.appState.set(prop, this.login[prop]);
    };
    private getLoginProp = (prop) => {
        this.login[prop] = this.appState.get(prop);
    };
    private ngOnDestroy() {
        if (this.sub) {
            this.sub.unsubscribe();
        }
    }
}