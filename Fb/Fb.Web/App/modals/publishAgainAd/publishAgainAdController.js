'use strict';

app.controller('publishAgainAdController',
    ['$scope', '$modalInstance', 'ad', function ($scope, $modalInstance, ad) {

        $scope.ad = ad;

        $scope.ok = function () {
            $modalInstance.close();
        };

        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };
    }]
);