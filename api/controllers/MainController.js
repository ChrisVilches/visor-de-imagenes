module.exports = {

	index: function(req, res){

		res.view('homepage');

	},

	redirect: function(req, res){

		res.redirect('/spa');

	}

};
