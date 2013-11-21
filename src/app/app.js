angular.module('kuansim', [
  'templates-app',
  'templates-common',
  'kuansim.nav',
  'kuansim.user',
  'kuansim.landing',
  'kuansim.about',
  'kuansim.bookmark',
  'kuansim.issue',
  'ui.router',
  'ngCookies'
])
.config(function ($stateProvider, $urlRouterProvider) {
  $urlRouterProvider
    .when('', '/');  // This is a AngularUI router ambiguity, needs to be resolved
  $stateProvider
    .state('index', {
      url: '/',
      title: 'Kuansim',
      templateUrl: 'landing/landing.tpl.html',
      controller: 'LandingCtrl'
    });
})
.controller('AppCtrl', function AppCtrl($scope, $location) {

})

.run(function ($rootScope, $state, OAuth, $cookies, User, $http) {
  $rootScope.state = $state;
  OAuth.initialize('SGZsWy9SUN3ce4-sAMsgQNbB0fA');

  var verifyLogin = function(email, name) {
    $http.post('/users/verify', {
      email: email
    }).
    success(function(data) {
      if (!data.success) {
        console.log(data.message);
      } else {
        User.logIn(email, name);
      }
    });
  };

  if ($cookies.kuansimLogIn) {
    var logInCookie = JSON.parse($cookies.kuansimLogIn);
    var email = logInCookie.email;
    var name = logInCookie.name;
    verifyLogin(email, name);
  }

});

