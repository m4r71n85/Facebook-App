'use strict';

app.directive('navigationMenu',
    ['authSessionHelper', function (authSessionHelper) {
    return {
        restrict: 'AE',
        replace:true,
        templateUrl: '/app/directives/navigationMenu/navigationMenu.html',
        controller: [
            '$scope', '$state', function ($scope, $state) {
                $scope.$state = $state;
                $scope.isLoggedIn = authSessionHelper.isLoggedIn();
                $scope.isAdmin = authSessionHelper.isAdmin();

                function updateNavigation() {
                    if ($scope.isLoggedIn){
                        $scope.navigationMenuItems = [
                            { title: "Home", sref: "home", authenticated: true },
                            { title: "Find Friends", sref: "#", authenticated: true },
                            { title: "Edit Profile", sref: "userProfile", authenticated: true }
                        ];
                    }
                }
                updateNavigation();

                $scope.$on('authState', function () {
                    $scope.isLoggedIn = authSessionHelper.isLoggedIn();
                    $scope.isAdmin = authSessionHelper.isAdmin();
                    updateNavigation();
                });
            }
        ]
    }
}]);