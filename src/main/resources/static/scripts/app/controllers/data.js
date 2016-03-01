'use strict';

angular.module('dtrackApp').controller('DataCtrl', function ($scope, $http, $timeout, User) {
    var compare = function(a,b) {
        if (a[0] < b[0])
            return -1;
        else if (a[0] > b[0])
            return 1;
        else
            return 0;
    },
    loadChartValues = function() {
        var i,
            values = [],
            seriesName = $scope.searchTerm === '' ? 'All' : $scope.searchTerm;
        for (i = 0; i < $scope.data.length; i++) {
            values.push([Date.parse($scope.data[i].createdDateTime), parseFloat($scope.data[i].value)]);
        }
        showAlert($timeout, $scope.dataLoadSuccessAlert, values.length);
        values.sort(compare);
        $scope.chartConfig.series = [{
            data: values,
            color: 'black',
            name: seriesName
        }];
        $scope.chartConfig.getHighcharts().zoomOut();
    };
    $scope.dataLoadSuccessAlert = {enabled: false};
    $scope.searchTerm = '';

    $scope.ok = function () {
        $scope.getData($scope.searchTerm);
    };
    $scope.checkKeyUp = function (event) {
        return event.keyCode == 13 && $scope.ok();
    };
    $scope.clearSearchTerm = function () {
        $scope.searchTerm = '';
        $scope.ok();
    };
    $scope.getData = function (search) {
        var searchParam = '',
            user = User.getUser();
        if (search !== undefined && search.length > 0) {
            $scope.currentSearchTerm = search;
            searchParam = 'search/findByUserAndType?user=' + user + '&type=' + search;
        } else {
            $scope.currentSearchTerm = '';
            searchParam = 'search/findByUser?user=' + user;
        }
        $timeout(function() {
            $scope.$apply(function () {
                $http.get('/entries/' + searchParam).success(function (data) {
                    $scope.data = data['_embedded']['entries'];
                    loadChartValues();
                });
            });
        });
    };
    $scope.chartConfig = {
        options: {
            chart: {
                type: 'line',
                zoomType: 'x'
            }
        },
        title: {
            text: ''
        },
        xAxis: {
            type: 'datetime'
        },
        loading: false,
        func: function(chart) {
            $timeout(function() {
                chart.reflow();
            }, 0);
        }
    };
    $scope.getData();
});
