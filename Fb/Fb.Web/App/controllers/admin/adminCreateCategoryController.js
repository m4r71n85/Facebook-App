'use strict';

app.controller('adminCreateCategoryController',
['adminCategoryService', '$state', '$scope',
    function (adminCategoryService, $state, $scope) {
        $scope.create = function () {
            adminCategoryService.createCategory($scope.category).then(
                function () {
                    $state.go('adminCategories')
                });
        }
    }
]);
