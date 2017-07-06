var fs = require('fs');

//var imageRegex = new RegExp(/^(?:jpg|png|gif|bmp|jpeg)$/);

module.exports = {


  getDirectories: function(options) {
    return fs.readdirSync(options.path).filter(function (file) {
      return fs.statSync(options.path+'/'+file).isDirectory();
    });
  },

  getFiles: function(options) {
    return fs.readdirSync(options.path).filter(function (file) {
      return !fs.statSync(options.path+'/'+file).isDirectory();
    });
  },

  /*
  * /aa/bb/cc --> ['aa', 'bb', 'cc']
  * /readme.md --> /
  * "file" must be a file and not a directory
  */
  getFileBreadcrumb: function(options) {

    var dir = options.file.slice(0, options.file.lastIndexOf("/") + 1);
    var ret = dir.split("/").filter(e => e.length > 0);

    if(options.omitFirst){
      var split = options.omitFirst.split("/").filter(e => e.length > 0);
      ret = ret.splice(split.length);
    }

    return ret;
  }




/*
  getFilesFolder: function(options){

    var files = [];

    fs.readdirSync(options.path).forEach(file => {
      files.push(file);
    })

    return files;
  }
*/
  /*fileIsImage: function(options){

    var ext = path.extname(options.file);

    if(ext.length == 0)
      return false;

    if(ext.slice(1).match(imageRegex) == null)
      return false;

    return true;
  },

  getFirstPage: function(options){
    var first = null;
    fs.readdirSync(options.path).forEach(file => {
      if(!fileIsImage(file)) return;
      if(first == null){
        first = file;
      }
    })

    return first;
  }*/
};
