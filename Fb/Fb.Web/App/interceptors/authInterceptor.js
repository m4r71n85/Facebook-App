app.factory('authInterceptor', ['$q', '$timeout', 'toaster', 'authSessionHelper', '$location',
    function ($q, $timeout, toaster, authSessionHelper, $location) {

        'use strict';

        var request = function (config) {
            addAuthToken(config);
            return config;
        };

        var addAuthToken = function (config) {
            if (!checkNeedAuthToken(config)) {
                return;
            }

            config.headers = config.headers || {};
            var authData = authSessionHelper.getToken();
            if (authData) {
                config.headers.Authorization = 'Bearer ' + authData;
            }
        };

        var checkNeedAuthToken = function (config) {
            if (config.url.toLowerCase().indexOf("api") > -1) {
                return true;
            }
            return false;
        };


        var responseError = function (rejection) {
            if (rejection.status === 403 || rejection.status === 401) {
                $timeout(function(){ 
                    $location.url('/account/login');
                    toaster.pop('error', '', 'You are not authorized to view this page.');
                }, 1);
            }
            return $q.reject(rejection);
        };

        return {
            request: request,
            responseError: responseError
        };
    }]);