instagramApp.controller('photoController', function photoController($scope, $http) {
    var counter = 0,
        names = [];
        isNeedToLoad = false;
        $scope.items = [];

    init();

    function init () {
         $http({method: 'GET', url: '/firstImages'})
          .then(function successCallback(response) {
              names = response.data.src;
              console.log($scope.names);
              for (let i = 0; i < 12; i++) {
                  $scope.items.push({id: counter, name: names[counter]});
                  counter += 1;
              }
              counter = counter-12;
          }, function errorCallback(response) {});
    }
         
    $scope.startLoading = function () {
        isNeedToLoad = true;
        $http({method: 'GET', url: '/images'})
        .then(function successCallback(response) {
              names = response.data.src;
              $scope.loadMore();
        }, function errorCallback(response) {});
    }

    $scope.loadMore = function() {
        if (isNeedToLoad) {
          document.getElementsByTagName('button')[1].style.display = 'none';
         
          for (let i = 0; i < 9; i++) {
              $scope.items.push({id: counter, name: names[counter]});
              counter++;
          }
        }
    };
});