instagramApp.controller('photoController', function photoController($scope, $http) {
    var names = [],
        IMAGES_NUMBER = 30,
        PRELOAD_NUMBER = 12,
        counter = 0,
        SCROLL_NUMBER = 6,
        isNeedToLoad = false;
        $scope.items = [];

    init();

    function init () {
         $http({method: 'GET', url: '/firstImages'})
          .then(function successCallback(response) {
              names = response.data.src;
             
              for (let i = 0; i < PRELOAD_NUMBER; i++) {
                  $scope.items.push({id: counter, name: names[i]});
              }
  
          }, function errorCallback(response) {});
    }
         
    $scope.startLoading = function () {
        isNeedToLoad = true;

        $http({method: 'GET', url: '/images'})
        .then(function successCallback(response) {
              names = response.data.src;
              console.log(names);
              $scope.loadMore();
        }, function errorCallback(response) {});
    }

    $scope.loadMore = function() {
        if (isNeedToLoad && counter + PRELOAD_NUMBER <= IMAGES_NUMBER - SCROLL_NUMBER) {
          document.getElementsByTagName('button')[1].style.display = 'none';
         
          for (let i = 0; i < SCROLL_NUMBER; i++) {
              $scope.items.push({id: counter, name: names[counter]});
              counter++;
          }
        }
    };
});