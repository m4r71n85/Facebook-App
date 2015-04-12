'use strict';

app.factory('menuItemsServices', [
    '$http', '$q', 'apiUrl',
    function ($http, $q, apiUrl) {

        var getAllTowns = function() {
            var deferred = $q.defer();
            $http.get(apiUrl + 'api/towns')
                .success(function (data) {
                    deferred.resolve(data);
                })
                .error(function (data, status) {
                    deferred.reject(data, status);
                });
            return deferred.promise;
        }

        return ({
            getAllTowns: getAllTowns
        });
    }
])