var express=require('express');
var router=express.Router();
var mongoose=require('mongoose');
var Jenkins=mongoose.model('Jenkins');

router.get('/',function(req,res,next){
	Jenkins.find().sort({timestamp:-1}).limit(1).exec(function(err,docs){
		if (err){
			console.log(err);
			res.status(500).send(err);
		}
		res.json(docs);
	});
});

module.exports=router;