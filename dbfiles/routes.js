const controller = require('./controller');

module.exports = (app) => {
	app.get('/', controller.home);
	app.get('/find-all', controller.findAll);
	app.get('/find-difficulty', controller.findDiff);
	app.get('/find-questions', controller.findCateg);
}