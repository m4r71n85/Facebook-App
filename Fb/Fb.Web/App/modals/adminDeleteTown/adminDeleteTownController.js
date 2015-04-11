'use strict';

app.controller('adminDeleteTownController',
    ['$scope', '$modalInstance', 'town', function ($scope, $modalInstance, town) {

        $scope.town = town;

        $scope.ok = function () {
            $modalInstance.close();
        };

        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };
    }]
);