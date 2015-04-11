'use strict';

app.factory('adminTownService', [
    'adsFilterHelper', 'modelStateErrorsService', '$http', '$q', 'toaster', 'apiUrl',
    function (adsFilterHelper, modelStateErrorsService, $http, $q, toaster, apiUrl) {
        var settings = adsFilterHelper.getSettings();

        var getTowns = function () {
            var deferred = $q.defer();
            $http.get(apiUrl + 'api/admin/towns', {
                params: {
                    startpage: adsFilterHelper.getPage(),
                    pagesize: settings.pageSize * 2,
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

        var deleteTown = function (townId) {
            var deferred = $q.defer();
            $http.delete(apiUrl + 'api/admin/towns/' + townId)
            .success(function (data) {
                toaster.pop('success', '', 'Town deleted successfully.');
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

        var getTown = function (townId) {
            var deferred = $q.defer();
            $http.get(apiUrl + 'api/admin/towns/' + townId)
            .success(function (data) {
                deferred.resolve(data);
            })
            .error(function (data, status) {
                deferred.reject(data, status);
            });
            return deferred.promise;
        }

        var createTown = function (town) {
            var deferred = $q.defer();
            $http.post(apiUrl + 'api/admin/towns', town)
            .success(function (data) {
                toaster.pop('success', '', "Town created successfully.");
                deferred.resolve(data);
            })
            .error(function (data, status) {
                toaster.pop('error', '', data.message);
                deferred.reject(data, status);
            });
            return deferred.promise;
        }

        var updateTown = function (town) {
            var deferred = $q.defer();
            $http.put(apiUrl + 'api/admin/towns/' + town.id, town)
            .success(function (data) {
                toaster.pop('success', '', "Town successfully updated.");
                deferred.resolve(data);
            })
            .error(function (data, status) {
                toaster.pop('error', '', data.message);
                deferred.reject(data, status);
            });
            return deferred.promise;
        }

        return ({
            getTowns: getTowns,
            deleteTown: deleteTown,
            getTown: getTown,
            createTown: createTown,
            updateTown: updateTown,
        });
    }
])