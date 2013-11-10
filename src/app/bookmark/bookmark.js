angular.module('kuansim.bookmark', [
  'ui.router'
])

.factory('Bookmark', function($http) {
  return {
    getBookmarks: function() {
      return $http.get('/collections/bookmarks/');
    }
  };
})

.controller('BookmarkCtrl', function BookmarkCtrl($scope, Bookmark) {

  $scope.bookmarks = [];

  var getAllBookmarks = {
    success: function(data, status) {
      $scope.bookmarks = data.events;
    },
    error: function(data, status) {
      $scope.bookmarks = [];
    }
  };
  // Bookmark.getBookmarks().success(getAllBookmarks.success).error(getAllBookmarks.error);
})

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

;

