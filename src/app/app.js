angular.module('kuansim', [
  'templates-app',
  'templates-common',
  'kuansim.nav',
  'kuansim.user',
  'kuansim.landing',
  'kuansim.about',
  'kuansim.bookmark',
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
      templateUrl: 'landing/landing.tpl.html',
      controller: 'LandingCtrl'
    })
    ;
})
.controller('AppCtrl', function AppCtrl($scope, $location) {

})

.run(function ($rootScope, $state, OAuth) {
  $rootScope.state = $state;
  OAuth.initialize('0S2d7bTw7uolrPTabNAbElFRNwA');
})
;

