angular.module('kuansim.bookmark', [
  'ui.router',
  'ui.bootstrap',
  'kuansim.api'
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

.factory('BookmarkAlerts', function($rootScope) {
  var alert = {
    message: "",
    success: true
  };
  var alertExists = function() {
    return alert.message !== "";
  };
  var setAlert = function(message, success) {
    alert.message = message;
    alert.success = success;
  };
  var getAlert = function() {
    return alert;
  };
  var clearAlert = function() {
    alert.message = "";
  };

  return {
    alert: alert,
    alertExists: alertExists,
    setAlert: setAlert,
    getAlert: getAlert,
    clearAlert: clearAlert
  };
})

.controller('BookmarkCtrl', function BookmarkCtrl($scope, $rootScope, Bookmark, BookmarkAlerts) {

  $scope.bookmarks = [];
  $scope.hasAlert = BookmarkAlerts.alertExists();
  $scope.alertSuccess = BookmarkAlerts.getAlert().success;
  $scope.alertMessage = BookmarkAlerts.getAlert().message;
  BookmarkAlerts.clearAlert();

  var getAllBookmarks = {
    success: function(data, status) {
      $scope.bookmarks = data.events;
    },
    error: function(data, status) {
      $scope.bookmarks = [];
      BookmarkAlerts.setAlert("Sorry, there was a problem retreiving bookmarks.", false);
      $scope.hasAlert = BookmarkAlerts.alertExists();
      $scope.alertSuccess = BookmarkAlerts.getAlert().success;
      $scope.alertMessage = BookmarkAlerts.getAlert().message;
      BookmarkAlerts.clearAlert();
    }
  };

  $scope.getAllBookmarks = function() {
    Bookmark.getBookmarks().success(getAllBookmarks.success).error(getAllBookmarks.error);
  };

  $scope.getAllBookmarks();

  var deleteBookmarkCallbacks = {
    success: function(data, status) {
      if (data.success) {
        BookmarkAlerts.setAlert("Successfully deleted bookmark.", true);
      } else {
        BookmarkAlerts.setAlert(data.error, false);
      }
      $scope.hasAlert = BookmarkAlerts.alertExists();
      $scope.alertSuccess = BookmarkAlerts.getAlert().success;
      $scope.alertMessage = BookmarkAlerts.getAlert().message;
      BookmarkAlerts.clearAlert();
      $scope.getAllBookmarks();
    },
    error: function(data, status) {
      BookmarkAlerts.setAlert("Sorry, there was a problem deleting the bookmark.", false);
      $scope.hasAlert = BookmarkAlerts.alertExists();
      $scope.alertSuccess = BookmarkAlerts.getAlert().success;
      $scope.alertMessage = BookmarkAlerts.getAlert().message;
      BookmarkAlerts.clearAlert();
    }
  };

  $scope.deleteBookmark = function(bookmark) {
    Bookmark.deleteBookmark(bookmark).success(deleteBookmarkCallbacks.success).error(deleteBookmarkCallbacks.error);
  };

})

.controller('BookmarkCreateCtrl', function BookmarkCreateCtrl($scope, $rootScope, $location, Bookmark, BookmarkAlerts) {

  $scope.hasAlert = BookmarkAlerts.alertExists();
  $scope.alertSuccess = BookmarkAlerts.getAlert().success;
  $scope.alertMessage = BookmarkAlerts.getAlert().message;
  BookmarkAlerts.clearAlert();

  var callbacks = {
    success: function(data, status) {
      if (data.success) {
        BookmarkAlerts.setAlert("Successfully created bookmark!", true);
        $location.path("bookmarks");
      } else {
        BookmarkAlerts.setAlert("Failed to create bookmark. " + data.error, false);
        $scope.hasAlert = BookmarkAlerts.alertExists();
        $scope.alertSuccess = BookmarkAlerts.getAlert().success;
        $scope.alertMessage = BookmarkAlerts.getAlert().message;
        BookmarkAlerts.clearAlert();
      }
    },
    error: function(data, status) {
      BookmarkAlerts.setAlert("Failed to create bookmark.", false);
      $scope.hasAlert = BookmarkAlerts.alertExists();
      $scope.alertSuccess = BookmarkAlerts.getAlert().success;
      $scope.alertMessage = BookmarkAlerts.getAlert().message;
      BookmarkAlerts.clearAlert();
    }
  };

  $scope.createBookmark = function() {
    if ($scope.bmTitle && $scope.bmDateStr && $scope.bmLocation) {
      var dateList = $scope.bmDateStr.split("-");
      $scope.bmDate = new Date(dateList[0], dateList[1], dateList[2]);

      var bookmark = {
        title: $scope.bmTitle,
        date_happened: $scope.bmDate.getTime(),
        location: $scope.bmLocation,
        description: $scope.bmDescription
      };
      Bookmark.createBookmark(bookmark).success(callbacks.success).error(callbacks.error);

    } else {
      BookmarkAlerts.setAlert("Failed to create bookmark. Cannot have empty fields.", false);
      $scope.hasAlert = BookmarkAlerts.alertExists();
      $scope.alertSuccess = BookmarkAlerts.getAlert().success;
      $scope.alertMessage = BookmarkAlerts.getAlert().message;
      BookmarkAlerts.clearAlert();
    }
  };

})

.controller('BookmarkUpdateCtrl', function BookmarkCreateCtrl($scope, $location, $stateParams, Bookmark, BookmarkAlerts) {
  $scope.hasAlert = BookmarkAlerts.alertExists();
  $scope.alertSuccess = BookmarkAlerts.getAlert().success;
  $scope.alertMessage = BookmarkAlerts.getAlert().message;
  BookmarkAlerts.clearAlert();

  $scope.bookmarkId = $stateParams.id;

  var getCallbacks = {
    success: function(data, status) {
      if (data.success) {
        var bm = data.event;
        $scope.bmTitle = bm.title;
        $scope.bmDateStr = bm.date_happened.split("T")[0];
        $scope.bmLocation = bm.location;
        $scope.bmDescription = bm.description;
      } else {
        BookmarkAlerts.setAlert(data.error, false);
        $location.path("bookmarks");
      }
    },
    error: function(data, status) {
      BookmarkAlerts.setAlert(data.error, false);
      $scope.hasAlert = BookmarkAlerts.alertExists();
      $scope.alertSuccess = BookmarkAlerts.getAlert().success;
      $scope.alertMessage = BookmarkAlerts.getAlert().message;
      BookmarkAlerts.clearAlert();
    }
  };

  Bookmark.getBookmark($scope.bookmarkId).success(getCallbacks.success).error(getCallbacks.error);

  var putCallbacks = {
    success: function(data, status) {
      if (data.success) {
        BookmarkAlerts.setAlert("Successfully updated bookmark!", true);
        $location.path("bookmarks");
      } else {
        BookmarkAlerts.setAlert(data.error, false);
        $scope.hasAlert = BookmarkAlerts.alertExists();
        $scope.alertSuccess = BookmarkAlerts.getAlert().success;
        $scope.alertMessage = BookmarkAlerts.getAlert().message;
        BookmarkAlerts.clearAlert();
      }
    },
    error: function(data, status) {
      BookmarkAlerts.setAlert(data.error, false);
      $scope.hasAlert = BookmarkAlerts.alertExists();
      $scope.alertSuccess = BookmarkAlerts.getAlert().success;
      $scope.alertMessage = BookmarkAlerts.getAlert().message;
      BookmarkAlerts.clearAlert();
    }
  };

  $scope.updateBookmark = function() {

    if ($scope.bmTitle && $scope.bmDateStr && $scope.bmLocation) {
      var dateList = $scope.bmDateStr.split("-");
      $scope.bmDate = new Date(dateList[0], dateList[1], dateList[2]);

      var updatedBookmark = {
        id: $scope.bookmarkId,
        title: $scope.bmTitle,
        date_happened: $scope.bmDate.getTime(),
        location: $scope.bmLocation,
        description: $scope.bmDescription
      };
      Bookmark.updateBookmark(updatedBookmark).success(putCallbacks.success).error(putCallbacks.error);

    } else {
      BookmarkAlerts.setAlert("Failed to update bookmark. Cannot have empty fields.", false);
      $scope.hasAlert = BookmarkAlerts.alertExists();
      $scope.alertSuccess = BookmarkAlerts.getAlert().success;
      $scope.alertMessage = BookmarkAlerts.getAlert().message;
      BookmarkAlerts.clearAlert();
    }
  };
});
