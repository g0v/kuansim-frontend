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
  'kuansim.user.profile',
  'kuansim.api',
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
    })
    .state('profile', {
      url: '/profile',
      title: 'User Profile',
      templateUrl: 'user/profile/current_profile.tpl.html',
      controller: 'CurrentProfileCtrl'
    });
})
.controller('AppCtrl', function AppCtrl($scope, $location) {

})

.run(function ($rootScope, $state, OAuth, $cookies, User, $http, Alert, API) {
  $rootScope.state = $state;
  OAuth.initialize('SGZsWy9SUN3ce4-sAMsgQNbB0fA');

  var verifyLogin = function(email, name) {
    $http.get(API('/users/verify')).
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

