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
MongoClient.connect(process.env.MONGODB_ADDON_URI,(err,client)=>{
	if (err) {
    	return console.log('Unable to connect to MongoDB server');
  	}

  	console.log('Connected to MongoDB server');
  	var db=client.db(process.env.MONGODB_ADDON_DB);
  	app.use('/',router(db));
})

var port = parseInt(process.env.MONGODB_ADDON_PORT) || 3000;
app.listen(port,()=>console.log(`Connected to port ${port}`));

// const excelToJSON = require('convert-excel-to-json')
// var result=excelToJSON({
// 	sourceFile: 'NSS.xlsx',
// 	sheets:[{
// 		name:'Activities',
// 		columnToKey:{
// 			A:'photos',
// 			B:'year',
// 			C:'event',
// 			D:'description'
// 		}
// 	}]
// })

// MongoClient.connect('mongodb://localhost:27017/NSS',(err,client)=>{
// 	if (err) {
//     	return console.log('Unable to connect to MongoDB server');
//   	}

//   	console.log('Connected to MongoDB server');
//   	var db=client.db('NSS');

//   	result.Activities.forEach((activity)=>{
//   		var images = activity.photos.split(',')
//   		var des = activity.description.split(',')
//   		db.collection('Activities').insertOne({
// 	  		year:activity.year,
// 	  		event:activity.event,
// 	  		photos:images,
// 	  		description:des
// 	  	},(err,result)=>{
// 	  		if(err){
// 	  			return console.log('Unable to enter report',err)
// 	  		}
// 	  	})
//   	})

//   	client.close();
// })

// console.log(result)

