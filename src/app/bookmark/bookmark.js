angular.module('kuansim.bookmark', [
])

.factory('Bookmark', function($http) {
  return {
    getBookmarks: function() {
      return $http.get('/collections/bookmarks/');
    },
  };
})

.controller('BookmarkCtrl', function BookmarkCtrl($scope, Bookmark) {

  var getAllBookmarks = {
    success: function(data, status) {
      $scope.bookmarks = data.events;
    },
    error: function(data, status) {
      $scope.bookmarks = [];
    }
  };
  Bookmark.getBookmarks().success(getAllBookmarks.success).error(getAllBookmarks.error);

})

;

