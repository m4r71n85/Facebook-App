'use strict';

app.controller('adminCreateTownController',
['adminTownService', '$state', '$scope',
    function (adminTownService, $state, $scope) {
        $scope.create = function () {
            adminTownService.createTown($scope.town).then(
                function () {
                    $state.go('adminTowns')
                });
        }
    }
]);
