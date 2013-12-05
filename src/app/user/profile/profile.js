angular.module('kuansim.user.profile', [
  'kuansim.alert'
])

.controller('CurrentProfileCtrl', function ($scope, $http, Alert) {

  $scope.profile = {};

  $http.get('/users/profile').
    success(function (response) {
      if (response.success) {
        $scope.profile = response.profile;
      } else {
        Alert.setFromResponse(response);
      }
    });

})

.config(function ($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('profile.view', {
      url: '/view',
      templateUrl: 'user/profile/profile_view.tpl.html',
      title: 'User Profile - View',
      controller: 'CurrentProfileCtrl'
    });
})

;