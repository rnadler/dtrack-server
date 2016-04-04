'use strict';

angular.module('dtrackApp').controller('notificationCtrl', function ($scope, $timeout, $stomp, $log, User) {

    $scope.notificationAlert = {enabled: false};

    $stomp.setDebug(function (args) {
        $log.debug(args);
    });

    if (User.isLoggedIn()) {
        $stomp.connect('/notification', {})
            .then(function (frame) {
                $stomp.subscribe('/user/topic/notifications', function (payload, headers, res) {
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
