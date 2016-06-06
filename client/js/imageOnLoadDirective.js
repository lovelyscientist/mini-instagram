angular
    .module('instagramApp')
	.directive('imageOnLoad', imageOnLoad);

function imageOnLoad () {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            element.bind('load', function() {
                scope.$apply(function (){
                    scope.loaded.push(new Date());
                });
            });
        }
    };
};
