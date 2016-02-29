'use strict';

angular.module('dtrackApp').controller('LoginAlertCtrl', function ($scope, $timeout, $location, User) {
    $scope.logoutAlert = {enabled: false};
    $scope.errorAlert = {enabled: false};

    var url = $location.absUrl();
    if (url.indexOf('error') > -1) {
        showAlert($timeout, $scope.errorAlert);
    } else if (url.indexOf('logout') > -1) {
        User.clearUser();
        showAlert($timeout, $scope.logoutAlert);
    }
});
