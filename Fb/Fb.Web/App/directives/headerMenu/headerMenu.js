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
                    $scope.username = authSessionHelper.getUsername();
                    $scope.isAdmin = authSessionHelper.isAdmin();

                    if ($scope.isLoggedIn) {
                        $scope.headerMenuItems = [
                            { title: "Home", sref: "home", authenticated: true },
                            { title: "Find Friends", sref: "searchFriends", authenticated: true },
                            { title: "Edit Profile", sref: "userProfile", authenticated: true }
                        ];
                    }

                    $scope.logout = function () {
                        authenticationService.logout()
                        $state.go('bye');
                    }

                    $scope.$on('authState', function () {
                        $scope.isLoggedIn = authSessionHelper.isLoggedIn();
                        $scope.username = authSessionHelper.getUsername();
                        $scope.isAdmin = authSessionHelper.isAdmin();
                    });
                }
            ]
        }
    }]);