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
            console.log(data);
            User.logIn(data.email, data.name);
            console.log(User.name());
            console.log(User.email());
          }).
          error(function(data) {
            console.log(data);
          });
      }
    });

  };

  $scope.currentUser = function() {
    return User;
  };

  $scope.userLogout = function() {
  };

});