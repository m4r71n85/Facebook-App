'use strict';

app.controller('adminUsersController',
['users', 'itemsPerPage', '$modal', '$state', '$scope', 'adminUserService', 'adsFilterHelper',
    function (users, itemsPerPage, $modal, $state, $scope, adminUserService, adsFilterHelper) {
        $scope.itemsPerPage = itemsPerPage;
        $scope.users = users;
        
        $scope.edit = function (username) {
            $state.go('adminEditUser', { username: username });
        }

        $scope.delete = function (user) {
            $modal.open({
                templateUrl: '/app/modals/adminDeleteUser/adminDeleteUser.html',
                controller: 'adminDeleteUserController',
                resolve: {
                    user: function () {
                        return user;
                    }
                }
            }).result.then(function () {
                adminUserService.deleteUser(user.username).then(
                    function () {
                        updatePageUsers();
                    });
            });
        }

        function updatePageUsers() {
            adminUserService.getUsers().then(
                function (data) {
                    $scope.users = data;
                });
        }

        $scope.loadPage = function () {
            adsFilterHelper.setPage($scope.currentPage);
            updatePageUsers();
        }
    }
]);