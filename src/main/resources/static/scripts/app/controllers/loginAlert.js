'use strict';

angular.module('dtrackApp').controller('LoginAlertCtrl', function ($scope, $timeout, $location) {
    $scope.logoutAlert = {enabled: false};
    $scope.errorAlert = {enabled: false};

    var url = $location.absUrl();
    if (url.indexOf('error') > -1) {
        showAlert($timeout, $scope.errorAlert);
    } else if (url.indexOf('logout') > -1) {
        showAlert($timeout, $scope.logoutAlert);
    }
});
