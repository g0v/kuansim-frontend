angular.module('kuansim', [
  'templates-app',
  'templates-common',
  'kuansim.nav',
  'kuansim.user',
  'kuansim.landing',
  'kuansim.about',
  'kuansim.bookmark',
  'kuansim.issue',
  'kuansim.alert',
  'kuansim.user.profile',
  'ui.router',
  'ngCookies',
  'oauth'
])

.config(function ($stateProvider, $urlRouterProvider, $compileProvider) {
  $urlRouterProvider
    .when('', '/');  // This is a AngularUI router ambiguity, needs to be resolved
  $stateProvider
    .state('index', {
      url: '/',
      title: 'Kuansim',
      templateUrl: 'landing/landing.tpl.html',
      controller: 'LandingCtrl'
    })
    .state('profile', {
      url: '/profile',
      title: 'User Profile',
      templateUrl: 'user/profile/current_profile.tpl.html',
      controller: 'CurrentProfileCtrl'
    })
    .state('issue', {
      url: '/issue',
      title: 'Kuansim Issues',
      templateUrl: 'issue/issue.tpl.html',
      controller: 'IssueCtrl'
    })
    .state('issueCreate', {
      url: '/issue/create',
      title: 'Kuansim Create Issue',
      templateUrl: 'issue/issue_create.tpl.html',
      controller: 'IssueFormCtrl'
    })
    .state('issueView', {
      url: '/issue/:title',
      title: 'Kuansim View Issue',
      templateUrl: 'issue/issue_view.tpl.html',
      controller: 'IssueViewCtrl'
    })
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
    .state('bookmarkUpdate', {
      url: '/bookmarks/update/:id',
      title: 'Bookmarks',
      templateUrl: 'bookmark/bookmark_create.tpl.html',
      controller: 'BookmarkUpdateCtrl'
    })
    .state('profile.view', {
      url: '/view',
      templateUrl: 'user/profile/profile_view.tpl.html',
      title: 'User Profile - View',
      controller: 'CurrentProfileViewCtrl'
    })
    .state('profile.bookmarks', {
      url: '/bookmarks',
      templateUrl: 'user/profile/my_bookmarks.tpl.html',
      title: 'User Profile - Bookmarks',
      controller: 'CurrentProfileMyBookmarksCtrl'
    })
    .state('profile.issues', {
      url: '/issues',
      templateUrl: 'user/profile/my_issues.tpl.html',
      title: 'User Profile - Issues',
      controller: 'CurrentProfileMyIssuesCtrl'
    })
    ;

    $compileProvider.urlSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|javascript):/);
})

.controller('AppCtrl', function AppCtrl($scope, $location) {

})

.run(function ($rootScope, $state, OAuth, User, $http, Alert) {
  $rootScope.state = $state;
  OAuth.initialize('SGZsWy9SUN3ce4-sAMsgQNbB0fA');

  var verifyLogin = function(email, name) {
    $http.get('/users/verify').
      success(function(response) {
        if (!response.success) {
          Alert.setFromResponse(response);
        } else {
          User.logIn(response.email, response.name, response.id);
        }
      });
  };

  verifyLogin();

});

