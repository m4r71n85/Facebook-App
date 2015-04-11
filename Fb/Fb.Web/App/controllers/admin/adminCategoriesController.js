'use strict';

app.controller('adminCategoriesController',
['categories', 'itemsPerPage', 'adsFilterHelper', 'adminCategoryService', '$modal', '$state', '$scope',
    function (categories, itemsPerPage, adsFilterHelper, adminCategoryService, $modal, $state, $scope) {
        $scope.categories = categories;
        $scope.itemsPerPage = itemsPerPage;
        //$scope.edit = function (catId) {
        //    $state.go('editCategory', { catId: catId });
        //}

        $scope.delete = function (category) {
            $modal.open({
                templateUrl: '/app/modals/adminDeleteCategory/adminDeleteCategory.html',
                controller: 'adminDeleteCategoryController',
                resolve: {
                    category: function () {
                        return category;
                    }
                }
            }).result.then(function () {
                adminCategoryService.deleteCategory(category.id).then(
                    function () {
                        updatePageCategories();
                    });
            });
        }

        function updatePageCategories() {
            adminCategoryService.getCategories().then(
                function (data) {
                    $scope.categories = data;
                });
        }

        $scope.loadPage = function () {
            adsFilterHelper.setPage($scope.currentPage);
            updatePageCategories();
        }

    }
]);
