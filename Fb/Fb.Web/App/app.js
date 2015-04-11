'use strict';

var app = angular.module('app', [
    'ui.bootstrap', 'ui.router', 'angular-loading-bar', 'toaster', 'ngCookies']);

app.config([
    '$stateProvider', '$httpProvider', '$urlRouterProvider', '$provide',
    function ($stateProvider, $httpProvider, $urlRouterProvider, $provide) {

        $provide.constant('apiUrl', 'http://localhost:1337/');
        $provide.constant('itemsPerPage', 3);

        //================================================
        //add an request interceptor
        //================================================
        $httpProvider.interceptors.push('authInterceptor');

        //================================================
        // Make urls case insensitive
        //================================================
        $urlRouterProvider.rule(function ($injector, $location) {
            var path = $location.path(), normalized = path.toLowerCase();
            if (path != normalized) {
                $location.replace().path(normalized);
            }
        });

        //================================================
        // Routes
        //================================================ 
        $urlRouterProvider.otherwise('/home');

        $stateProvider.state('login', {
            title: 'Login',
            url: '/login',
            templateUrl: 'App/templates/login.html',
            controller: 'loginController'
        });

        $stateProvider.state('register', {
            title: 'Register',
            url: '/register',
            templateUrl: 'App/templates/register.html',
            controller: 'registerController',
            resolve: {
                allTowns: [
                    'menuItemsServices', function (menuItemsServices) {
                        return menuItemsServices.getAllTowns();
                    }],
            }
        });

        $stateProvider.state('home', {
            title: 'Home',
            url: '/home',
            templateUrl: 'App/templates/home.html',
            controller: 'homeController',
            resolve: {
                allCategories: [
                    'menuItemsServices', function (menuItemsServices) {
                        return menuItemsServices.getAllCategories();
                    }],
                allTowns: [
                    'menuItemsServices', function (menuItemsServices) {
                        return menuItemsServices.getAllTowns();
                    }],
                ads: [
                    'adsService', function (adsService) {
                        return adsService.getAds();
                    }
                ]
            },
        });

        $stateProvider.state('publish', {
            title: 'Publish Advertisement',
            url: '/user/ads/publish',
            templateUrl: 'App/templates/publishAd.html',
            controller: 'publishAdController',
            resolve: {
                allCategories: [
                    'menuItemsServices', function (menuItemsServices) {
                        return menuItemsServices.getAllCategories();
                    }],
                allTowns: [
                    'menuItemsServices', function (menuItemsServices) {
                        return menuItemsServices.getAllTowns();
                    }],
            }
        });

        $stateProvider.state('editAd', {
            title: 'Edit Advertisement',
            url: '/user/ads/edit/{adId}',
            templateUrl: 'App/templates/editAd.html',
            controller: 'editAdController',
            resolve: {
                ad: [
                    'adsService', '$stateParams', function (adsService, $stateParams) {
                        return adsService.getAd($stateParams.adId);
                    }
                ],
                allCategories: [
                    'menuItemsServices', function (menuItemsServices) {
                        return menuItemsServices.getAllCategories();
                    }],
                allTowns: [
                    'menuItemsServices', function (menuItemsServices) {
                        return menuItemsServices.getAllTowns();
                    }],
            }
        });

        $stateProvider.state('userAds', {
            title: 'My Advertisement',
            url: '/user/ads',
            templateUrl: 'App/templates/userAds.html',
            controller: 'userAdsController',
            resolve: {
                ads: [
                    'adsService', function (adsService) {
                        return adsService.getUserAds();
                    }]
            }
        })

        $stateProvider.state('userProfile', {
            title: 'Edit Profile',
            url: '/user/profile',
            templateUrl: 'App/templates/userProfile.html',
            controller: 'userProfileController',
            resolve: {
                userProfile: [
                    'userProfileService', function (userProfileService) {
                        return userProfileService.get();
                    }],
                allTowns: [
                    'menuItemsServices', function (menuItemsServices) {
                        return menuItemsServices.getAllTowns();
                    }],
            }
        })

        $stateProvider.state('adminHome', {
            title: 'Home',
            url: '/admin/home',
            templateUrl: 'App/templates/admin/home.html',
            controller: 'adminHomeController',
            resolve: {
                allCategories: [
                    'menuItemsServices', function (menuItemsServices) {
                        return menuItemsServices.getAllCategories();
                    }],
                allTowns: [
                    'menuItemsServices', function (menuItemsServices) {
                        return menuItemsServices.getAllTowns();
                    }],
                ads: [
                    'adminAdsService', function (adminAdsService) {
                        return adminAdsService.getAds();
                    }
                ]
            },
        });

        $stateProvider.state('adminEditAd', {
            title: 'Edit Advertisement',
            url: '/admin/ads/edit/{adId}',
            templateUrl: 'App/templates/admin/editAd.html',
            controller: 'adminEditAdController',
            resolve: {
                ad: [
                    'adminAdsService', '$stateParams', function (adminAdsService, $stateParams) {
                        return adminAdsService.getAd($stateParams.adId);
                    }
                ],
                allCategories: [
                    'menuItemsServices', function (menuItemsServices) {
                        return menuItemsServices.getAllCategories();
                    }],
                allTowns: [
                    'menuItemsServices', function (menuItemsServices) {
                        return menuItemsServices.getAllTowns();
                    }],
            }
        });

        $stateProvider.state('adminUsers', {
            title: 'Users',
            url: '/admin/users',
            templateUrl: 'App/templates/admin/users.html',
            controller: 'adminUsersController',
            resolve: {
                users: [
                    'adminUserService', function (adminUserService) {
                        return adminUserService.getUsers();
                    }
                ]
            }
        });

        $stateProvider.state('adminEditUser', {
            title: 'Edit User',
            url: '/admin/users/edit/{username}',
            templateUrl: 'App/templates/admin/editUser.html',
            controller: 'adminEditUserController',
            resolve: {
                user: [
                    'adminUserService', '$stateParams', function (adminUserService, $stateParams) {
                        return adminUserService.getUser($stateParams.username);
                    }
                ],
                allCategories: [
                    'menuItemsServices', function (menuItemsServices) {
                        return menuItemsServices.getAllCategories();
                    }],
                allTowns: [
                    'menuItemsServices', function (menuItemsServices) {
                        return menuItemsServices.getAllTowns();
                    }],
            }
        });

        $stateProvider.state('adminCategories', {
            title: 'Categories',
            url: '/admin/categories',
            templateUrl: 'App/templates/admin/categories.html',
            controller: 'adminCategoriesController',
            resolve: {
                categories: [
                    'adminCategoryService', function (adminCategoryService) {
                        return adminCategoryService.getCategories();
                    }
                ]
            }
        });

        $stateProvider.state('adminCreateCategory', {
            title: 'Create Category',
            url: '/admin/create/category',
            templateUrl: 'App/templates/admin/createCategory.html',
            controller: 'adminCreateCategoryController',
        });

        $stateProvider.state('adminEditCategory', {
            title: 'Categories',
            url: '/admin/category/{catId}',
            templateUrl: 'App/templates/admin/editCategory.html',
            controller: 'adminEditCategoryController',
            resolve: {
                category: [
                    '$stateParams', 'adminCategoryService', function ($stateParams, adminCategoryService) {
                        return adminCategoryService.getCategory($stateParams.catId);
                    }]
            }
        });

        $stateProvider.state('adminTowns', {
            title: 'Towns',
            url: '/admin/towns',
            templateUrl: 'App/templates/admin/towns.html',
            controller: 'adminTownsController',
            resolve: {
                towns: [
                    'adminTownService', function (adminTownService) {
                        return adminTownService.getTowns();
                    }
                ]
            }
        });

        $stateProvider.state('adminCreateTown', {
            title: 'Create Town',
            url: '/admin/create/town',
            templateUrl: 'App/templates/admin/createTown.html',
            controller: 'adminCreateTownController',
        });

        $stateProvider.state('adminEditTown', {
            title: 'Towns',
            url: '/admin/town/{townId}',
            templateUrl: 'App/templates/admin/editTown.html',
            controller: 'adminEditTownController',
            resolve: {
                town: [
                    '$stateParams', 'adminTownService', function ($stateParams, adminTownService) {
                        return adminTownService.getTown($stateParams.townId);
                    }]
            }
        });
    }
]);

//================================================
// Reset filters on state change
// Set page title
//================================================ 
app.run(['$rootScope', 'adsFilterHelper', function ($rootScope, adsFilterHelper) {
    $rootScope.$on("$stateChangeSuccess", function (event, toState, toParams) {
        adsFilterHelper.resetSettings();
        $rootScope.title = $rootScope.$state.current.title;
    });
}]);