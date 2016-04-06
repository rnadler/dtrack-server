(function (angular) {
    'use strict';
    function NotificationAlertController($scope, $timeout, $stomp, $log, User) {
        var ctrl = this;
        ctrl.notificationAlert = {enabled: false};

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
                                showAlert($timeout, ctrl.notificationAlert, message);
                            });
                        });
                    }, {});
                });
        }
    }

    angular.module('dtrackApp').component('notificationAlert', {
        templateUrl: 'scripts/app/components/notificationAlert/notificationAlert.html',
        controller: NotificationAlertController
    });
})(window.angular);
