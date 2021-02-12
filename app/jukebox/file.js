angular.module('myApp.file', ['ngRoute'])
  .component('file', {
    templateUrl: 'jukebox/file.html',
    bindings: {
      inData: '<'
    },
    controller: ['$http', '$routeParams', function FileCtrl(){}]
  })
  .controller('FileCtrl', function ($scope){
    $scope.unfold = function(file){
      if (file.isDir){
        file.show = !file.show;
      }
    };
    $scope.addSong = function(file){
      if (file.isDir) {
        addSongDir(file.files);
      } else {
        console.log(`adding song ${file.link}`);
      }
    };
  })


function addSongDir(files) {
  for (let file of files) {
    if (!file.isDir){
      console.log(`adding song ${file.link}`);
    } else {
      addSongDir(file.files);
    }
  }
}