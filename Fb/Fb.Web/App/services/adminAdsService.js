﻿"http://localhost:1337/api/ads?pagesize=3&startpage=2"

'use strict';

app.factory('adminAdsService', [
    'postFilterHelper', '$http', '$q', 'toaster', 'apiUrl',
    function (postFilterHelper, $http, $q, toaster, apiUrl) {
        var settings = postFilterHelper.getSettings();

        var getAds = function () {
            var deferred = $q.defer();
            $http.get(apiUrl + 'api/admin/ads', {
                params: {
                    startpage: postFilterHelper.getPage(),
                    pagesize: settings.pageSize,
                    categoryid: postFilterHelper.getCategory(),
                    townid: postFilterHelper.getTown(),
                    status: postFilterHelper.getStatus()
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

        var approveAd = function (adId) {
            var deferred = $q.defer();
            $http.put(apiUrl + 'api/admin/ads/approve/' + adId)
            .success(function (data) {
                toaster.pop('success', '', "Advertisement published.");
                deferred.resolve(data);
            })
            .error(function (data, status) {
                deferred.reject(data, status);
            });
            return deferred.promise;
        }

        var rejectAd = function (adId) {
            var deferred = $q.defer();
            $http.put(apiUrl + 'api/admin/ads/reject/' + adId)
            .success(function (data) {
                toaster.pop('success', '', "Advertisement rejected.");
                deferred.resolve(data);
            })
            .error(function (data, status) {
                deferred.reject(data, status);
            });
            return deferred.promise;
        }

        var deleteAd = function (adId) {
            var deferred = $q.defer();
            $http.delete(apiUrl + 'api/admin/ads/' + adId)
            .success(function (data) {
                toaster.pop('success', '', "Advertisement deleted.");
                deferred.resolve(data);
            })
            .error(function (data, status) {
                deferred.reject(data, status);
            });
            return deferred.promise;
        }

        var getAd = function (adId) {
            var deferred = $q.defer();
            $http.get(apiUrl + 'api/admin/ads/' + adId)
            .success(function (data) {
                deferred.resolve(data);
            })
            .error(function (data, status) {
                deferred.reject(data, status);
            });
            return deferred.promise;
        }

        var saveEdit = function (ad) {
            var deferred = $q.defer();
            $http.put(apiUrl + 'api/admin/ads/' + ad.id, ad)
            .success(function (data) {
                toaster.pop('success', '', "Advertisement changes saved.");
                deferred.resolve(data);
            })
            .error(function (data, status) {
                deferred.reject(data, status);
            });
            return deferred.promise;
        }

        return ({
            getAds: getAds,
            approveAd: approveAd,
            rejectAd: rejectAd,
            getAd: getAd,
            deleteAd: deleteAd,
            saveEdit: saveEdit,
        });
    }
])