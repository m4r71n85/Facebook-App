app.controller('adminEditCategoryController',
['category', 'adminCategoryService', '$state', '$scope',
    function (category, adminCategoryService, $state, $scope) {
        $scope.category = category;

        $scope.edit = function () {
            adminCategoryService.updateCategory($scope.category).then(
                function(data){
                    $state.go('adminCategories')
                });
        }
    }
]);
