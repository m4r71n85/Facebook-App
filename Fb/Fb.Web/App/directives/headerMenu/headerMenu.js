app.directive('headerMenu',
    ['authenticationService', 'authSessionHelper',
    function (authenticationService, authSessionHelper) {
        return {
            restrict: 'E',
            templateUrl: '/app/directives/headerMenu/headerMenu.html',
            replace: true,
            controller: [
                'authenticationService', 'authSessionHelper', '$scope', '$state',
                function (authenticationService, authSessionHelper, $scope, $state) {
                    $scope.$state = $state;
                    $scope.isLoggedIn = authSessionHelper.isLoggedIn();
                    $scope.username = authSessionHelper.getUsername()
                    $scope.isAdmin = authSessionHelper.isAdmin();

                    if ($scope.isLoggedIn && $scope.isAdmin) {
                        $scope.headerMenuItems = [
                            { title: "Ads", sref: "adminHome", authenticated: true },
                            { title: "Users", sref: "adminUsers", authenticated: true },
                            { title: "Categories", sref: "adminCategories", authenticated: true },
                            { title: "Town", sref: "adminTowns", authenticated: true }
                        ];
                    } else {
                        $scope.headerMenuItems = [
                            { title: "Home", sref: "home" },
                            { title: "My Ads", sref: "userAds", authenticated: true },
                            { title: "Publish New Ad", sref: "publish", authenticated: true },
                            { title: "Edit Profile", sref: "userProfile", authenticated: true }
                        ];
                    }

                    $scope.logout = function () {
                        authenticationService.logout();
                        $state.go('home');
                    }

                    $scope.$on('authState', function () {
                        $scope.isLoggedIn = authSessionHelper.isLoggedIn();
                        $scope.username = authSessionHelper.getUsername()
                        $scope.isAdmin = authSessionHelper.isAdmin();
                    });
                }
            ]
        }
    }]);