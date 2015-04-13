'use strict';

app.controller('loginController',
['authenticationService', 'authSessionHelper', '$state', '$scope',
    function (authenticationService, authSessionHelper, $state, $scope) {
        if (authSessionHelper.isLoggedIn()) {
            $state.go('home');
        }

        $scope.login = function () {
            authenticationService.login($scope.user).then(
                function () {
                    $state.go('home');
                });
        }
    }
]);