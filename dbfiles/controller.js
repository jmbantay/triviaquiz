const mongoose = require('mongoose');
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

//register the model
mongoose.model('Question', QuestionSchema);

//fetch mongoose model
const Question = mongoose.model('Question');

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