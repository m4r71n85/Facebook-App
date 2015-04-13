"http://localhost:1337/api/ads?pagesize=3&startpage=2"

'use strict';

app.factory('friendsService', [
    'postFilterHelper', '$http', '$q', 'toaster', 'apiUrl',
    function (postFilterHelper, $http, $q, toaster, apiUrl) {
        var settings = postFilterHelper.getSettings();

        var getFriends = function (searchPhrase) {
            var deferred = $q.defer();
            $http.post(apiUrl + 'api/friends/search', {
                startpage: postFilterHelper.getPage(),
                pagesize: settings.pageSize,
                searchPhrase: searchPhrase
            })
            .success(function (data) {
                deferred.resolve(data);
            })
            .error(function (data, status) {
                deferred.reject(data, status);
            });
            return deferred.promise;
        }

        
        return ({
            getFriends: getFriends,
        });
    }
])