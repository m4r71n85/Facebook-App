﻿'use strict';

app.controller('homeController',
['posts', 'friends', 'postsService', 'postFilterHelper', 'authSessionHelper', '$scope', 'itemsPerPage',
    function (posts, friends, postsService, postFilterHelper, authSessionHelper, $scope, itemsPerPage) {
        $scope.itemsPerPage = itemsPerPage;
        $scope.posts = posts;
        $scope.friends = friends;
        $scope.pageSettings = postFilterHelper.getSettings();
        
        $scope.like = function (post) {
            postsService.like(post.id).then(
                function (success) {
                    post.likeCount = success;
                }, function (error) {
                });
        }
       
        $scope.loadPage = function () {
            postFilterHelper.setPage($scope.currentPage);
            postsService.getPosts().then(
                function (data) {
                    $scope.posts = data;
                });
           
            postsService.getUserFriends().then(
                function (data) {
                    $scope.friends = data;
                });

            $scope.isLoggedIn = authSessionHelper.isLoggedIn();
            $scope.$on('authState', function () {
                $scope.isLoggedIn = authSessionHelper.isLoggedIn();
            });
        }

    }]);