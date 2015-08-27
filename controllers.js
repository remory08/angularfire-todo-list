app.controller('TodosController', function($scope, $firebaseArray) {
  var todosRef = new Firebase("https://burning-torch-8054.firebaseio.com/list")
  $scope.todos = $firebaseArray(todosRef);
  $scope.newTodo = {text: "", completed: false};

  $scope.addTodo = function() {
    $scope.todos.$add($scope.newTodo);
    $scope.newTodo = "";
  }

  $scope.removeTodo = function (todo) {
    $scope.todos.$remove(todo);
  }

  $scope.strike = function(todo) {
    console.log(todo);
    todo.completed = !todo.completed;
    $scope.todos.$save(todo);
  }

})
