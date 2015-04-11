app.directive('loginRegisterMenu',
    [function () {
        return {
            restrict: 'AE',
            templateUrl: '/app/directives/loginRegisterMenu/loginRegisterMenu.html',
            replace: true,
            controller: [
                '$scope', '$state', 'authSessionHelper',
                function ($scope, $state, authSessionHelper) {
                    $scope.$state = $state;

                    $scope.loginRegisterMenuItems = [
                        { title: "Login", sref: "login" },
                        { title: "Register", sref: "register"},
                    ];

                    $scope.isLoggedIn = authSessionHelper.isLoggedIn();
                    $scope.$on('authState', function () {
                        $scope.isLoggedIn = authSessionHelper.isLoggedIn();
                    });
                }
            ]
        }
    }]);