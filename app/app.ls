# Declare app level module which depends on filters, and services
App = angular.module \app <[ngCookies ngResource app.controllers app.directives app.filters app.services]>

App.config <[$routeProvider $locationProvider]> ++ ($routeProvider, $locationProvider, config) ->
  $routeProvider
    .when \/collect templateUrl: \/partials/app/collect.html
    .when \/edit templateUrl: \/partials/app/edit.html
    .when \/publish templateUrl: \/partials/app/publish.html
    .when \/issue templateUrl: \/partials/app/issue.html
    .when \/act templateUrl: \/partials/app/act.html
    .when \/about templateUrl: \/partials/app/about.html
    .when \/ templateUrl: \/partials/app/portal.html
    # Catch all
    .otherwise redirectTo: \/

  # Without serve side support html5 must be disabled.
  $locationProvider.html5Mode false
