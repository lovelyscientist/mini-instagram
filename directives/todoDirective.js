todoApp.directive('todoItem', function() {
  return {
    restrict: 'E',
    scope: {
      todo: 'info='
    },
    templateUrl: 'todoTemplate.html'
  };
});