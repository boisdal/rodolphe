const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const audioFiles = ['mp3', 'ogg', 'wav', 'wma'];
const videoFiles = ['mp4', 'mkv', 'mov', 'avi', 'mpg', 'mpa', 'mpeg', 'asf', 'flv', 'vob'];

exports.getFileTree = (req, res) => {
  let result = {}
  result.files = getFiles('./music')
  return res.json(result);
}

function getFiles (dir, files_){
  files_ = files_ || [];
  let files = fs.readdirSync(dir);
  for (let i in files){
    let name = dir + '/' + files[i];
    if (fs.statSync(name).isDirectory()){
      let dir_obj = {};
      dir_obj.name = files[i];
      dir_obj.files = [];
      dir_obj.isDir = true;
      dir_obj.show = false;
      dir_obj.sel = false;
      dir_obj.icon = 'fa fa-folder'
      getFiles(name, dir_obj.files);
      files_.push(dir_obj);
    } else {
      let fileType = files[i].split('.');
      fileType = fileType[fileType.length-1];
      if (audioFiles.includes(fileType) || videoFiles.includes(fileType)) {
        let file_obj = {};
        file_obj.name = files[i];
        file_obj.link = name;
        file_obj.isDir = false;
        file_obj.show = false;
        file_obj.sel = false;
        if (audioFiles.includes(fileType))
          file_obj.icon = 'fa fa-music'
        else
          file_obj.icon = 'fa fa-film'
        files_.push(file_obj);
      }
    }
  }
  return files_;
}
