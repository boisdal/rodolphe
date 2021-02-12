
angular.module('myApp.jukebox', [
    'ngRoute',
    'ngSanitize',
    "com.2fdevs.videogular",
  "com.2fdevs.videogular.plugins.controls",
  "com.2fdevs.videogular.plugins.overlayplay",
  "com.2fdevs.videogular.plugins.buffering",
  "com.2fdevs.videogular.plugins.poster"
])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/jukebox', {
    templateUrl: 'jukebox/jukebox.html',
    controller: 'JukeboxCtrl',
  });
}])

.controller('JukeboxCtrl',
  function ($sce, $scope, $rootScope) {
      this.config = {
          preload: "none",
          sources: [
              {src: $sce.trustAsResourceUrl("./music/test0.mp4"), type: "video/mp4"}
          ],
          theme: {
              url: "http://www.videogular.com/styles/themes/default/latest/videogular.css"
          },
          responsive: true
      };
    $scope.addSelected = function(){
      for (let file of $rootScope.directory.files){
        if (file.isDir) {
          if (file.sel)
            addSongDir(file.files)
          else
           addSelectedDir(file.files);
        } else {
          if (file.sel) {
            console.log(`adding song ${file.link}`);
            file.sel = false;
          }
        }
      }
    };
  }
);

function addSelectedDir(files) {
  for (let file of files) {
    if (!file.isDir){
      if (file.sel) {
        console.log(`adding song ${file.link}`);
        file.sel = false;
      }
    } else {
      if (file.sel) {
        addSongDir(file.files);
        file.sel = false;
      }
      else
        addSelectedDir(file.files);
    }
  }
}

function addSongDir(files) {
  for (let file of files) {
    if (!file.isDir){
      console.log(`adding song ${file.link}`);
    } else {
      addSongDir(file.files);
    }
  }
}