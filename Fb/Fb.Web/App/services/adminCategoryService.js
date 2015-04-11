'use strict';

app.factory('adminCategoryService', [
    'adsFilterHelper', 'modelStateErrorsService', '$http', '$q', 'toaster', 'apiUrl',
    function (adsFilterHelper, modelStateErrorsService, $http, $q, toaster, apiUrl) {
        var settings = adsFilterHelper.getSettings();

        var getCategories = function () {
            var deferred = $q.defer();
            $http.get(apiUrl + 'api/admin/categories', {
                params: {
                    startpage: adsFilterHelper.getPage(),
                    pagesize: settings.pageSize * 2,
                    //sortBy: adsFilterHelper.getSortBy()
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

        var deleteCategory = function (catId) {
            var deferred = $q.defer();
            $http.delete(apiUrl + 'api/admin/categories/' + catId)
            .success(function (data) {
                toaster.pop('success', '', 'Category deleted successfully.');
                deferred.resolve(data);
            })
            .error(function (data, status) {
                if (data.message) {
                    toaster.pop('error', '', data.message);
                }
                deferred.reject(data, status);
            });
            return deferred.promise;
        }

        var getCategory = function (catId) {
            var deferred = $q.defer();
            $http.get(apiUrl + 'api/admin/categories/' + catId)
            .success(function (data) {
                deferred.resolve(data);
            })
            .error(function (data, status) {
                deferred.reject(data, status);
            });
            return deferred.promise;
        }

        var createCategory = function (category) {
            var deferred = $q.defer();
            $http.post(apiUrl + 'api/admin/categories', category)
            .success(function (data) {
                toaster.pop('success', '', "Category created successfully.");
                deferred.resolve(data);
            })
            .error(function (data, status) {
                toaster.pop('error', '', data.message);
                deferred.reject(data, status);
            });
            return deferred.promise;
        }

        var updateCategory = function (category) {
            var deferred = $q.defer();
            $http.put(apiUrl + 'api/admin/categories/' + category.id, category)
            .success(function (data) {
                toaster.pop('success', '', "Category successfully updated.");
                deferred.resolve(data);
            })
            .error(function (data, status) {
                toaster.pop('error', '', data.message);
                deferred.reject(data, status);
            });
            return deferred.promise;
        }

        return ({
            getCategories: getCategories,
            deleteCategory: deleteCategory,
            getCategory: getCategory,
            createCategory: createCategory,
            updateCategory: updateCategory,
        });
    }
])