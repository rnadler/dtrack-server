'use strict';

angular.module('AuthService', []).service('Auth', function(Register) {
    this.createAccount = function(account, callback) {
        var cb = callback || angular.noop;
        return Register.save(account,
            function () {
                return cb(account);
            },
            function (err) {
                console.log(err);
                this.logout();
                return cb(err);
            }.bind(this)).$promise;
    };
});
