'use strict';

app.directive('statusFilterMenu',
    ['authSessionHelper', function (authSessionHelper) {
    return {
        restrict: 'AE',
        replace:true,
        templateUrl: '/app/directives/statusFilterMenu/statusFilterMenu.html',
        controller: [
            'adsFilterHelper', '$rootScope', '$state', '$stateParams', '$scope',
            function (adsFilterHelper, $rootScope, $state, $stateParams, $scope) {
                $scope.$state = $state;
                $scope.adsFilterHelper = adsFilterHelper;

                $scope.userAdsMenuItems = [
                    { title: "All", status: "" },
                    { title: "Published", status: "published" },
                    { title: "Waiting Approval", status: "waitingApproval" },
                    { title: "Inactive", status: "inactive" },
                    { title: "Rejected", status: "rejected" },
                ];

                $scope.setFilter = function (status) {
                    adsFilterHelper.setStatus(status);
                    $rootScope.$broadcast('statusSet');
                }

                $scope.isLoggedIn = authSessionHelper.isLoggedIn();
                $scope.$on('authState', function () {
                    $scope.isLoggedIn = authSessionHelper.isLoggedIn();
                });
            }
        ]
    }
}]);