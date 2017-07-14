/**
 * MangaController
 *
 * @description :: Server-side logic for managing mangas
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var fs = require('fs');
var path = require('path');

module.exports = {

	create: function(req, res){

    // Get full path

    sails.getDatastore().transaction(function(db, proceed){

      Manga.findOne(req.param('manga'))
      .usingConnection(db)
      .exec(function(err, manga){

        if(err) proceed(err);

        if(!manga){
          err.code = 'E_NO_SUCH_MANGA';
          return proceed(err);
        }

        var fullPath = path.join(record.path, req.param('path'), req.param('fileName'));

        if (!fs.existsSync(fullPath)) {
          err.code = 'E_NO_SUCH_FILE';
          return proceed(err);
        }

        Comment.create(req.allParams())
        .meta({fetch: true})
        .exec(function(err, comment){
          if(err) return proceed(err);
          return proceed();
        });

      });

    }).exec(function(err) {


      if (err && err.code === 'E_NO_SUCH_MANGA') {
        return res.notFound();
      }
      else if (err && err.code === 'E_NO_SUCH_FILE') {
        return res.notFound();
      }
      else if (err) {
        return res.serverError(err);
      }

      return res.ok();
    });

	}
};
