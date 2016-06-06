'use strict';

angular
    .module('instagramApp')
    .controller('PhotoController', PhotoController);

PhotoController.$inject = ['$scope', '$http', '$timeout'];

function PhotoController($scope, $http, $timeout) {
    var names = [],
        counter = 0,
        isNeedToLoad = false;
        $scope.items = [];
        $scope.isHideBtn = false;
        $scope.loadedCount = 0;
        $scope.loaded = [];

      
    //export 
    var IMAGES_NUMBER = 0;
        $scope.PRELOAD_NUMBER = 12;
    var SCROLL_NUMBER = 3;

    init();

    function init () {
         $http({method: 'GET', url: '/images'})
          .then(function successCallback(response) {
                names = response.data.src;
                IMAGES_NUMBER = names.length;

                checkServerResponse(names);
           
                for (let i = 0; i < $scope.PRELOAD_NUMBER; i++) {
                    $scope.items.push({id: counter, name: names[i]});
                }

                counter = $scope.PRELOAD_NUMBER;
  
          }, function errorCallback (response) {});
    }

    function checkServerResponse (response) {
        if (response.length < $scope.PRELOAD_NUMBER) {
            $scope.PRELOAD_NUMBER = response.length;
            $scope.isHideBtn = true;

            if (response.length === 0) {
               $scope.isNoImages = true;
            }
        }
    }
         
    $scope.startLoading = function () {
        isNeedToLoad = true;
        $scope.loadMore();
    }

    $scope.loadMore = function () {
       if (isNeedToLoad && counter + SCROLL_NUMBER <= IMAGES_NUMBER) {
         $scope.isHideBtn = true;
         
          for (let i = 0; i < SCROLL_NUMBER; i++) {
              $scope.items.push({id: counter, name: names[counter]});
              counter++;
          }
      }
    }
}