(function (angular) {
    'use strict';
    function LogAlertController($timeout, $location, User) {
        var ctrl = this,
            url = $location.absUrl();
        ctrl.logoutAlert = {enabled: false};
        ctrl.errorAlert = {enabled: false};

        if (url.indexOf('error') > -1) {
            showAlert($timeout, ctrl.errorAlert);
        } else if (url.indexOf('logout') > -1) {
            User.clearUser();
            showAlert($timeout, ctrl.logoutAlert);
        }
    }

    angular.module('dtrackApp').component('logAlert', {
        templateUrl: 'scripts/app/components/logAlert/logAlert.html',
        controller: LogAlertController
    });
})(window.angular);
