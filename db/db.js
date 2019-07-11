const {MongoClient,ObjectID} = require('mongodb');

module.exports = (db) => ({
	getReport : (year,event)=>{
		return db.collection('Report').findOne({
			year,
			event
		})
	},
	getPhotos : (year,event)=>{
		return db.collection('Activities').findOne({
			year,
			event
		})
	},
	login : (email,password)=>{
		return db.collection('Users').findOne({
			email,
			password
		})
	},
	signup : (email,password,contact,name,res)=>{
		db.collection('Users').insertOne({
			name,
			email,
			password,
			contact
		},(err,result)=>{
			if(err)
				return res.status(400).send({
					status:'No'
				})
			res.status(200).send({
				status:'Yes'
			})
		})
	}
})