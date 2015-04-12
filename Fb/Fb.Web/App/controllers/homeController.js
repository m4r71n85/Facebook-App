'use strict';

app.controller('homeController',
['posts', 'postsService', 'postFilterHelper', 'authSessionHelper', '$scope', 'itemsPerPage',
    function (posts, postsService, postFilterHelper, authSessionHelper, $scope, itemsPerPage) {
        $scope.itemsPerPage = itemsPerPage;
        $scope.posts = posts;
        $scope.pageSettings = postFilterHelper.getSettings();

        $scope.loadPage = function () {
            postFilterHelper.setPage($scope.currentPage);
            postsService.getAds().then(
                function(data) {
                    $scope.posts = data;
                });
        }


        $scope.isLoggedIn = authSessionHelper.isLoggedIn();
        $scope.$on('authState', function () {
            $scope.isLoggedIn = authSessionHelper.isLoggedIn();
        });
    }
]);