angular.module('kuansim.user.profile', [
  'kuansim.alert'
])

.factory('Profile', function ($http) {

  return {
    getFollowedIssues: function(userId) {
      return $http.get('/users/' + userId + '/issues');
    },
    getCreatedBookmarks: function(userId) {
      return $http.get('/users/' + userId + '/events');
    },
    getCurrentProfile: function() {
      return $http.get('/users/profile');
    }
  };

})

.controller('CurrentProfileCtrl', function ($scope, $location, Alert, Profile, User, Issue) {

  $scope.profile = {};

  Profile.getCurrentProfile().success(function (response) {
    if (response.success) {
      $scope.profile = response.profile;
    } else {
      Alert.setFromResponse(response);
    }
  });

  $scope.isActive = function(route) {
    return $location.path() == route;
  };

})

.controller('CurrentProfileViewCtrl', function ($scope, Profile, User) {
  User.userReady().then(function() {
    $scope.username = User.name;
    $scope.email = User.email;
  });
})

.controller('CurrentProfileMyBookmarksCtrl', function ($scope, Profile, User, Bookmark) {

  User.userReady().then(function() {
    Profile.getCreatedBookmarks(User.id).success(function (response) {
      if (response.success) {
        $scope.myBookmarks = response.events;
      } /*should never fail to find user because always must be logged in*/
    });
  });

})

.controller('CurrentProfileMyIssuesCtrl', function ($scope, Profile, User, Issue) {
  /* Only get issues followed by current user once logged in */
  User.userReady().then(function() {
    Profile.getFollowedIssues(User.id).success(function (response) {

      $scope.followedIssues = response.issues;
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

    });
  });
})

;

