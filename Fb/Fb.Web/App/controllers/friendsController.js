app.controller('friendsController',
[
    '$state', '$scope', 'friendsService',
    function ($state, $scope, friendsService) {
        $scope.friends = {};
        $scope.searched = false;
        $scope.search = function (searchPhrase) {
            $scope.searched = true;
            friendsService.getFriends(searchPhrase).then(
                function(friends) {
                    $scope.friends = friends;
                });
        }
    }
]);