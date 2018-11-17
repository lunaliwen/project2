var path = require('path');


module.exports = function(app) {

	app.get('/menu', function(req, res) {
		res.sendFile(path.join(__dirname, "../public/menu/menu.html"));
	});
};
