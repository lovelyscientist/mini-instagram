
describe('test module', function () {
    beforeEach(module('instagramApp'));
    
    describe('test controller', function () {
        var scope, controller, http;

        beforeEach(inject(function($rootScope, $controller, $injector) {
            scope = $rootScope.$new();
            controller = $controller('PhotoController', {'$scope': scope});
            controller.$scope = scope;
        }));

        it('should have items variable clean', function(){
            expect(controller.$scope.items).toEqual([]);
        });

});

    describe('test http service with certain array', function () {
        beforeEach(inject(function($controller, $rootScope, $httpBackend) {
            $scope = $rootScope.$new();

            MainCtrl = $controller('PhotoController', { $scope: $scope });

            $httpBackend.when('GET', '/images')
                .respond({src: ["1wwqs.jpeg", "aaaaaa.jpeg", "aadadad.jpeg", "asasas.jpeg", "asasasassasasas.jpeg", "ddd.jpg", "dfdfdf.jpeg", "dfdfdfdf.jpeg", "dfdfdfdfdf.jpeg", "dffdfdfdf.jpeg", "eee.jpg", "eeeeee.jpg", "erwerewrer.jpeg", "fdfdf.jpeg", "fdfdfdfdfdf.jpeg", "fdfdfdfdfdfdfdfdf.jpeg", "ffffff.jpeg", "greatb-isanyb_03.jpg", "kygo.jpeg", "rere.jpg", "rr.jpg", "sdfsdfsdf.jpeg", "sfsfsfs.jpeg", "werer.jpeg", "werwererwerwerwe.jpeg", "werwerwerewr.jpeg", "wew.jpg", "ww.jpg", "xcvxcvvvv.jpeg", "xcvxvxcv.jpeg"]});

            $httpBackend.flush();
      }));

      it('should load 30 images names', function () {
          expect($scope.items.length).toEqual(12);
      });
    });

     describe('test http service when there are no images', function () {
          beforeEach(inject(function($controller, $rootScope, $httpBackend) {
              $scope = $rootScope.$new();

              MainCtrl = $controller('PhotoController', { $scope: $scope });

              $httpBackend.when('GET', '/images')
                  .respond({src: []});

              $httpBackend.flush();
          }));

          it('should load zero images', function () {
              expect($scope.isNoImages).toEqual(true);
          });

      });

      describe('test http service when there are less images than preload number', function () {
           beforeEach(inject(function($controller, $rootScope, $httpBackend) {
              $scope = $rootScope.$new();

              MainCtrl = $controller('PhotoController', { $scope: $scope });

              $httpBackend.when('GET', '/images')
                  .respond({src: ["1wwqs.jpeg", "aaaaaa.jpeg", "aadadad.jpeg", "asasas.jpeg"]});

              $httpBackend.flush();
            }));

          it('should show only loaded images', function () {
              expect($scope.PRELOAD_NUMBER).toEqual($scope.items.length);
          });

           it('should hide load more button', function () {
              expect($scope.isHideBtn).toEqual(true);
           });

      });

       describe('test that all images downloaded well', function () {
              beforeEach(inject(function($controller, $rootScope, $httpBackend) {
                  $scope = $rootScope.$new();

                  MainCtrl = $controller('PhotoController', { $scope: $scope });

              }));

              it('should have all images loaded', function () {
                  expect($scope.items.length).toEqual($scope.loaded.length);
              });

      });

});