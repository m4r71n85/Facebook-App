'use strict';

app.controller('loginController',
['authenticationService', 'authSessionHelper', '$state', '$scope',
    function (authenticationService, authSessionHelper, $state, $scope) {


        $scope.login = function () {
            authenticationService.login($scope.user).then(
                function () {
                    if (authSessionHelper.isAdmin()) {
                        $state.go('adminHome');
                    } else {
                        $state.go('home');
                    }
                });
        }
    }
]);