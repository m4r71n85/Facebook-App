app.controller('friendsController',
[
    '$state', '$scope', 'friendsService',
    function ($state, $scope, friendsService) {
        $scope.friends = {};
        $scope.search = function(searchPhrase) {
            friendsService.getFriends(searchPhrase).then(
                function(friends) {
                    $scope.friends = friends;
                });
        }
    }
]);