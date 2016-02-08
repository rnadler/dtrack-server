'use strict';

angular.module('dtrackApp').controller('MainCtrl', function($scope, $http) {
  $http.get('/entries/').success(function(data) {
    $scope.data = data['_embedded']['entries'];
  })
});
