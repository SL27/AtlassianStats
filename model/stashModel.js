var mongoose=require('mongoose');

var StashSchema=new mongoose.Schema({
	project:Number,
	user:Number,
	repository:Number,
	_id: String,
	timestamp : { type : Number, index:true }
});

mongoose.model('Stash',StashSchema);