const express = require('express');
const {MongoClient} = require('mongodb');
const dotenv = require('dotenv');
dotenv.config();

const bodyParser = require('body-parser');
var app = express();

app.use(bodyParser.urlencoded({
   extended: true
}));

app.use(bodyParser.json());

const router = require('./route/route.js');

MongoClient.connect(process.env.MONGODB_URI,{useNewUrlParser:true},(err,client)=>{
	if (err) {
    	return console.log('Unable to connect to MongoDB server',err);
  	}

  	console.log('Connected to MongoDB server');
  	var db=client.db(process.env.MONGODB_DB);

  	app.use('/',router(db));
})

var port = parseInt(process.env.MONGODB_PORT) || 3000;
app.listen(port,()=>console.log(`Connected to port ${port}`));
