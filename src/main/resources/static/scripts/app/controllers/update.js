'use strict';

angular.module('dtrackApp').controller('updateCtrl', function($scope, $timeout, $log, $stomp, User) {
    var user = User.getUser();
    $scope.sendUpdate = function() {
        if (user === undefined) {
            $log.error('sendUpdate: User is not defined!');
            return;
        }
        $stomp.send('/app/update', { user: user, type: 'odd' }, {});
    };
});
