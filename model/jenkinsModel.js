var mongoose=require('mongoose');

var JenkinsSchema= new mongoose.Schema({
	job:Number,
	blue:Number,
	yellow:Number,
	red:Number,
	notBuilt:Number,
	aborted:Number,
	user:Number,
	_id:String,
	timestamp : { type : Number, index:true }
});

mongoose.model('Jenkins',JenkinsSchema);