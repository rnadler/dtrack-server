import { Component } from '@angular/core';
import { RegisterAccount } from '../../model/registerAccount'
import { RegisterService } from '../../services/registerService'
import { Response } from "@angular/http";

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
    public registerAccount: RegisterAccount;

    constructor(private registerService: RegisterService) {
        this.registerAccount = <RegisterAccount> {
            password: null,
            confirmPassword: null,
            langKey: 'en'
        };
    }
    
    register() {
        if (this.registerAccount.password !== this.registerAccount.confirmPassword) {
            this.doNotMatch = 'ERROR';
        } else {
            this.doNotMatch = null;
            this.error = null;
            this.errorUserExists = null;
            this.errorEmailExists = null;
    
            this.registerService.createAccount(this.registerAccount).subscribe(
                data => {
                    this.success = 'OK';
                    console.log("Successfully registered user " + this.registerAccount.login);
                },
                error => {
                    this.success = null;
                    let response = <Response>error;
                    if (response.status === 400) {
                        let message = response.json().message;
                        if (message === 'login already in use') {
                            this.errorUserExists = 'ERROR';
                        } else if (message === 'e-mail address already in use') {
                            this.errorEmailExists = 'ERROR';
                        }
                    } else {
                        this.error = 'ERROR';
                    }
                }
            );
        }
    }
}


