app.controller('adminEditTownController',
['town', 'adminTownService', '$state', '$scope',
    function (town, adminTownService, $state, $scope) {
        $scope.town = town;

        $scope.edit = function () {
            adminTownService.updateTown($scope.town).then(
                function(data){
                    $state.go('adminTowns')
                });
        }
    }
]);
