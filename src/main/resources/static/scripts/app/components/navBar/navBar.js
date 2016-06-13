(function (angular) {
    'use strict';
    function NavBarController(User) {
        var ctrl = this;
        ctrl.$onInit = function() {
            console.log("NavBarController user=" + ctrl.user);
            User.setUser(ctrl.user);
        }
    }
    angular.module('dtrackApp').component('navBar', {
        bindings: {
            user: '@'
        },
        controller: NavBarController
    });
})(window.angular);