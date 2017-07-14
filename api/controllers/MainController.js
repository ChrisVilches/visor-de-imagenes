module.exports = {

	index: function(req, res){

		res.view('homepage');

	},

	redirect: function(req, res){

		res.redirect('/spa');

	},


	close: function(req, res){


		sails.log('Closing...');

		setTimeout(process.exit, 1000);

		return res.json({
			message: 'Closed.'
		});


	}

};
