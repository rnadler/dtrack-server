(function (angular) {
    'use strict';
    function RegisterController($timeout, Auth) {
        var ctrl = this;
        ctrl.success = null;
        ctrl.error = null;
        ctrl.doNotMatch = null;
        ctrl.errorUserExists = null;
        ctrl.registerAccount = {};
        $timeout(function (){angular.element('[ng-model="$ctrl.registerAccount.login"]').focus();});

        ctrl.register = function () {
            if (ctrl.registerAccount.password !== ctrl.confirmPassword) {
                ctrl.doNotMatch = 'ERROR';
            } else {
                ctrl.registerAccount.langKey = 'en';
                ctrl.doNotMatch = null;
                ctrl.error = null;
                ctrl.errorUserExists = null;
                ctrl.errorEmailExists = null;

                Auth.createAccount(ctrl.registerAccount).then(function () {
                    ctrl.success = 'OK';
                }).catch(function (response) {
                    ctrl.success = null;
                    if (response.status === 400 && response.data === 'login already in use') {
                        ctrl.errorUserExists = 'ERROR';
                    } else if (response.status === 400 && response.data === 'e-mail address already in use') {
                        ctrl.errorEmailExists = 'ERROR';
                    } else {
                        ctrl.error = 'ERROR';
                    }
                });
            }
        };
    }

    angular.module('dtrackApp').component('register', {
        templateUrl: 'scripts/app/components/register/register.html',
        controller: RegisterController
    });
})(window.angular);
