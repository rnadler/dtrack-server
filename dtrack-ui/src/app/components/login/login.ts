import { Component, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LogAlert } from '../../components/logAlert/logAlert';
import { Subscription } from "rxjs";
import { LoginService } from '../../services/loginService';


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
    constructor(private router: Router, private route: ActivatedRoute, private loginService: LoginService) {
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
        if (this.loginService.isSignedIn()) {
            this.router.navigate(['/main']);
            return;
        }
        this.sub = this.route.queryParams.subscribe(params => {
            let param = params['param'];
            // ToDo: This navigation clears any user input! Needs to be fixed.
            let callback = () => this.router.navigate(['/']);
            console.log("Login param: " + param);
            if (param === 'logout') {
                this.logAlert.showLogout(callback)
            } else if (param === 'error') {
                this.logAlert.showError(callback);
            }
        });
    }
    private ngOnDestroy() {
        if (this.sub) {
            this.sub.unsubscribe();
        }
    }
}