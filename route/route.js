const router = require('express').Router();

module.exports = (db) => {
	const database = require('./../db/db.js')(db);

	router.post('/getReport', async (req,res)=>{
		var report = await database.getReport(req.body.year,req.body.event)
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

	router.post('/getPhotos', async (req,res)=>{
		var images = await database.getPhotos(req.body.year,req.body.event)
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

	router.post('/login',async(req,res)=>{
		var user = await database.login(req.body.email,req.body.password)
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

	router.post('/signup',(req,res)=>{
		database.signup(req.body.email,req.body.password,req.body.contact,req.body.name,res)
	})

	return router;
}