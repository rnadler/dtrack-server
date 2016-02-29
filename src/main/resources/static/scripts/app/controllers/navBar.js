'use strict';

angular.module('dtrackApp').controller('navBarCtrl', function($scope, User) {
  $scope.init = function(user) {
    User.setUser(user);
  }
});
