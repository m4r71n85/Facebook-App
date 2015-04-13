'use strict';

app.controller('registerController',
['allTowns', 'authSessionHelper', 'authenticationService', '$state', '$scope',
    function (allTowns, authSessionHelper, authenticationService, $state, $scope) {
        if (authSessionHelper.isLoggedIn()) {
            $state.go('home');
        }

        $scope.allTowns = allTowns;
        $scope.register = function () {
            authenticationService.register($scope.user).then(
                function () {
                    $state.go('home');
                });
        }
    }
]);