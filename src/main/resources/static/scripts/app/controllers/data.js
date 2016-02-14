'use strict';

angular.module('dtrackApp').controller('DataCtrl', function ($scope, $http) {
    $scope.searchTerm = '';

    $scope.ok = function () {
        $scope.getData($scope.searchTerm);
    };
    $scope.checkKeyUp = function (event) {
        return event.keyCode == 13 && $scope.ok();
    };
    $scope.getData = function (search) {
        var searchParam = '';
        if (search !== undefined && search.length > 0) {
            searchParam = 'search/findByType?type=' + search;
        }
        $http.get('/entries/' + searchParam).success(function (data) {
            $scope.data = data['_embedded']['entries'];
        })
    };
    $scope.getData();
});
