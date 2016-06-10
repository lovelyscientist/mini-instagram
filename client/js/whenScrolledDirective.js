angular
    .module('instagramApp')
	.directive('whenScrolled', () => new whenScrolled());

class whenScrolled {
    constructor () {
        this.restrict = 'A';
        //this.scope = {
            //loadPhotos: '&'
        //};
        this.link = (scope, element, attrs) => {
            let row = element[0];

            element.bind('scroll', (event) => {
                let realScrolledValue = row.scrollTop + row.offsetHeight,
                    fixedScrollValue = row.scrollHeight;

                if (realScrolledValue >= fixedScrollValue) { 
                   //scope.loadPhotos();
                   scope.$apply(attrs.whenScrolled);
                }
            });
        };
    }
}

/*function whenScrolled () {
    var directive = {
        restrict: 'A',
        link : WhenScrolledAction
    };
    return directive;
}

function WhenScrolledAction (scope, element, attrs) {
    let row = element[0];

    element.bind('scroll', function (event) {
        let realScrolledValue = row.scrollTop + row.offsetHeight,
            fixedScrollValue = row.scrollHeight;

       if (realScrolledValue >= fixedScrollValue) {
            scope.$apply(attrs.whenScrolled);
        }
    });
}*/