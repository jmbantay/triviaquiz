const controller = require('./controller');

module.exports = (app) => {
	app.get('/', controller.home);
	app.get('/find-all', controller.findAll);
	app.get('/find-difficulty', controller.findDiff);
	app.get('/find-questions', controller.findCateg);
	app.post('/add-question', controller.addQuestion);
	app.get('/find-all-scores', controller.findScores);
	app.post('/add-score', controller.addScore);
	app.get('/find-all-categ', controller.findAllCateg);
	app.post('/add-category', controller.addCategory);
}