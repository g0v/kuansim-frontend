var navModule = angular.module('kuansim.nav', [
  'kuansim.user',
  'kuansim.alert',
  'oauth',
  'ngCookies'
])

.controller('NavCtrl', function NavCtrl($scope, $window, OAuth, $http, User, Alert) {

  $scope.isLoggingIn = false;
  $scope.currentUser = User;

  $scope.logIn = function(provider) {
    $scope.isLoggingIn = true;
    OAuth.popup(provider, function(error, result) {
      if (error) {
        console.log(error);
      } else {
        $http.post('/users/authenticate', {
          provider: provider,
          access: result.access_token
        }).
        success(function(data) {
          $scope.isLoggingIn = false;
          User.logIn(data.email, data.name, data.id);
          $window.location.reload();
        }).
        error(function(data) {
          $scope.isLoggingIn = false;
          console.log(data);
        });
      }
    });

  };

  $scope.logOut = function() {
    $http.get('/users/sign_out').
      success(function() {
        User.logOut();
        window.location.href = '/';
      }).
      error(function(data) {
        console.log(data);
      });
  };

});