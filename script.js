const {MongoClient} = require('mongodb');

const excelToJSON = require('convert-excel-to-json')
var result=excelToJSON({
	sourceFile: 'NSS.xlsx',
	sheets:[{
		name:'Activities',
		columnToKey:{
			A:'photos',
			B:'year',
			C:'event',
			D:'description'
		}
	},{
		name:'Report',
		columnToKey:{
			A:'year',
			B:'event',
			C:'document'
		}
	}]
})

// console.log(result)

MongoClient.connect('mongodb://localhost:27017/NSS',(err,client)=>{
	if (err) {
    	return console.log('Unable to connect to MongoDB server');
  	}

  	console.log('Connected to MongoDB server');
  	var db=client.db('NSS');

  	result.Activities.forEach((activity)=>{
  		var images = activity.photos.split(',')
  		var des = activity.description.split(',')
  		db.collection('Activities').insertOne({
	  		year:activity.year,
	  		event:activity.event,
	  		photos:images,
	  		description:des
	  	},(err,result)=>{
	  		if(err){
	  			return console.log('Unable to enter report',err)
	  		}
	  	})
  	})

  	result.Report.forEach((report)=>{
  		db.collection('Report').insertOne({
  			year:report.year,
  			event:report.event,
  			document:report.document
  		},(err,result)=>{
	  		if(err){
	  			return console.log('Unable to enter report',err)
	  		}
	  	})
  	})

  	client.close();
})