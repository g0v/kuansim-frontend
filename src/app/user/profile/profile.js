angular.module('kuansim.user.profile', [
  'kuansim.alert'
])

.factory('Profile', function ($http) {

  return {
    getFollowedIssues: function(userId) {
      return $http.get('/users/uid/' + userId + '/issues');
    },
    getCurrentProfile: function() {
      return $http.get('/users/profile');
    }
  };

})

.controller('CurrentProfileCtrl', function ($scope, $http, Alert, Profile, User, Issue) {

  $scope.profile = {};

  Profile.getCurrentProfile().success(function (response) {
    if (response.success) {
      $scope.profile = response.profile;
    } else {
      Alert.setFromResponse(response);
    }
  });

  /* Only get issues followed by current user once logged in */
  User.userReady().then(function() {
    Profile.getFollowedIssues(User.id).success(function (response) {

      $scope.followedIssues = response;
      var recommendedIssues = {};

      var successFn = function(response) {
        for (var j = 0; j < response.related.length; j++) {
          var relatedIssue = JSON.parse(response.related[j]);
          if (!recommendedIssues[relatedIssue.id]) {
            recommendedIssues[relatedIssue.id] = relatedIssue;
          }
        }
      };

      for (var i = 0; i < $scope.followedIssues.length; i++) {
        Issue.getRelatedIssues($scope.followedIssues[i].id).success(successFn);
      }

      console.log(recommendedIssues);
    });
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