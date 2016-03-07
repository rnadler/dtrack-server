'use strict';

angular.module('dtrackApp').controller('notificationCtrl', function ($scope, $timeout, $stomp, $log, User) {
    var user = User.getUser();

    $scope.notificationAlert = {enabled: false};

    $stomp.setDebug(function (args) {
        $log.debug(args);
    });

    if (user !== undefined) {
        $stomp.connect('/notification', {})
            .then(function (frame) {
                $stomp.subscribe('/topic/notifications', function (payload, headers, res) {
                    var message = 'Notification received. user=' + payload.user + ' type=' + payload.type;
                    $log.debug(message);
                    $timeout(function() {
                        $scope.$apply(function () {
                            showAlert($timeout, $scope.notificationAlert, message);
                        });
                    });
                }, {});
            });
    }
});
