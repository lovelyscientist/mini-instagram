angular
    .module('instagramApp')
    .controller('PhotoController', PhotoController);

PhotoController.$inject = ['$scope', '$http', '$timeout'];

function PhotoController($scope, $http, $timeout) {
    var names = [],
        IMAGES_NUMBER = 0,
        PRELOAD_NUMBER = 12,
        counter = 0,
        SCROLL_NUMBER = 3,
        isNeedToLoad = false;
        $scope.items = [];

    init();

    this.message = 'hi';

    function init () {
         $http({method: 'GET', url: '/images'})
          .then(function successCallback(response) {
              names = response.data.src;
              IMAGES_NUMBER = names.length;
              counter = 3;
             
              for (let i = 0; i < PRELOAD_NUMBER; i++) {
                  $scope.items.push({id: counter, name: names[i]});
              }
  
          }, function errorCallback (response) {});
    }
         
    $scope.startLoading = function () {
        isNeedToLoad = true;
        $scope.loadMore();
    }

    $scope.loadMore = function (number) {
       if (isNeedToLoad && counter + SCROLL_NUMBER <= IMAGES_NUMBER) {
          document.getElementsByTagName('button')[1].style.display = 'none';
         
          for (let i = 0; i < SCROLL_NUMBER; i++) {
              $scope.items.push({id: counter, name: names[counter]});
              counter++;
          }
      }
    }
}