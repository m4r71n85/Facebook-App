'use strict';

app.controller('homeController',
['ads', 'allCategories', 'allTowns', 'adsFilterHelper', 'adsService', 'authSessionHelper', '$scope', 'itemsPerPage',
    function (ads, allCategories, allTowns, adsFilterHelper, adsService, authSessionHelper, $scope, itemsPerPage) {
        $scope.itemsPerPage = itemsPerPage;
        $scope.allCategories = allCategories;
        $scope.allTowns = allTowns;
        $scope.ads = ads;
        $scope.pageSettings = adsFilterHelper.getSettings();

        $scope.loadPage = function () {
            adsFilterHelper.setPage($scope.currentPage);
            adsService.getAds().then(
                function (data) {
                    $scope.ads = data;
                })
        }

        $scope.filterCategory = function (categoryId) {
            adsFilterHelper.setCategory(categoryId);
            adsService.getAds().then(
                function (data) {
                    $scope.ads = data;
                });
        }

        $scope.filterTown = function (townId) {
            adsFilterHelper.setTown(townId);
            adsService.getAds().then(
                function (data) {
                    $scope.ads = data;
                })
        }

        $scope.isLoggedIn = authSessionHelper.isLoggedIn();
        $scope.$on('authState', function () {
            $scope.isLoggedIn = authSessionHelper.isLoggedIn();
        });
    }
]);