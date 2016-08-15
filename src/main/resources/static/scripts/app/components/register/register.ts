// (function (angular) {
//     'use strict';
//     function RegisterController($timeout, Auth) {
//         var ctrl = this;
//         this.success = null;
//         this.error = null;
//         this.doNotMatch = null;
//         this.errorUserExists = null;
//         this.registerAccount = {};
//         $timeout(function (){angular.element('[ng-model="$this.registerAccount.login"]').focus();});
//
//         this.register = function () {
//             if (this.registerAccount.password !== this.confirmPassword) {
//                 this.doNotMatch = 'ERROR';
//             } else {
//                 this.registerAccount.langKey = 'en';
//                 this.doNotMatch = null;
//                 this.error = null;
//                 this.errorUserExists = null;
//                 this.errorEmailExists = null;
//
//                 Auth.createAccount(this.registerAccount).then(function () {
//                     this.success = 'OK';
//                 }).catch(function (response) {
//                     this.success = null;
//                     if (response.status === 400 && response.data === 'login already in use') {
//                         this.errorUserExists = 'ERROR';
//                     } else if (response.status === 400 && response.data === 'e-mail address already in use') {
//                         this.errorEmailExists = 'ERROR';
//                     } else {
//                         this.error = 'ERROR';
//                     }
//                 });
//             }
//         };
//     }
//
//     angular.module('dtrackApp').component('register', {
//         templateUrl: 'scripts/app/components/register/register.html',
//         controller: RegisterController
//     });
// })(window.angular);

import { Component, Inject } from '@angular/core';
//import { NgForm }    from '@angular/common';
//import { NgForm, FORM_DIRECTIVES }    from '@angular/common';
//import {formDirectives} from '@angular/forms';
import {REACTIVE_FORM_DIRECTIVES, FormGroup, FormControl} from '@angular/forms';

@Component({
    selector: 'register',
    templateUrl: 'scripts/app/components/register/register.html',
//    directives: [FORM_DIRECTIVES]
    directives: [REACTIVE_FORM_DIRECTIVES]
})

export class Register {

    public success = null;
    public error = null;
    public doNotMatch = null;
    public errorUserExists = null;
    public errorEmailExists = null;
    public confirmPassword = null;
    public registerAccount = {
        password: null,
        langKey: 'en'
    };
    registerForm: FormGroup;
    loginCtrl = new FormControl('');
    constructor(@Inject('$timeout') private timeout, @Inject('Auth') private auth) {
        this.registerForm = new FormGroup({
            'login' : this.loginCtrl
        });
        //this.timeout(function (){window.angular.element('[[(ngModel)]="registerAccount.login"]').focus();});
    }
    
    register() {
        if (this.registerAccount.password !== this.confirmPassword) {
            this.doNotMatch = 'ERROR';
        } else {
            this.doNotMatch = null;
            this.error = null;
            this.errorUserExists = null;
            this.errorEmailExists = null;
    
            this.auth.createAccount(this.registerAccount).then(() => {
                this.success = 'OK';
            }).catch((response) => {
                this.success = null;
                if (response.status === 400 && response.data === 'login already in use') {
                    this.errorUserExists = 'ERROR';
                } else if (response.status === 400 && response.data === 'e-mail address already in use') {
                    this.errorEmailExists = 'ERROR';
                } else {
                    this.error = 'ERROR';
                }
            });
        }
    }
}

