'use strict';

angular.module('RegisterService', []).factory('Register', function ($resource) {
        return $resource('api/register', {}, {
        });
    });
