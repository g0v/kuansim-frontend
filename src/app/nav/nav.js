angular.module('kuansim.nav', [
  'kuansim.user'
])

.controller('NavCtrl', function NavCtrl($scope, OAuth, $http) {

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
          }).
          error(function(data) {
            console.log(data);
          });
      }
    });
  };

});


