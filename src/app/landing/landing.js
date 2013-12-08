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
.controller('LandingCtrl', function LandingCtrl($scope, $timeout, Issue) {

  $scope.itemHovered = 'kuansim';
  $scope.isHovering = false;
  $scope.jumboHeads = ['select', 'arrange', 'petition', 'action', 'review'];
  $scope.jumboInfo = {
    select: "Gather information related to different issues.",
    arrange: "Arrange and organize the selected information as bookmarks.",
    petition: "Find like-minded people.",
    action: "Take action in the real world.",
    review: "Review the course of an issue using timeline and track the current status of the issue."
  };
  $scope.jumboIcons = {
    kuansim: 'heart',
    select: 'hand-up',
    arrange: 'list-alt',
    petition: 'pencil',
    action: 'flag',
    review: 'ok-sign'
  };
  $scope.jumboHead = "Kuansim";
  $scope.jumboBody = "Kuansim is a place where concerned citizens can share and grow their ideas about social and political issues.";
  
  $scope.jumboOnEnter = function(hovered) {
    $scope.jumboHead = capitalizeFirstLetter(hovered);
    $scope.jumboBody = $scope.jumboInfo[hovered];
    $scope.itemHovered = hovered;
    $scope.isHovering = true;
  };

  $scope.jumboOnLeave = function() {
    $timeout(function() {
      if (!$scope.isHovering) {
        $scope.jumboHead = "Kuansim";
        $scope.jumboBody = "Kuansim is a place where concerned citizens can share and grow their ideas about social and political issues.";
        $scope.itemHovered = 'kuansim';
      }
    }, 1000);
    $scope.isHovering = false;
  };

  var capitalizeFirstLetter = function(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  $scope.bookmarkPluginJs = 'javascript:(function(e,t){var n=e.document;setTimeout(function(){function a(e){if(e.data==="destroy_bookmarklet"){var r=n.getElementById(t);if(r){n.body.removeChild(r);r=null}}}var t="KUANSIM_bookmarklet_iframe",r=n.getElementById(t);if(r){return}var i="http://localhost:3000/bookmarks/save?source=bookmarklet&",s=n.createElement("iframe");s.id=t;s.src=i+"url="+encodeURIComponent(e.location.href)+"&title="+encodeURIComponent(n.title)+"&note="+encodeURIComponent(""+(e.getSelection?e.getSelection():n.getSelection?n.getSelection():n.selection.createRange().text));s.style.position="fixed";s.style.top="0";s.style.left="0";s.style.height="100%25";s.style.width="100%25";s.style.zIndex="16777270";s.style.border="none";s.style.visibility="hidden";s.onload=function(){this.style.visibility="visible"};n.body.appendChild(s);var o=e.addEventListener?"addEventListener":"attachEvent";var u=o=="attachEvent"?"onmessage":"message";e[o](u,a,false)},1)})(window)';

})

;

