/**
 * MangaController
 *
 * @description :: Server-side logic for managing mangas
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var fs = require('fs');
var path = require('path');
var mime = require('mime');

module.exports = {

	files: function(req, res){

		var query = {};

		if(req.query.hasOwnProperty('name')){
			query = { name: req.param('id') };
		} else {
			query = { id: req.param('id') };
		}

		Manga.findOne(query, function(err, record){

			if(err) { return res.serverError(err); }
			if(record == null) { return res.notFound(); }

			var fullPath = path.join(record.path, req.param('path') || "");

			fs.lstat(fullPath, function (err, inodeStatus) {

				if(err) { return res.serverError(err); }

				// Return a JSON that shows directories and files
				if(inodeStatus.isDirectory()){
					try{
						var dirs = FilesystemService.getDirectories({ path: fullPath });
						var files = FilesystemService.getFiles({ path: fullPath });
					} catch(e){
						return res.notFound("Can't get files");
					}
					return res.ok({
						manga: record,
						dirs: dirs,
						files: files,
						breadcrumb: FilesystemService.getFileBreadcrumb({ file: fullPath, omitFirst: record.path })
					});
				}

				// Return file
				Manga.update({ id: record.id }, { lastPage: req.param('path') }).exec(function(){});
				res.attachment(fullPath);
				fs.createReadStream(fullPath).pipe(res);
			});
		});
	},


	findOne: function(req, res){

		Manga.findOne({ id: req.param('id') }, function(err, record){

			if(err) { return res.serverError(); }
			if(record == null) { return res.notFound(); }
			record.breadcrumb = FilesystemService.getFileBreadcrumb({ file: record.lastPage });
			return res.ok(record);

		});
	},

	create: function(req, res){

		var name = req.param('name');
		var path = req.param('path');

		if(typeof name === 'undefined'){
			return res.badRequest('Name can\'t be null');
		}

		if(typeof path === 'undefined'){
			return res.badRequest('Path can\'t be null');
		}

		if(name == ''){
			return res.badRequest('Name ' + name + ' is too short');
		}

		if (!fs.existsSync(path)) {
			return res.badRequest('Path ' + path + ' doesn\'t exist');
		}

		Manga.create({
			name: name,
			path: path
		}).exec(function(err, record){
			if (err) { return res.serverError(err); }
			return res.ok(record);
		});
	}
};
