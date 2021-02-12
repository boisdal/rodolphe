// Declare app level module which depends on views, and core components
angular.module('myApp', [
  'ngRoute',
  'ngSanitize',
  'myApp.jukebox',
  'myApp.settings',
  'myApp.file',
  'myApp.version'
]).
config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $locationProvider.hashPrefix('!');

  $routeProvider.otherwise({redirectTo: '/jukebox'});
}]).
controller('MainCtrl',
    function ($rootScope, $http) {
      $http.get('http://127.0.0.1:4411/api/list').then(
        function successCallback(data, status, headers, config) {
        $rootScope.directory = data.data;
        console.log($rootScope.directory);
      },
        function errorCallback(data, status, headers, config) {
        console.log(data, status, headers, config);
      });

    }
    );

