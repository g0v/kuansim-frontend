angular.module('kuansim.issue', [

])

.directive('timeline', function ($timeout) {
  return {
    restrict: 'A',
    scope: {},
    link: function (scope, element, attrs) {
      var postpone = $timeout(function() {
          createStoryJS({
              type:       'timeline',
              width:      '800',
              height:     '600',
              source:     dataObj,
              embed_id:   'issue'
          });
      }, 0);
      console.log("Running timelineJS");

    }
  };
})

;