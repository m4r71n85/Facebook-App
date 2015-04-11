app.controller('adminEditUserController',
['user', 'allTowns', 'adminUserService', '$state', '$scope',
    function (user, allTowns, adminUserService, $state, $scope) {
        $scope.user = user.user;
        $scope.userPassword = { username: user.user.username };
        $scope.allTowns = allTowns;

        $scope.updateProfile = function () {
            adminUserService.updateProfile($scope.user);
        }

        $scope.updatePassword = function () {
            adminUserService.updatePassword($scope.userPassword).then(
                function () {
                    $scope.userPassword = { username: user.user.username };
                },
                function () {
                    $scope.userPassword = { username: user.user.username };
                });
        }
    }
]);
