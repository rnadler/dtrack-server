(function (angular) {
    'use strict';
    function AppFooterController(VERSION) {
        var ctrl = this;
        ctrl.dtrackVersion = VERSION;
    }

    angular.module('dtrackApp').component('appFooter', {
        templateUrl: 'scripts/app/components/appFooter/appFooter.html',
        controller: AppFooterController,
        bindings: {
            dtrackVersion: '@'
        }
    });
})(window.angular);
