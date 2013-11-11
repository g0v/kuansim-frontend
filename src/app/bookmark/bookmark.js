angular.module('kuansim.bookmark', [
  'ui.router',
  'ui.bootstrap'
])

.factory('Bookmark', function($http) {
  return {
    getBookmarks: function() {
      return $http.get('/collections/bookmarks');
    },
    createBookmark: function(bookmark) {
      return $http.post('/collections/bookmarks', bookmark);
    },
    deleteBookmark: function(bookmark) {
      return $http.post('/collections/bookmarks/' + bookmark.id);
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
  console.log(BookmarkAlerts.getAlert());
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

.controller('BookmarkCreateCtrl', function BookmarkCreateCtrl($scope, $timeout, $rootScope, $location, Bookmark, BookmarkAlerts) {

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

  $scope.createEvent = function() {
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

.config(function ($stateProvider) {
  $stateProvider
    .state('bookmark', {
      url: '/bookmarks',
      title: 'Bookmarks',
      templateUrl: 'bookmark/bookmark.tpl.html',
      controller: 'BookmarkCtrl'
    })
    .state('bookmarkCreate', {
      url: '/bookmarks/create',
      title: 'Bookmarks',
      templateUrl: 'bookmark/bookmark_create.tpl.html',
      controller: 'BookmarkCreateCtrl'
    })
    ;
})

;

