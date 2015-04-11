"http://localhost:1337/api/ads?pagesize=3&startpage=2"

'use strict';

app.factory('userProfileService', [
    '$http', '$q', 'modelStateErrorsService', 'toaster', 'apiUrl',
    function ($http, $q, modelStateErrorsService, toaster, apiUrl) {

        var get = function () {
            var deferred = $q.defer();
            $http.get(apiUrl + 'api/user/profile')
            .success(function (data) {
                deferred.resolve(data);
            })
            .error(function (data, status) {
                deferred.reject(data, status);
            });
            return deferred.promise;
        }

        var updatePassword = function (passwords) {
            var deferred = $q.defer();
            $http.put(apiUrl + 'api/user/changepassword', passwords)
            .success(function (data) {
                toaster.pop('success', '', "User profile successfully updated.");
                deferred.resolve(data);
            })
            .error(function (data, status) {
                var errors = modelStateErrorsService.parseErrors(data);
                angular.forEach(errors, function (error, key) {
                    toaster.pop('error', '', error);
                });
                deferred.reject(data, status);
            });
            return deferred.promise;
        }

        var updateProfile = function (user) {
            var deferred = $q.defer();
            $http.put(apiUrl + 'api/user/profile', user)
            .success(function (data) {
                toaster.pop('success', '', "User profile successfully updated.");
                deferred.resolve(data);
            })
            .error(function (data, status) {
                toaster.pop('error', '', data.message);
                deferred.reject(data, status);
            });
            return deferred.promise;
        }

        return ({
            get: get,
            updatePassword: updatePassword,
            updateProfile: updateProfile
        });
    }
])