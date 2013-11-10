angular.module('kuansim.bookmark', [
  'ui.router'
])

.config(function ($stateProvider) {
  $stateProvider
    .state('bookmark', {
      url: '/bookmark',
      title: 'Bookmarks',
      templateUrl: 'bookmark/bookmark.tpl.html',
      controller: 'BookmarkCtrl'
    })
    ;
})

.controller('BookmarkCtrl', function BookmarkCtrl($scope) {
})

;

