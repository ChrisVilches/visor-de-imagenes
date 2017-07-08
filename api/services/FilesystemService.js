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

    var ret = options.file.split("/").filter(e => e.length > 0);

    if(options.omitFirst){
      var split = options.omitFirst.split("/").filter(e => e.length > 0);
      ret = ret.splice(split.length);
    }

    return ret;
  }
};
