const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/trivia', () =>{
	console.log('Connected')});

const  QuestionSchema = new mongoose.Schema({
	// contains fields (columns/attributes)
	question: {type: String, default:''},
	type: {type: String, default:''},
	difficulty: {type: String, default:''},
	category: {type: String, default:''},
	answer: {type: String, default:''},
	choices: [{type: String, default: ''}]
});

const  ScoreSchema = new mongoose.Schema({
	// contains fields (columns/attributes)
	name: {type: String, default:''},
	score: {type: Number, default:0},
	categories: {type: Array, default: []}
});

const  CategorySchema = new mongoose.Schema({
	// contains fields (columns/attributes)
	name: {type: String, default:''}
},
{ versionKey: false });

//register the model
mongoose.model('Question', QuestionSchema);
mongoose.model('Score', ScoreSchema);
mongoose.model('Category', CategorySchema);

//fetch mongoose model
const Question = mongoose.model('Question');
const Score = mongoose.model('Score');
const Category = mongoose.model('Category');

//actual controllers

exports.home = (request,response) => {
	response.send('TRIVIA!');

}

exports.findAll = (request,response) =>{
	Question.find((err, questions) =>{
		if(!err) {
			response.send(questions);
		}
	});

}

exports.findCateg = (request,response) =>{
	Question.find({category: { $in: [request.query.c1,request.query.c2,request.query.c3]}}, (err,question)=>{ //findOne returns one item, not an array
		if(question && !err) {
			response.send(question);	//query is from url
		}else{
			response.send('Not found');
		}
	});

}

exports.findDiff = (request,response) =>{
	Question.find({difficulty: request.query.a}, (err,question)=>{ //findOne returns one item, not an array
		if(question && !err) {
			response.send(question);	//query is from url
		}else{
			response.send('Not found');
		}
	});
}

exports.addQuestion = (request, response) => {
  //const newQuestion = new Question(request.body);

  const newQuestion = new Question({
  	question: request.body.question,
	type: request.body.type,
	difficulty: request.body.difficulty,
	category: request.body.category,
	answer: request.body.answer,
	choices: JSON.parse(request.body.choices)
  });

  newQuestion.save((err, question) => {
    if (err) { response.send('Error saving question'); }
	else { response.send('Successfully saved question'); }
  });
}

exports.findScores = (request,response) =>{
	Score.find((err, scores) =>{
		if(!err) {
			response.send(scores);
		}
	});
}

exports.addScore = (request, response) => {

  const newScore = new Score({
  	name: request.body.name,
	score: request.body.score,
	categories: JSON.parse(request.body.categories)
  });

  newScore.save((err, score) => {
    if (err) { response.send('Error saving score'); }
	else { response.send('Successfully added score'); }
  });
}

exports.findAllCateg = (request,response) =>{
	Category.find((err, categories) =>{
		if(!err) {
			response.send(categories);
		}
	});

}

exports.addCategory = (request,response) => {
	const newCateg = new Category(request.body);
	const name = request.body.name;

	newCateg.save((err) => {
		if (err) {
			response.send('Error saving category');
		} else{
			response.send('Successfully saved '+name)
		}
	})
}