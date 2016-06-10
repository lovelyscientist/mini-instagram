'use strict';

class PhotoController {
  constructor ($scope, $http, $timeout, getImages) {
    this.names = [],
    this.counter = 0,
    this.isNeedToLoad = false,
    this.IMAGES_NUMBER = 0,
    this.SCROLL_NUMBER = 3;
    this.$scope = $scope;
    this.$scope.items = [];
    this.$scope.isHideBtn = false;
    this.$scope.loadedCount = 0;
    this.$scope.loaded = [];
    this.$scope.PRELOAD_NUMBER = 12;

    this.$scope.loadMore = () => {
       if (this.isNeedToLoad && this.counter + this.SCROLL_NUMBER <= this.IMAGES_NUMBER) {
         this.$scope.isHideBtn = true;
         
          for (let i = 0; i < this.SCROLL_NUMBER; i++) {
              this.$scope.items.push({id: this.counter, name: this.names[this.counter]});
              this.counter++;
          }
      }
    }


    this.$scope.startLoading = () => {
        this.isNeedToLoad = true;
        this.$scope.loadMore();
    }

    var init =  () => {
      let _this = this;
      let response = getImages();
    
        _this.names = response.data.src;
        _this.IMAGES_NUMBER = _this.names.length;

        _this.checkServerResponse(_this.names);
   
        for (let i = 0; i < _this.$scope.PRELOAD_NUMBER; i++) {
            _this.$scope.items.push({id: _this.counter, name: _this.names[i]});
        }

        _this.counter = _this.$scope.PRELOAD_NUMBER;
    }

    init();

  }

  checkServerResponse (response) {
        if (response.length < this.$scope.PRELOAD_NUMBER) {
            this.$scope.PRELOAD_NUMBER = response.length;
            this.$scope.isHideBtn = true;

            if (response.length === 0) {
               this.$scope.isNoImages = true;
            }
        }
  }
}


angular
    .module('instagramApp')
    .controller('PhotoController', PhotoController);

PhotoController.$inject = ['$scope', '$http', '$timeout', 'getImages'];