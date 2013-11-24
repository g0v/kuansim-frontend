var navModule = angular.module('kuansim.nav', [
  'kuansim.user',
  'kuansim.alert',
  'oauth',
  'ngCookies',
  'kuansim.api'
])

.controller('NavCtrl', function NavCtrl($scope, OAuth, $http, User, Alert, API) {

  $scope.isLoggingIn = false;
  $scope.currentUser = User;

  $scope.logIn = function(provider) {
    $scope.isLoggingIn = true;
    OAuth.popup(provider, function(error, result) {
      if (error) {
        console.log(error);
      } else {
        $http.post(API('/users/authenticate'), {
          provider: provider,
          access: result.access_token
        }).
        success(function(data) {
          $scope.isLoggingIn = false;
          User.logIn(data.email, data.name);
        }).
        error(function(data) {
          $scope.isLoggingIn = false;
          console.log(data);
        });
      }
    });

  };

  $scope.logOut = function() {
    $http.get(API('/users/sign_out')).
      success(function() {
        User.logOut();
        window.location.href = '/';
      }).
      error(function(data) {
        console.log(data);
      });
  };

});