angular.module('kuansim.issue', [
  'ui.router'
])

.directive('timeline', function ($timeout, $http) {
  return {
    restrict: 'A',
    scope: {
      timelineIssue: '='
    },
    link: function (scope, element, attrs) {
      scope.$watch('timelineIssue', function (timelineIssue) {
        if (timelineIssue) {
          $('#issue').empty();
          $http.get('/collections/issues/' + timelineIssue).success(function (response) {
            if (response.timeline) {
              scope.isNoBookmarkPresent = false;
              scope.sampleJson = response;
              $timeout(function() {
                createStoryJS({
                    type:       'timeline',
                    width:      '100%',
                    height:     '700',
                    source:     scope.sampleJson,
                    embed_id:   'issue'
                });
              }, 0);
              console.log("Running timelineJS");
            } else {
              scope.isNoBookmarkPresent = true;
            }
          });
        }
      });
    }
  };
})

.factory('Issue', function ($http) {
  return {
    getIssue: function(id) {
      return $http.get('/collections/issues/' + id);
    },
    getIssues: function() {
      return $http.get('/collections/issues');
    },
    createIssue: function(issue) {
      return $http.post('/collections/issues', issue);
    },
    deleteIssue: function(issue) {
      return $http.delete('/collections/issues/' + issue.id);
    },
    updateIssue: function(issue) {
      return $http.put('/collections/issues/' + issue.id, issue);
    },
    followIssue: function(id) {
      return $http.post('/users/issues/follow', {
        id: id
      });
    },
    getRelatedIssues: function(id) {
      return $http.get('/collections/issues/' + id + '/related');
    }
  };
})

.controller('IssueCtrl', function IssueCtrl($scope, $location, $http, Issue, Alert) {

  Issue.getIssues().success(function (response) {
    $scope.issues = response.issues;
  });

  $scope.linkToEditForm = function(id) {
    if (id) {
      $location.path('issue/' + id);
    } else {
      $location.path('issue/create');
    }
  };

  $scope.followIssue = function(issue) {
    Issue.followIssue(issue.id).success(function (data) {
      if (data.success) {
        issue.isFollowed = true;
      } else {
        Alert.setFromResponse(data);
      }
    });
  };

})

.controller('IssueViewCtrl', function IssueViewCtrl($scope, $stateParams, Issue) {
  $scope.issueTitle = $stateParams.title;
  Issue.getIssues()
    .success(function(data, status) {
      $scope.issues = data.issues;
    });
})

.controller('IssueFormCtrl', function IssueFormCtrl($scope, $location, Issue, Alert) {

  $scope.createIssue = function() {
    if ($scope.issueTitle && $scope.issueDescription) {
      var issue = {
        title: $scope.issueTitle,
        description: $scope.issueDescription
      };
      Issue.createIssue(issue)
        .success(function(data, status) {
          if (data.success) {
            Alert.setFromResponse({
              message: "Issue successfully created.",
              success: true
            });
            $location.path("issue");
          } else {
            Alert.setFromResponse({
              message: data.error,
              success: false
            });
          }
        });

    } else {
      console.log("Failed to create issue");
    }
  };
})


;