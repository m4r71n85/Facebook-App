'use strict';

app.controller('registerController',
['allTowns', 'authenticationService', '$state', '$scope',
    function (allTowns, authenticationService, $state, $scope) {
        
        $scope.allTowns = allTowns;
        $scope.register = function () {
            authenticationService.register($scope.user).then(
                function () {
                    $state.go('home');
                });
        }
    }
]);