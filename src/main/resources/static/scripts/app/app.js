"use strict";
angular.module('dtrackApp', [
        'UserService',
        'AuthService',
        'RegisterService',
        'ngResource',
        'ngAnimate',
        'ui.bootstrap',
        'highcharts-ng',
        'ngStomp'
    ])
    .config(function($httpProvider) {
        $httpProvider.defaults.headers.common["X-Requested-With"] = 'XMLHttpRequest';
    });
