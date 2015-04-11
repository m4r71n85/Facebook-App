'use strict';

app.controller('adminHomeController',
['ads', 'allCategories', 'allTowns', 'adsFilterHelper', 'adminAdsService', 'authSessionHelper', '$modal', '$state', '$scope', 'itemsPerPage',
    function (ads, allCategories, allTowns, adsFilterHelper, adminAdsService, authSessionHelper, $modal, $state, $scope, itemsPerPage) {
        $scope.itemsPerPage = itemsPerPage;
        $scope.allCategories = allCategories;
        $scope.allTowns = allTowns;
        $scope.ads = ads;
        $scope.pageSettings = adsFilterHelper.getSettings();

        function updatePageAds() {
            adminAdsService.getAds().then(
                function (data) {
                    $scope.ads = data;
                })
        }

        $scope.approve = function (ad) {
            $modal.open({
                templateUrl: '/app/modals/adminApproveAd/adminApproveAd.html',
                controller: 'adminApproveAdController',
                resolve: {
                    ad: function () {
                        return ad;
                    }
                }
            }).result.then(function () {
                adminAdsService.approveAd(ad.id).then(
                    function () {
                        updatePageAds();
                    });
            });
        }

        $scope.reject = function (ad) {
            $modal.open({
                templateUrl: '/app/modals/adminRejectAd/adminRejectAd.html',
                controller: 'adminRejectAdController',
                resolve: {
                    ad: function () {
                        return ad;
                    }
                }
            }).result.then(function () {
                adminAdsService.rejectAd(ad.id).then(
                    function () {
                        updatePageAds();
                    });
            });
        }

        $scope.delete = function (ad) {
            $modal.open({
                templateUrl: '/app/modals/adminDeleteAd/adminDeleteAd.html',
                controller: 'adminDeleteAdController',
                resolve: {
                    ad: function () {
                        return ad;
                    }
                }
            }).result.then(function () {
                adminAdsService.deleteAd(ad.id).then(
                    function () {
                        updatePageAds();
                    });
            });
        }

        $scope.edit = function (adId) {
            $state.go('adminEditAd', { adId: adId });
        }

        $scope.loadPage = function () {
            adsFilterHelper.setPage($scope.currentPage);
            updatePageAds()
        }

        $scope.filterCategory = function (categoryId) {
            adsFilterHelper.setCategory(categoryId);
            updatePageAds()
        }

        $scope.filterTown = function (townId) {
            adsFilterHelper.setTown(townId);
            updatePageAds()
        }

        $scope.$on('statusSet', function () {
            updatePageAds()
        });

        $scope.isLoggedIn = authSessionHelper.isLoggedIn();
        $scope.$on('authState', function () {
            $scope.isLoggedIn = authSessionHelper.isLoggedIn();
        });
    }
]);