'use strict';

angular.module('UserService', []).service('User', function() {
    var user = undefined;
    this.setUser = function(user) {
        this.user = user;
    };
    this.clearUser = function() {
        this.user = undefined;
    };
    this.getUser = function() {
        return this.user;
    };
});
