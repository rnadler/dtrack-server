"use strict";
angular.module('dtrackApp', [
        'ui.bootstrap',
        'highcharts-ng'
    ])
    .config(function($httpProvider) {
        $httpProvider.defaults.headers.common["X-Requested-With"] = 'XMLHttpRequest';
    });
