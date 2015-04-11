/// <reference path="../services/adsService.js" />
'use strict';

app.controller('publishAdController',
['adsService', 'allCategories', 'allTowns', '$state', '$scope',
    function (adsService ,allCategories, allTowns, $state, $scope) {
        $scope.ad = {};
        $scope.allCategories = allCategories;
        $scope.allTowns = allTowns;

        $scope.publish = function () {
            adsService.publishAd($scope.ad).then(
                function () {
                    $state.go('userAds')
                });
        }

        $scope.fileSelected = function (fileInputField) {
            delete $scope.ad.imageDataUrl;
            $scope.$apply(function () {
                $scope.fileTypeError = false;
            });
            var file = fileInputField.files[0];
            if (file.type.match(/image\/.*/)) {
                var reader = new FileReader();
                reader.onload = function () {
                    $scope.ad.imageDataUrl = reader.result;
                    $("#image-preview").attr("src", reader.result);
                };
                reader.readAsDataURL(file);
            } else {
                $scope.$apply(function () {
                    $scope.fileTypeError = true;
                });
            }
        };

    }
]);