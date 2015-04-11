/// <reference path="../services/adsService.js" />
'use strict';

app.controller('editAdController',
['ad', 'adsService', 'allCategories', 'allTowns', '$state', '$scope',
    function (ad, adsService, allCategories, allTowns, $state, $scope) {
        $scope.ad = ad;
        ad.changeImage = false;
        $scope.allCategories = allCategories;
        $scope.allTowns = allTowns;
        

        $scope.edit = function () {
            adsService.saveEdit($scope.ad).then(
                function () {
                    $state.go('userAds')
                });
        }
        
        $scope.deleteImage = function () {
            $scope.ad.imageDataUrl = null;
            ad.changeImage = true;
            $("#image-preview").attr("src", "../../Content/images/nophoto.jpg");
            angular.element("input[type='file']#image").val('');
            $scope.fileTypeError = false;
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
                    $scope.$apply(function () {
                        $scope.ad.imageDataUrl = reader.result;
                        $scope.ad.changeImage = true;
                    });
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