

instagramApp.directive('whenScrolled', function() {
    return function(scope, elm, attr) {
        var raw = elm[0];
        elm.bind('scroll', function() {
            if (raw.scrollTop + raw.offsetHeight >= raw.scrollHeight) {
                scope.$apply(attr.whenScrolled);
            }
        });

    };
});


instagramApp.controller('photoController', function photoController($scope) {
    $scope.items = [];
    $scope.isNeedToLoad = false;

     var counter = 0;
    for (var i = 0; i < 12; i++) {
            $scope.items.push({id: counter});
            counter += 10;
    }

    $scope.startLoading = function () {
        $scope.isNeedToLoad = true;
        $scope.loadMore();
    }

    $scope.loadMore = function() {
        if ($scope.isNeedToLoad) {
          document.getElementsByTagName('button')[0].style.display = 'none';
          for (var i = 0; i < 3; i++) {
              $scope.items.push({id: counter});
              counter += 10;
          }
        }
    };
});