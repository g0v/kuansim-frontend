angular.module('kuansim.nav', [
  'kuansim.user'
])

.controller('NavCtrl', function NavCtrl($scope, OAuth) {
  $scope.testOAuth = function () {
    OAuth.popup('google', function(error, result) {

    });
  };
})

;

