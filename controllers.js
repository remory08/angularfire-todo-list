app.controller('TodosController', function($scope, $firebaseArray, $firebaseAuth, $location, user) {
  console.log(user);
  var authRef = new Firebase("https://rynetodolist.firebaseio.com/");
  var authObj = $firebaseAuth(authRef);
  var todosRef = new Firebase("https://rynetodolist.firebaseio.com/list")
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
    todo.completed = !todo.completed;
    $scope.todos.$save(todo);
  }

  $scope.logout = function() {
    authObj.$unauth();
    $location.path('/')
  }

})

app.controller('AuthController', function($scope, $location, $firebaseAuth) {
  var authRef = new Firebase("https://rynetodolist.firebaseio.com/");
  var authObj = $firebaseAuth(authRef);

  $scope.register = function() {
    authObj.$createUser($scope.user).then(function() {
      $scope.login()
    })
  }

  $scope.login = function() {
    authObj.$authWithPassword($scope.user).then(function() {
      $location.path('/todos')
    })
    //still need to add another .then with a function to handle incorrect login combo
  }
})
