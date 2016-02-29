"use strict";
angular.module('dtrackApp', [
        'UserService',
        'ngResource',
        'ngAnimate',
        'ui.bootstrap',
        'highcharts-ng'
    ])
    .config(function($httpProvider) {
        $httpProvider.defaults.headers.common["X-Requested-With"] = 'XMLHttpRequest';
    });
