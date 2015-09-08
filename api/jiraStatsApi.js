var express=require('express');
var router=express.Router();
var mongoose=require('mongoose');
var Jira=mongoose.model('Jira');

router.get('/',function(req,res,next){
	Jira.find().sort({timestamp:-1}).limit(1).exec(function(err,docs){
		if (err){
			console.log(err);
			res.status(500).send(err);
		}
		res.json(docs);
	});
});

module.exports=router;