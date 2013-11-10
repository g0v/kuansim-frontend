angular.module('kuansim', [
  'templates-app',
  'templates-common',
  'kuansim.nav',
  'kuansim.user',
  'kuansim.landing',
  'kuansim.about',
  'ui.router'
])
.config(function ($stateProvider, $urlRouterProvider) {
  $urlRouterProvider
    .when('', '/')  // This is a AngularUI router ambiguity, needs to be resolved
    ;
  $stateProvider
    .state('index', {
      url: '/',
      title: 'Kuansim',
      views: {
        'navigation': {
          templateUrl: 'nav/nav.tpl.html',
          controller: 'NavCtrl'
        },
        'landing': {
          templateUrl: 'landing/landing.tpl.html',
          controller: 'LandingCtrl'
        }
      }
    })
    ;
})
.controller('AppCtrl', function AppCtrl($scope, $location) {

})

.run(function ($rootScope, $state, OAuth) {
  $rootScope.state = $state;
  OAuth.initialize('SGZsWy9SUN3ce4-sAMsgQNbB0fA');
})
;

