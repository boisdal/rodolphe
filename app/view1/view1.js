
angular.module('myApp.view1', [
    'ngRoute',
    'ngSanitize',
    "com.2fdevs.videogular",
  "com.2fdevs.videogular.plugins.controls",
  "com.2fdevs.videogular.plugins.overlayplay",
  "com.2fdevs.videogular.plugins.buffering",
  "com.2fdevs.videogular.plugins.poster"
])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl',
  });
}])

.controller('View1Ctrl',
  function ($sce, $scope) {
      this.config = {
          preload: "none",
          sources: [
              {src: $sce.trustAsResourceUrl("test0.mp4"), type: "video/mp4"}
          ],
          theme: {
              url: "http://www.videogular.com/styles/themes/default/latest/videogular.css"
          },
          responsive: true
      };
  }
);