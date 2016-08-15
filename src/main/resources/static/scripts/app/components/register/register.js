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
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var core_1 = require('@angular/core');
//import { NgForm }    from '@angular/common';
//import { NgForm, FORM_DIRECTIVES }    from '@angular/common';
//import {formDirectives} from '@angular/forms';
var forms_1 = require('@angular/forms');
var Register = (function () {
    function Register(timeout, auth) {
        this.timeout = timeout;
        this.auth = auth;
        this.success = null;
        this.error = null;
        this.doNotMatch = null;
        this.errorUserExists = null;
        this.errorEmailExists = null;
        this.confirmPassword = null;
        this.registerAccount = {
            password: null,
            langKey: 'en'
        };
        this.loginCtrl = new forms_1.FormControl('');
        this.registerForm = new forms_1.FormGroup({
            'login': this.loginCtrl
        });
        //this.timeout(function (){window.angular.element('[[(ngModel)]="registerAccount.login"]').focus();});
    }
    Register.prototype.register = function () {
        var _this = this;
        if (this.registerAccount.password !== this.confirmPassword) {
            this.doNotMatch = 'ERROR';
        }
        else {
            this.doNotMatch = null;
            this.error = null;
            this.errorUserExists = null;
            this.errorEmailExists = null;
            this.auth.createAccount(this.registerAccount).then(function () {
                _this.success = 'OK';
            }).catch(function (response) {
                _this.success = null;
                if (response.status === 400 && response.data === 'login already in use') {
                    _this.errorUserExists = 'ERROR';
                }
                else if (response.status === 400 && response.data === 'e-mail address already in use') {
                    _this.errorEmailExists = 'ERROR';
                }
                else {
                    _this.error = 'ERROR';
                }
            });
        }
    };
    Register = __decorate([
        core_1.Component({
            selector: 'register',
            templateUrl: 'scripts/app/components/register/register.html',
            //    directives: [FORM_DIRECTIVES]
            directives: [forms_1.REACTIVE_FORM_DIRECTIVES]
        }),
        __param(0, core_1.Inject('$timeout')),
        __param(1, core_1.Inject('Auth'))
    ], Register);
    return Register;
}());
exports.Register = Register;
//# sourceMappingURL=register.js.map