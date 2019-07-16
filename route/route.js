const router = require('express').Router();

module.exports = (db) => {

	const database = require('./../db/db.js')(db);

	router.get('/getReport', async (req,res)=>{
		// console.log(req.query)
		var report = await database.getReport(req.query.year,req.query.event)
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

	router.get('/getPhotos', async (req,res)=>{
		var images = await database.getPhotos(req.query.year,req.query.event)
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
		var user = await database.login(req.query.email,req.query.password)
		if(user){
			res.status(200).send({
				status:'Yes'
			})
		} else {
			res.status(200).send({
				status:'No'
			})
		}
	})

	router.get('/signup',(req,res)=>{
		// console.log(req.params)
		database.signup(req.query.email,req.query.password,req.query.contact,req.query.name,res)
	})

	return router;
}