'use strict';

app.factory('adminUserService', [
    'adsFilterHelper', 'modelStateErrorsService', '$http', '$q', 'toaster', 'apiUrl',
    function (adsFilterHelper, modelStateErrorsService, $http, $q, toaster, apiUrl) {
        var settings = adsFilterHelper.getSettings();

        var getUsers = function () {
            var deferred = $q.defer();
            $http.get(apiUrl + 'api/admin/users', {
                params: {
                    startpage: adsFilterHelper.getPage(),
                    pagesize: settings.pageSize*2,
                    //sortBy: adsFilterHelper.getSortBy()
                }
            })
            .success(function (data) {
                deferred.resolve(data);
            })
            .error(function (data, status) {
                deferred.reject(data, status);
            });
            return deferred.promise;
        }

        var deleteUser = function (username) {
            var deferred = $q.defer();
            $http.delete(apiUrl + 'api/admin/user/' + username)
            .success(function (data) {
                toaster.pop('success', '', data.message);
                deferred.resolve(data);
            })
            .error(function (data, status) {
                if (data.message) {
                    toaster.pop('error', '', data.message);
                }
                deferred.reject(data, status);
            });
            return deferred.promise;
        }

        var getUser = function (username) {
            var deferred = $q.defer();
            $http.get(apiUrl + 'api/admin/user/' + username)
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
            $http.put(apiUrl + 'api/admin/setpassword', passwords)
            .success(function (data) {
                toaster.pop('success', '', data.message);
                deferred.resolve(data);
            })
            .error(function (data, status) {
                var errors = modelStateErrorsService.parseErrors(data);
                angular.forEach(errors, function (error, key) {
                    toaster.pop('error', '', error);
                });
                if (data.message) {
                    toaster.pop('error', '', data.message);
                }
                deferred.reject(data, status);
            });
            return deferred.promise;
        }

        var updateProfile = function (user) {
            var deferred = $q.defer();
            $http.put(apiUrl + 'api/admin/user/' + user.username, user)
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
            getUsers: getUsers,
            deleteUser: deleteUser,
            getUser: getUser,
            updateProfile: updateProfile,
            updatePassword: updatePassword
        });
    }
])