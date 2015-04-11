'use strict';

app.controller('adminTownsController',
['towns', 'itemsPerPage', 'adsFilterHelper', 'adminTownService', '$modal', '$state', '$scope',
    function (towns, itemsPerPage, adsFilterHelper, adminTownService, $modal, $state, $scope) {
        $scope.towns = towns;
        $scope.itemsPerPage = itemsPerPage;


        $scope.delete = function (town) {
            $modal.open({
                templateUrl: '/app/modals/adminDeleteTown/adminDeleteTown.html',
                controller: 'adminDeleteTownController',
                resolve: {
                    town: function () {
                        return town;
                    }
                }
            }).result.then(function () {
                adminTownService.deleteTown(town.id).then(
                    function () {
                        updatePageTowns();
                    });
            });
        }

        function updatePageTowns() {
            adminTownService.getTowns().then(
                function (data) {
                    $scope.towns = data;
                });
        }

        $scope.loadPage = function () {
            adsFilterHelper.setPage($scope.currentPage);
            updatePageTowns();
        }

    }
]);
