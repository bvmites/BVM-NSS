const router = require('express').Router();

module.exports = (db) => {

	const database = require('./../db/db.js')(db);

	router.post('/getReport/:year/:event', async (req,res)=>{
		// console.log(req.params.year,req.params.event)
		var report = await database.getReport(req.params.year,req.params.event)
		if (report) {
			res.status(200).send({
				status: 'Yes',
				document: report.document
			})
		} else {
			res.status(400).send({
				status:'No',
				error: 'Error invalid year or event name'
			})
		}
	})

	router.post('/getPhotos/:year/:event', async (req,res)=>{
		var images = await database.getPhotos(req.params.year,req.params.event)
		if(images) {
			res.status(200).send({
				status:'Yes',
				img: images.photos,
				desc: images.description
			})
		} else {
			res.status(400).send({
				status:'No',
				error: 'Error invalid year or event name'
			})
		}
	})

	router.post('/login/:email/:password',async(req,res)=>{
		var user = await database.login(req.params.email,req.params.password)
		if(user){
			res.status(200).send({
				status:'Yes'
			})
		} else {
			res.status(400).send({
				status:'No'
			})
		}
	})

	router.post('/signup/:name/:email/:password/:contact',(req,res)=>{
		// console.log(req.params)
		database.signup(req.params.email,req.params.password,req.params.contact,req.params.name,res)
	})

	return router;
}