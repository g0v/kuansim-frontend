var navModule = angular.module('kuansim.nav', [
  'kuansim.user'
])

.controller('NavCtrl', function NavCtrl($scope, OAuth, $http, User) {

  $scope.thirdPartySignIn = function(provider) {
    OAuth.popup(provider, function(error, result) {
      if (error) {
        console.log(error);
      } else {
        $http.post('/users/authenticate', {
          provider: provider,
          access: result.access_token
        }).
          success(function(data) {
            User.logIn(data.email, data.name);
          }).
          error(function(data) {
            console.log(data);
          });
      }
    });

  };

  $scope.currentUser = User;

  $scope.userLogout = function() {
    $http.post('/users/sign_out', {email: User.email()}).
      success(function() {
        window.location.href = '/';
      }).
      error(function(data) {
        console.log(data);
      });
  };

});