var app = angular.module('toDoList', ['firebase', 'ngRoute']);

app.config(function($routeProvider) {
  $routeProvider.when('/', {
    templateUrl: 'partials/landing.html',
    controller: 'AuthController'
  })
  .when ('/todos', {
    templateUrl: 'partials/todos.html',
    controller: 'TodosController',
    resolve: {user: resolveUser}
  })
})

app.run(function($rootScope, $location){
  $rootScope.$on('$routeChangeError', function(event, next, previous, error) {
    if(error === 'AUTH_REQUIRED') {
      $location.path('/')
    }
  })
})

function resolveUser($firebaseAuth) {
  var authRef = new Firebase("https://rynetodolist.firebaseio.com/");
  var authObj = $firebaseAuth(authRef);
  return authObj.$requireAuth();
}
