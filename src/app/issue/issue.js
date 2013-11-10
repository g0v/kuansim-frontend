angular.module('kuansim.issue', [

])

.directive('timeline', function ($timeout, $http) {
  return {
    restrict: 'A',
    scope: {},
    link: function (scope, element, attrs) {

      scope.sampleJson = $http.get('assets/json/timeline_sample.json').success(function (response) {
        console.log('fetching sample timeline data GOOD!', response);
        return response;
      });

      var postpone = $timeout(function() {
        createStoryJS({
            type:       'timeline',
            width:      '800',
            height:     '600',
            source:     scope.sampleJson,
            embed_id:   'issue',
            debug:      true
        });
      }, 0);
      console.log("Running timelineJS");

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

.controller('IssueCtrl', function IssueCtrl($scope) {

})

;