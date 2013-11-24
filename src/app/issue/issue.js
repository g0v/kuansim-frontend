angular.module('kuansim.issue', [
  'ui.router',
  'kuansim.api'
])

.directive('timeline', function ($timeout, $http, API) {
  return {
    restrict: 'A',
    scope: {
      timelineIssue: '='
    },
    link: function (scope, element, attrs) {
      scope.$watch('timelineIssue', function (timelineIssue) {
        if (timelineIssue) {
          console.log(">>>", timelineIssue);
          $('#issue').empty();
          $http.get(API('/collections/issues/' + timelineIssue)).success(function (response) {
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
          });
        }
      });
    }
  };
})

.config(function ($stateProvider) {
  $stateProvider
    .state('issue', {
      url: '/issue',
      title: 'Kuansim Issue Timeline',
      templateUrl: 'issue/issue.tpl.html',
      controller: 'IssueCtrl'
    })
    ;
})

.controller('IssueCtrl', function IssueCtrl($scope, $http, API) {

  $http.get(API('/collections/issues')).success(function (response) {
    $scope.issues = response;
    $scope.selectedIssue = $scope.issues[0];
    $scope.selectedIssueId = $scope.selectedIssue.id;
  });


})

;