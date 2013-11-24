angular.module('kuansim.user.profile', [
  'kuansim.alert',
  'kuansim.api'
]).

controller('CurrentProfileCtrl', function ($scope, $http, Alert, API) {

  $scope.profile = {};

  $http.get(API('/users/profile')).
    success(function (response) {
      if (response.success) {
        $scope.profile = response.profile;
      } else {
        Alert.setFromResponse(response);
      }
    });

});