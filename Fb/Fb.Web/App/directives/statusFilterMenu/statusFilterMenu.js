'use strict';

app.directive('statusFilterMenu',
    ['authSessionHelper', function (authSessionHelper) {
    return {
        restrict: 'AE',
        replace:true,
        templateUrl: '/app/directives/statusFilterMenu/statusFilterMenu.html',
        controller: [
            'postFilterHelper', '$rootScope', '$state', '$stateParams', '$scope',
            function (postFilterHelper, $rootScope, $state, $stateParams, $scope) {
                $scope.$state = $state;
                $scope.postFilterHelper = postFilterHelper;

                $scope.userAdsMenuItems = [
                    { title: "All", status: "" },
                    { title: "Published", status: "published" },
                    { title: "Waiting Approval", status: "waitingApproval" },
                    { title: "Inactive", status: "inactive" },
                    { title: "Rejected", status: "rejected" },
                ];

                $scope.setFilter = function (status) {
                    postFilterHelper.setStatus(status);
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