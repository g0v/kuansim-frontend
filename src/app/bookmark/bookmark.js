angular.module('kuansim.bookmark', [
  'ui.router',
  'ui.bootstrap'
])

.factory('Bookmark', function ($http) {
  return {
    getBookmark: function(id) {
      return $http.get('/collections/bookmarks/' + id);
    },
    getBookmarks: function() {
      return $http.get('/collections/bookmarks');
    },
    createBookmark: function(bookmark) {
      return $http.post('/collections/bookmarks', bookmark);
    },
    deleteBookmark: function(bookmark) {
      return $http.delete('/collections/bookmarks/' + bookmark.id);
    },
    updateBookmark: function(bookmark) {
      return $http.put('/collections/bookmarks/' + bookmark.id, bookmark);
    }
  };
})

.controller('BookmarkCtrl', function BookmarkCtrl($scope, $rootScope, Bookmark, Alert) {

  $scope.bookmarks = [];

  var getAllBookmarks = {
    success: function(data, status) {
      if (data.success) {
        $scope.bookmarks = data.events;
      } else {
        Alert.setFromResponse(data);
      }
    },
    error: function(data, status) {
      $scope.bookmarks = [];
      Alert.setFromResponse({
        message: "Sorry, there was a problem retreiving bookmarks.",
        success: false
      });
    }
  };

  $scope.getAllBookmarks = function() {
    Bookmark.getBookmarks().success(getAllBookmarks.success).error(getAllBookmarks.error);
  };

  var deleteBookmarkCallbacks = {
    success: function(data, status) {
      if (data.success) {
        Alert.setFromResponse({
          message: "Successfully deleted bookmark.",
          success: true
        });
      } else {
        Alert.setFromResponse(data);
      }
      $scope.getAllBookmarks();
    },
    error: function(data, status) {
      Alert.setFromResponse({
        message: "Sorry, there was a problem deleting the bookmark.",
        success: false
      });
    }
  };

  $scope.deleteBookmark = function(bookmark) {
    Bookmark.deleteBookmark(bookmark).success(deleteBookmarkCallbacks.success).error(deleteBookmarkCallbacks.error);
  };

  $scope.getAllBookmarks();

})

.controller('BookmarkCreateCtrl', function BookmarkCreateCtrl($scope, $rootScope, $location, Bookmark, Alert) {

  var today = new Date();
  $scope.bmDateStr = today.getUTCFullYear() + "-" + (today.getUTCMonth()+1) + "-" + today.getUTCDate();
  $scope.submitButtonText = 'Create Bookmark';

  var callbacks = {
    success: function(data, status) {
      if (data.success) {
        Alert.setFromResponseWithLocationChange({
          message: "Successfully created bookmark!",
          success: true
        });
        $location.path("bookmarks");
      } else {
        Alert.setFromResponse({
          message: "Failed to create bookmark. " + data.error,
          success: false
        });
      }
    },
    error: function(data, status) {
      Alert.setFromResponse({
        message: "Failed to create bookmark.",
        success: false
      });
    }
  };

  $scope.submitBookmark = function() {
    if ($scope.bmTitle && $scope.bmDateStr && $scope.bmLocation) {
      var dateList = $scope.bmDateStr.split("-");
      $scope.bmDate = new Date(dateList[0], dateList[1], dateList[2]);

      var bookmark = {
        title: $scope.bmTitle,
        date_happened: $scope.bmDate.getTime(),
        url: $scope.bmUrl,
        location: $scope.bmLocation,
        description: $scope.bmDescription,
        issues: $scope.bmIssues
      };
      Bookmark.createBookmark(bookmark).success(callbacks.success).error(callbacks.error);

    } else {
      Alert.setFromResponse({
        message: "Failed to create bookmark. Cannot have empty fields.",
        success: false
      });
    }
  };

})

.controller('BookmarkUpdateCtrl', function BookmarkCreateCtrl($scope, $location, $stateParams, Bookmark, Alert) {

  $scope.bookmarkId = $stateParams.id;
  $scope.submitButtonText = 'Update';

  var getCallbacks = {
    success: function(data, status) {
      if (data.success) {
        var bm = data.event;
        $scope.bmTitle = bm.title;
        $scope.bmDateStr = bm.date_happened.split("T")[0];
        $scope.bmUrl = bm.url;
        $scope.bmLocation = bm.location;
        $scope.bmDescription = bm.description;
        $scope.bmIssues = bm.issues;
      } else {
        Alert.setFromResponseWithLocationChange(data);
        $location.path("bookmarks");
      }
    },
    error: function(data, status) {
      Alert.setFromResponse(data);
    }
  };

  Bookmark.getBookmark($scope.bookmarkId).success(getCallbacks.success).error(getCallbacks.error);

  var putCallbacks = {
    success: function(data, status) {
      if (data.success) {
        Alert.setFromResponseWithLocationChange({
          message: "Successfully updated bookmark!",
          success: true
        });
        $location.path("bookmarks");
      } else {
        Alert.setFromResponse(data);
      }
    },
    error: function(data, status) {
      Alert.setFromResponse(data);
    }
  };

  $scope.submitBookmark = function() {

    if ($scope.bmTitle && $scope.bmDateStr && $scope.bmLocation) {
      var dateList = $scope.bmDateStr.split("-");
      $scope.bmDate = new Date(dateList[0], dateList[1], dateList[2]);

      var updatedBookmark = {
        id: $scope.bookmarkId,
        title: $scope.bmTitle,
        url: $scope.bmUrl,
        date_happened: $scope.bmDate.getTime(),
        location: $scope.bmLocation,
        description: $scope.bmDescription
      };
      Bookmark.updateBookmark(updatedBookmark).success(putCallbacks.success).error(putCallbacks.error);

    } else {
      Alert.setFromResponse({
        message: "Failed to update bookmark. Cannot have empty fields.",
        success: false
      });
    }
  };
});
