app.controller('userProfileController',
['userProfile', 'allTowns', 'userProfileService', '$state', '$scope',
    function (userProfile, allTowns, userProfileService, $state, $scope) {
        $scope.user = userProfile;
        $scope.allTowns = allTowns;

        $scope.updateProfile = function () {
            userProfileService.updateProfile($scope.user);
        }

        $scope.updatePassword = function () {
            userProfileService.updatePassword($scope.userPassword).then(
                function () {
                    $scope.userPassword = {};
                },
                function () {
                    $scope.userPassword = {};
                });
        }
    }
]);