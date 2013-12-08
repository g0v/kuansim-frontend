/**
 * Each section of the site has its own module. It probably also has
 * submodules, though this boilerplate is too simple to demonstrate it. Within
 * `src/app/home`, however, could exist several additional folders representing
 * additional modules that would then be listed as dependencies of this one.
 * For example, a `note` section could have the submodules `note.create`,
 * `note.delete`, `note.edit`, etc.
 *
 * Regardless, so long as dependencies are managed correctly, the build process
 * will automatically take take of the rest.
 *
 * The dependencies block here is also where component dependencies should be
 * specified, as shown below.
 */
angular.module('kuansim.landing', [
])

/**
 * Each section or module of the site can also have its own routes. AngularJS
 * will handle ensuring they are all available at run-time, but splitting it
 * this way makes each module more "self-contained".
 */

/**
 * And of course we define a controller for our route.
 */
.controller('LandingCtrl', function LandingCtrl($scope, $timeout) {

  $scope.itemHovered = false;
  $scope.jumboHeads = ['select', 'arrange', 'petition', 'action', 'review'];
  $scope.jumboInfo = {
    select: "Gather information related to different issues.",
    arrange: "Arrange and organize the selected information as bookmarks.",
    petition: "Find like-minded people.",
    action: "Take action in the real world.",
    review: "Review the course of an issue using timeline and track the current status of the issue."
  };
  $scope.jumboHead = "Kuansim";
  $scope.jumboBody = "Kuansim is a place where concerned citizens can share and grow their ideas about social and political issues.";
  
  $scope.jumboOnEnter = function(hovered) {
    $scope.jumboHead = capitalizeFirstLetter(hovered);
    $scope.jumboBody = $scope.jumboInfo[hovered];
    $scope.itemHovered = true;
  };

  $scope.jumboOnLeave = function() {
    $timeout(function() {
      if (!$scope.itemHovered) {
        $scope.jumboHead = "Kuansim";
        $scope.jumboBody = "Kuansim is a place where concerned citizens can share and grow their ideas about social and political issues.";
      }
    }, 1000);
    $scope.itemHovered = false;
  };

  var capitalizeFirstLetter = function(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

})

;

