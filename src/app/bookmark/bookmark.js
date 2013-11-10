angular.module('kuansim.bookmark', [
  'ui.router',
  'ui.bootstrap'
])

.factory('Bookmark', function($http) {
  return {
    getBookmarks: function() {
      return $http.get('/collections/bookmarks/');
    },
    createBookmark: function(bookmark) {
      return $http.post('/collections/bookmarks/', bookmark);
    }
  };
})

.controller('BookmarkCtrl', function BookmarkCtrl($scope, Bookmark) {

  $scope.bookmarks = [];

  $rootScope.$watch('notification', function() {
    $scope.notification = $rootScope.notification;
  });

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

.controller('BookmarkCreateCtrl', function BookmarkCreateCtrl($scope, $timeout, $rootScope, Bookmark) {

  $scope.dateOptions = {
    'year-format': "'yy'",
    'starting-day': 1
  };

  $scope.open = function() {
    $timeout(function() {
      $scope.opened = true;
    });
  };

  $scope.today = function() {
    $scope.dateToday = new Date();
  };

  $scope.disabled = function(date, mode) {
    return (mode === 'day' && (date > $scope.dateToday));
  };

  var callbacks = {
    success: function(data, status) {
      $rootScope.notification = {
        status: "success",
        message: "Successfully created bookmark."
      };
      $rootScope.$apply();
    },
    error: function(data, status) {
      $rootScope.notification = {
        status: "error",
        message: "Failed to create bookmark."
      };
      $rootScope.$apply();
    }
  };

  $rootScope.$watch('notification', function() {
    $scope.notification = $rootScope.notification;
  });

  $scope.createEvent = function() {
    var bookmark = {
      title: $scope.bookmarkTitle,
      dateHappened: $scope.bookmarkDate.UTCgetMilliseconds,
      location: $scope.bookmarkLocation,
      description: $scope.bookmarkDescription
    };
    Bookmark.createBookmark(bookmark).success(callbacks.success).error(callbacks.error);
  };

})

.config(function ($stateProvider) {
  $stateProvider
    .state('bookmark', {
      url: '/bookmark',
      title: 'Bookmarks',
      templateUrl: 'bookmark/bookmark.tpl.html',
      controller: 'BookmarkCtrl'
    })
    .state('bookmarkCreate', {
      url: '/bookmark/create',
      title: 'Bookmarks',
      templateUrl: 'bookmark/bookmark_create.tpl.html',
      controller: 'BookmarkCreateCtrl'
    })
    ;
})

;

