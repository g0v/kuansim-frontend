angular.module('kuansim', [
  'templates-app',
  'templates-common',
  'kuansim.nav',
  'kuansim.user',
  'kuansim.landing',
  'kuansim.about',
  'kuansim.bookmark',
  'kuansim.issue',
  'kuansim.alert',
  'ui.router',
  'ngCookies',
  'oauth'
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

.run(function ($rootScope, $state, OAuth, $cookies, User, $http, Alert) {
  $rootScope.state = $state;
  OAuth.initialize('SGZsWy9SUN3ce4-sAMsgQNbB0fA');

  console.log($cookies['X-XSRF-TOKEN']);

  var verifyLogin = function(email, name) {
    $http.get('/users/verify').
      success(function(response) {
        if (!response.success) {
          Alert.setFromResponse(response);
        } else {
          User.logIn(response.email, response.name);
        }
      });
  };

  verifyLogin();

});

