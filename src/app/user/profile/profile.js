angular.module('kuansim.user.profile', [
  'kuansim.alert'
]).

controller('CurrentProfileCtrl', function ($scope, $http, Alert) {

  $scope.profile = {};

  $http.get('/users/profile').
    success(function (response) {
      if (response.success) {
        $scope.profile = response.profile;
      } else {
        Alert.setFromResponse(response);
      }
    });

});