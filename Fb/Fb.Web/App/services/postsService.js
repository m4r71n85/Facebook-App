﻿'use strict';

app.factory('postsService', [
    '$http', '$q', 'toaster', 'postFilterHelper', 'apiUrl',
    function ($http, $q, toaster, postFilterHelper, apiUrl) {
        var settings = postFilterHelper.getSettings();

        var getPosts = function () {
            var deferred = $q.defer();
            $http.get(apiUrl + 'api/posts/all', {
                params: {
                    startpage: postFilterHelper.getPage(),
                    pagesize: settings.pageSize
                }
            })
            .success(function (data) {
                deferred.resolve(data);
            })
            .error(function (data, status) {
                deferred.reject(data, status);
            });
            return deferred.promise;
        }

        var getPost = function (postId) {
            var deferred = $q.defer();
            $http.get(apiUrl + 'api/user/posts/' + postId)
            .success(function (data) {
                deferred.resolve(data);
            })
            .error(function (data, status) {
                deferred.reject(data, status);
            });
            return deferred.promise;
        }

        var getUserPosts = function () {
            var deferred = $q.defer();
            $http.get(apiUrl + 'api/user/posts', {
                params: {
                    startpage: postFilterHelper.getPage(),
                    pagesize: settings.pageSize,
                }
            })
            .success(function (data) {
                deferred.resolve(data);
            })
            .error(function (data, status) {
                deferred.reject(data, status);
            });
            return deferred.promise;
        }

        var publishPost = function (post) {
            var deferred = $q.defer();
            $http.post(apiUrl + 'api/user/posts', post)
            .success(function (data) {
                deferred.resolve(data);
                toaster.pop('success', '', "Post published.");
            })
            .error(function (data, status) {
                deferred.reject(data, status);
            });
            return deferred.promise;
        }
       
        var saveEdit = function (post) {
            var deferred = $q.defer();
            $http.put(apiUrl + 'api/user/posts/' + post.id, post)
            .success(function (data) {
                toaster.pop('success', '', "Post edited.");
                deferred.resolve(data);
            })
            .error(function (data, status) {
                deferred.reject(data, status);
            });
            return deferred.promise;
        }

        var deletePost = function (adId) {
            var deferred = $q.defer();
            $http.delete(apiUrl + 'api/user/posts/' + adId)
            .success(function (data) {
                toaster.pop('success', '', "Post deleted.");
                deferred.resolve(data);
            })
            .error(function (data, status) {
                deferred.reject(data, status);
            });
            return deferred.promise;
        }

        return ({
            getPosts: getPosts,
            getPost: getPost,
            getUserPosts: getUserPosts,
            deletePost: deletePost,
            saveEdit: saveEdit
        });
    }
])