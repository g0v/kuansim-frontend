var navModule = angular.module('kuansim.nav', [
  'kuansim.user',
  'oauth',
  'ngCookies'
])

.controller('NavCtrl', function NavCtrl($scope, OAuth, $http, User, $cookies) {

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
          User.logIn(data.email, data.name);
          $cookies.user = JSON.stringify({email: data.email, name: data.name});
        }).
        error(function(data) {
          $scope.isLoggingIn = false;
          console.log(data);
        });
      }
    });

  };

  $scope.logOut = function() {
    $http.post('/users/sign_out', {email: User.email}).
      success(function() {
        User.logOut();
        $cookies.user = "";
        window.location.href = '/';
      }).
      error(function(data) {
        console.log(data);
      });
  };

});