'use strict'

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

//connect to db
mongoose.connect('mongodb://localhost/trivia', () =>{
	console.log('Connected')});

const  QuestionSchema = new mongoose.Schema({
	// contains fields (columns/attributes)
	question: {type: String, default:''},
	type: {type: String, default:''},
	difficulty: {type: String, default:''},
	category: {type: String, default:''},
	answer: {type: String, default:''},
	//choices: {type: newString[], default:[]}
});

//register the model
mongoose.model('Question', QuestionSchema);

//fetch mongoose model
const Question = mongoose.model('Question');

//initialize server
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.get('/', (request,response) =>{
	response.send('TRIVIA!');

});

app.get('/find-all', (request,response) =>{
	Question.find((err, questions) =>{
		if(!err) {
			response.send(questions);
		}
	});

});

app.get('/find-questions', (request,response) =>{
	Question.find({category: request.query.category}, (err,question)=>{ //findOne returns one item, not an array
		if(question && !err) {
			response.send(question);	//query is from url
		}else{
			response.send('Not found');
		}
	});

});

app.get('/find-difficulty', (request,response) =>{
	Question.find({difficulty: request.query.a}, (err,question)=>{ //findOne returns one item, not an array
		if(question && !err) {
			response.send(question);	//query is from url
		}else{
			response.send('Not found');
		}
	});

});

/*
app.get('/find-questions', (request,response) =>{
	Question.findOne({category: request.query.category}, (err,question)=>{ //findOne returns one item, not an array
		if(question && !err) {
			response.send(question);	//query is from url
		}else{
			response.send('Not found');
		}
	});

});

app.delete('/delete-movie', (request,response) => {
	const newMovie = new Movie(request.body);
	const title = request.body.title;

	Movie.remove({title: request.body.title},(err)=>{
		if(err) {
			response.send('Error deleting');
		}else {
			response.send('Successfully deleted ' + title);
		}
	});
});*/

app.listen(3000);
