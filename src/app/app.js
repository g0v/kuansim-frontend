angular.module('kuansim', [
  'templates-app',
  'templates-common',
  'kuansim.landing',
  'kuansim.about',
  'ui.router'
])
.config(function ($stateProvider) {
  $stateProvider
    .state('landingPage', {
      url: '/',
      templateUrl: 'home/home.tpl.html',
      controller: 'LandingCtrl',
      title: 'Kuansim'
    })
    ;
})
.run(function ($rootScope, $state) {
  $rootScope.state = $state;
})
.controller('AppCtrl', function AppCtrl($scope, $location) {
  console.log($scope);
})

;

