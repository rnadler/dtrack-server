'use strict';

angular.module('dtrackApp').controller('updateCtrl', function($scope, $stomp, User) {
    $scope.sendUpdate = function() {
        if (User.isLoggedIn()) {
            $stomp.send('/app/update', { user: '', type: 'odd' }, {});
        }
    };
});
