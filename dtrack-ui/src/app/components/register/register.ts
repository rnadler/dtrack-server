import { Component, Inject } from '@angular/core';


@Component({
    selector: 'register',
    templateUrl: './register.html',
})

export class Register {

    public success = null;
    public error = null;
    public doNotMatch = null;
    public errorUserExists = null;
    public errorEmailExists = null;
    public registerAccount = {
        password: null,
        confirmPassword: null,
        langKey: 'en'
    };

    // constructor(@Inject('$timeout') private timeout, @Inject('Auth') private auth) {
    //     //this.timeout(function (){window.angular.element('[[(ngModel)]="registerAccount.login"]').focus();});
    // }
    
    register() {
        if (this.registerAccount.password !== this.registerAccount.confirmPassword) {
            this.doNotMatch = 'ERROR';
        } else {
            this.doNotMatch = null;
            this.error = null;
            this.errorUserExists = null;
            this.errorEmailExists = null;
    
            // this.auth.createAccount(this.registerAccount).then(() => {
            //     this.success = 'OK';
            // }).catch((response) => {
            //     this.success = null;
            //     if (response.status === 400 && response.data === 'login already in use') {
            //         this.errorUserExists = 'ERROR';
            //     } else if (response.status === 400 && response.data === 'e-mail address already in use') {
            //         this.errorEmailExists = 'ERROR';
            //     } else {
            //         this.error = 'ERROR';
            //     }
            // });
        }
    }
}


